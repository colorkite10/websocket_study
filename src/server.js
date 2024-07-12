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

function onSocketClose() {
  console.log("Disconnected form the browser");
}

//연결된 socket(브라우저)들을 저장하는 배열, 다른 브라우저끼리 통신 주고받을 수 있도록!
const sockets = [];

//event listening이랑 비슷함
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    //연결된 브라우저에게 message를 보냄. 다른 브라우저에서 보낸 메시지도!
    sockets.forEach((aSocket) => aSocket.send(message));
    socket.send(message.toString());
  });
});

server.listen(3000, handleListen);
