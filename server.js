require("dotenv").config();

const { request } = require("express");
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());
//!post json data
const posts = [
  {
    username: "gg1",
    title: "post1",
  },
  {
    username: "gg2",
    title: "post2",
  },
  {
    username: "gg3",
    title: "post3",
  },
  {
    username: "gg4",
    title: "post4",
  },
];

//! REST Clint
app.get("/posts", authenticateToken, (req, res) => {
  console.log("authorization davlaa");
  console.log(req.username);

  res.json(posts.find((post) => post.username === req.username.name));
});

app.post("/login", (req, res) => {
  // authentication required
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessTokenHAHHA: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = req.headers.token;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    request.username = user;
    console.log(user);
    next();
  });
}

app.listen(3000);
