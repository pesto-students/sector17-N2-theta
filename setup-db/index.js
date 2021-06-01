var admin = require("firebase-admin");
const path = require("path");

const fs = require("fs");

const fetch = require("node-fetch");

var serviceAccount = require("./sector17-chandigarh-firebase-adminsdk-m6tbv-19d14d27e5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sector17-chandigarh.appspot.com",
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

async function upload(fileName) {
  const img = await bucket.upload(`./images/${fileName}`, {
    destination: fileName,
    public: true,
  });

  return img[0].publicUrl();
}

async function saveAndUpload(url) {
  const fileName = path.basename(url);

  const res = await fetch(url);
  const file = fs.createWriteStream(`./images/${fileName}`);

  return await new Promise((resolve, reject) => {
    res.body.pipe(file);
    res.body.on("error", reject);
    file.on("finish", async () => {
      resolve(await upload(fileName));
    });
  });
}

// (async () =>
//   console.log(
//     await saveAndUpload(
//       "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/ezio-auditore-ray-fredian.jpg"
//     )
//   ))();

const categories = {};
const newProducts = [];

async function read() {
  const prods = JSON.parse(fs.readFileSync("./products.json"));
  const cats = JSON.parse(fs.readFileSync("./categories.json"));
  const catsKeys = cats.map((cat) => cat.id);

  for (const prod of prods) {
    if (
      !prod.category ||
      !Array.isArray(prod.category) ||
      !prod.image ||
      prod.image.indexOf("_sa.") === -1 ||
      !prod.sku
    ) {
      continue;
    }

    const prodCats = prod.category;
    for (const prodCat of prodCats) {
      if (!catsKeys.includes(prodCat.id) || categories[prodCat.name] >= 100) {
        continue;
      }

      //await addProduct(prod);
      //await updateSlug(prod);
      await updateCategoriesSellers(prod, prodCat);

      categories[prodCat.name] = !!categories[prodCat.name]
        ? categories[prodCat.name] + 1
        : 1;

      break;
    }
  }

  write(newProducts);
}

function write(data) {
  fs.writeFileSync(`./newProducts.json`, JSON.stringify(data));
}

async function addProduct(prod) {
  prod.image = await saveAndUpload(prod.image);
  delete prod.url;
  delete prod.upc;

  newProducts.push(prod);
  console.log(newProducts.length);

  return await db.collection('products').doc(''+prod.sku).set(prod);
}

let counter=0;
async function updateSlug(prod) {
  const slug = prod.url.split("http://www.bestbuy.com/site/")[1].split('/')[0];

  const doc = db.collection('products').doc(''+prod.sku);
  await doc.update({slug});

  newProducts.push((await doc.get()).data());

  counter++;
  console.log(counter);
}

const sellers = ['MY6fF4dKne5Y1EYlQ5FZ', 'fazhvOTlXW8Lmh3MfvRu'];

async function updateCategoriesSellers(prod, cat) {

  const doc = db.collection('products').doc(''+prod.sku);
  await doc.update( { category: cat.id, seller: sellers[ counter % 2 ] } );

  newProducts.push((await doc.get()).data());

  counter++;
  console.log(counter);
}

// read();

// write();

// bucket.deleteFiles();