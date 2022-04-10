import io from 'socket.io-client'

const  options = {
  'force new connection':true,
  reconnectionAttempt:'Infinity',
  timeout:10000,
  transport:['websocket'],
  rejectUnauthorized: false,
}

const socket = () => {
  return io.connect(
  process.env.NODE_ENV === "development"
  ? "http://localhost:3004"
  : "https://solarity.muhash.com", options);
}
export default socket
