const express = require("express");
const app = express();

app.listen(8080, () => {
  console.log("http://localhost:8080 에서 실행중");
});

app.get("/", (요청, 응답) => {
  //누가 메인페이지에 접속 시
  응답.send("반갑다 친구야"); //이거 보내줌
});
