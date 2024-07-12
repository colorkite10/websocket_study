const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const fSocket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("Connected to Server");
}

fSocket.addEventListener("open", handleOpen);

fSocket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

fSocket.addEventListener("close", () => {
  console.log("Disconnected from server");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  fSocket.send(input.value);
  console.log(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
