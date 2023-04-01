const clientSide = typeof window !== "undefined";
const socket = clientSide && new WebSocket(process.env.NEXT_PUBLIC_GO_SERVER);
const callBacks = {};
if (clientSide) {
  socket.onmessage = (payload) => {
    console.log(payload);
    const data = JSON.parse(payload.data);
    const callback = callBacks[data.Type];
    if (callback) callback(data.Data);
  };
}
export function emit(type, data) {
  socket.send(JSON.stringify({ Type: type, Data: data }));
}
export function listen(type, callback) {
  callBacks[type] = callback;
}
export function detach(type) {
  delete callBacks[type];
}