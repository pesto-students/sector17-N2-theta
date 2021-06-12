const https = require("https");
export default (req, res) => {
  // const origin = req.body.pincode;
  if (req.method === "POST") {
    const data = req.body;
    const { origin, destination } = data;
    https
      .get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyBLuKZYUJThQeaN2OuyQFXHangMdmwyjuo`,
        (resp) => {
          let data = "";

          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            res.status(200).json({ name: JSON.parse(data) });
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  }
};
