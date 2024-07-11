const fSocket = new WebSocket(`ws://${window.location.host}`);

fSocket.addEventListener("open", () => {
  console.log("Connected to Server");
});

fSocket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

fSocket.addEventListener("close", () => {
  console.log("Disconnected from server");
});

setTimeout(() => {
  fSocket.send("hello from the browser!");
}, 10000);
