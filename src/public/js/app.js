const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  //emit(event name, payload want to sended, function executed at the server)
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  }); //object를 보낼 수 있음!
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
