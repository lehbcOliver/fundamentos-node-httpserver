import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform{
  _transform(chunk, encoding, callback){
    const transformed = Number(chunk.toString() * -1);
    console.log(transformed)
    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (request, response)=>{
  const buffer = [];

  for await (const chunk of request){
    buffer.push(chunk);
  }
  const fullStreamcontent = Buffer.concat(buffer).toString();
  console.log(fullStreamcontent);
  return response.end(fullStreamcontent);

  // return request
  // .pipe(new InverseNumberStream())
  // .pipe(response)
})


server.listen(3334);