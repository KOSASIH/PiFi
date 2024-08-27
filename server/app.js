const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
