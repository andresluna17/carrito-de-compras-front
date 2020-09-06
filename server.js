const express = require("express");

const express = require("express");

const app = express();

app.use(express.static("./dist/carrito-de-compras-fron"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/acarrito-de-compras-fron/" })
);

app.listen(process.env.PORT || 8080);
