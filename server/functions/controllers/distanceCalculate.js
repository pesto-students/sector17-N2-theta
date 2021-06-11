const https = require("https");
export const DistanceCalculate = (req, res) => {
  const options = {
    hostname: "https://maps.googleapis.com",
    port: 443,
    path: "/maps/api/distancematrix/json?origins=143001&destinations=110059&key=AIzaSyBLuKZYUJThQeaN2OuyQFXHangMdmwyjuo",
    method: "GET",
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
