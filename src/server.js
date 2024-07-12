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

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon"; //socket은 객체이므로 요소를 추가해도 됨
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    message = message.toString();
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${parsedMessage.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = parsedMessage.payload;
        break;
    }
  });
});

server.listen(3000, handleListen);
