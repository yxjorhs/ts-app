import { WebSocketServer, RawData, WebSocket } from 'ws';

type Event = string
type Data = Record<string, any>

type Message = {
  event: Event,
  data: Data
}

const router: Record<
  Event,
  (data: Data, wss: WebSocketServer, ws: WebSocket) => Promise<void>
> = {};

export async function handleMsg(
  raw: RawData,
  wss: WebSocketServer,
  ws: WebSocket,
) {
  const { event, data }: Message = JSON.parse(raw.toString());
  const func = router[event];
  if (func !== undefined) func(data, wss, ws);
}

