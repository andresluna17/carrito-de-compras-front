const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/carrito-de-compras-fron"));

app.get("/*", (req, res) =>
  res.sendFile(
    path.join(__dirname + "/dist/acarrito-de-compras-fron/index.html")
  )
);

app.listen(process.env.PORT || 8080);
