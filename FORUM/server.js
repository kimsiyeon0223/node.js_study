const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (요청, 응답) => {
  //누가 메인페이지에 접속 시
  응답.sendFile(__dirname + "/index.html");
});

app.get("/news", (요청, 응답) => {
  db.collection("post").insertOne({ title: "어쩌구" });
  // 응답.send("오늘 비옴");
});

app.get("/shop", (요청, 응답) => {
  응답.send("쇼핑페이지임");
});

app.get("/list", async (요청, 응답) => {
  let res = await db.collection("post").find().toArray();
  console.log(res[0].title); //res : arrray 자료형
  응답.send(res[0].title);
});

const { MongoClient } = require("mongodb");

let db;
const url =
  "mongodb+srv://admin:1234@cluster.ist8kmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum_post");
    app.listen(8080, () => {
      console.log("http://localhost:8080 에서 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });
