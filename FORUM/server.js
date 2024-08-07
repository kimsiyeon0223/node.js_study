const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  //유저에게 ejs 파일 보내는 코드
  응답.render("list.ejs", { posts: res });
});

app.get("/write", (요청, 응답) => {
  응답.render("write.ejs");
});

app.post("/add", async (요청, 응답) => {
  console.log(요청.body);
  try {
    if (요청.body.title === "") {
      응답.send("제목이 입력되지 않았습니다.");
    } else {
      await db
        .collection("post")
        .insertOne({ title: 요청.body.title, content: 요청.body.content });
      응답.redirect("/list");
    }
  } catch (error) {
    console.log(error);
    응답.status(500).send("서버에러");
  }
});

app.get("/detail/:aaa", async (요청, 응답) => {
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId("66a49ff07de56b7c5b6b9d70") });
  console.log(요청.params);
  응답.render("detail.ejs");
});

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
