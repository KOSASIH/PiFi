const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.example.com"
});

module.exports = api;
