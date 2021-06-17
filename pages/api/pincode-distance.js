const https = require("https");
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { origin, destination } = data;
    https
      .get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyBLuKZYUJThQeaN2OuyQFXHangMdmwyjuo`,
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