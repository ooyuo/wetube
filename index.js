import express from "express" // express라는 이름을 내 파일들안에서 찾고, 못찾으면 node_modules> express> index.js 순으로 찾는다.
const app = express() // server생성
const PORT = 4000;

const handleListening = () => console.log(`listening on: http://localhost:${PORT}`);


const handleHome = (req, res) =>  res.send('hello from my ass');

const handleProfile = (req, res) => res.send("you are on my profile");

app.get("/", handleHome); // route 생성
app.get("/profile", handleProfile);
app.listen(PORT, handleListening);