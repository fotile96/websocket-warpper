var LISTEN=2333;
var REMOTE_ADDR='127.0.0.1';
var REMOTE_PORT=233;

var io=require('socket.io')(LISTEN);
var net=require('net');

io.on('connection',function(ws){
	console.log('A client connected.');
	var client=net.connect({host:REMOTE_ADDR,port:REMOTE_PORT});
	ws.on('data',function(data){
		client.write(data);
	});
	client.on('connect',function(){
		ws.emit('tcpok');
	});
	client.on('data',function(data){
		if(data)ws.emit('data',data);
	});
	client.on('end',function(data){
		if(data)ws.emit('data',data);
		ws.conn.transport.end();
	});
	ws.on('disconnect',function(){
		client.end();
	});
	ws.on('close',function(){
		client.end();
	});
});
