import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
//http 서버 위에 webSocket 서버를 만들 수 있도록 한 것
// => http 서버와 wss 서버 모두 지원 가능하게 함

function handleConnection(bSocket) {
  //bSocket: 연결된 브라우저
  console.log(bSocket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
