//브라우저와 서버를 연결해주는 코드
//fSocket: 서버로의 연결
const fSocket = new WebSocket(`ws://${window.location.host}`);
