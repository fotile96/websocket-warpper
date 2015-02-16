var LISTEN=2334;
var REMOTE_URL='http://178.18.17.182:81';

var io=require('socket.io-client');
var ss=require('socket.io-stream');

var server=require('net').createServer();

var ws=ss(io.connect(REMOTE_URL));
// ws.on('connect',function(){
// 	console.log('Connected to WS server.');
// });
server.listen(LISTEN,function(){
	console.log('Listen on port '+LISTEN+'.');
});
server.on('connection',function(client){
	console.log('Request Received.');
	var stream=ss.createStream();
	ws.emit('req',stream);
	stream.pipe(client);
	client.pipe(stream);
});
