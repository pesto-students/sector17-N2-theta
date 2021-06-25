const https = require("https");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const bodyData = req.body;
    const { pincodeData } = bodyData;
    https
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${pincodeData}&key=AIzaSyBLuKZYUJThQeaN2OuyQFXHangMdmwyjuo`,
        (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("end", () => {
            res.status(200).json({ distance: JSON.parse(data) });
          });
        }
      )
      .on("error", (err) => {
        res.status(200).json({ distance: JSON.parse(err.message) });
        // console.log("Error: " + err.message);
      });
  }
};

export default handler;
