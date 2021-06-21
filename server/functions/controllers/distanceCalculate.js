const { default: axios } = require("axios");

const getDistanceInKMs = async (pin1, pin2) => {
  const apiKey = "AIzaSyBLuKZYUJThQeaN2OuyQFXHangMdmwyjuo";

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pin1}&destinations=${pin2}&key=${apiKey}`
  );

  if (
    !response.data ||
    response.data.status != "OK" ||
    response.data.rows[0].elements[0].status != "OK" ||
    !response.data.rows[0].elements[0].distance
  ) {
    return false;
  }

  return parseInt(response.data.rows[0].elements[0].distance.value) / 1000;
};

module.exports = { getDistanceInKMs };
