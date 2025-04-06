import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from './config';


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws , req) {
  
  // get the url from the request
  const url = req.url ;  //ws://localhost:8080?token=239482039 
 if(!url){
    return ; 
  }
  const queryParams = new URLSearchParams(url.split("?")[1]); // ["localhost:8080" , "token=239482039"]
  const token = queryParams.get("token") as string;

  const decoded = jwt.verify(token , JWT_SECRET);

  if(typeof decoded == "string"){
    ws.close();
    return ; 
  }

  if(!decoded || !(decoded as JwtPayload).userId){
    ws.close();
      return ; 
  }

  ws.on('message', function message(data) {
      ws.send(`pong`);
  });

});