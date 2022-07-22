const app = require("express")();
const { Client } = require("pg");
const crypto = require("crypto");
const HashRing = require("hashring");
const { url } = require("inspector");
const hr = new HashRing();

hr.add("5432");
hr.add("5433");
hr.add("5434");

const clients = {
  5432: new Client({
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "password",
    database: "postgres",
  }),
  5433: new Client({
    host: "127.0.0.1",
    port: "5433",
    user: "postgres",
    password: "password",
    database: "postgres",
  }),
  5434: new Client({
    host: "127.0.0.1",
    port: "5434",
    user: "postgres",
    password: "password",
    database: "postgres",
  }),
};

async function connect() {
  await clients["5432"].connect();
  await clients["5433"].connect();
  await clients["5434"].connect();
}

connect();

app.get("/", async (req, res) => {
  const urlId = req.query.urlId;
  const server = hr.get(urlId);
  const result = await clients[server].query(
    "SELECT * FROM URL_TABLE WHERE URL_ID = ($1)",
    [urlId]
  );
  res.json(result.rows[0]);
});

app.post("/", async (req, res) => {
  const url = req.query.url;
  const hash = crypto.createHash("sha256").update(url).digest("base64");
  const urlId = hash.substr(0, 5);
  const server = hr.get(urlId);

  await clients[server].query(
    "INSERT INTO URL_TABLE (URL,URL_ID) VALUES ($1,$2)",
    [url, urlId]
  );

  res.send({
    urlId,
    server,
    url,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
