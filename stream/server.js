var LISTEN=2333;
var REMOTE_ADDR='127.0.0.1';
var REMOTE_PORT=233;

var io=require('socket.io')(LISTEN);
var ss=require('socket.io-stream');
var net=require('net');

io.on('connection',function(ws){
	console.log('Client connected.');
	ss(ws).on('req',function(stream){
		console.log('Request received.');
		var client=net.connect({host:REMOTE_ADDR,port:REMOTE_PORT});
		client.on('connect',function(){
			console.log('Remote connected.');
			stream.pipe(client);
			client.pipe(stream);
		});
	});
});
