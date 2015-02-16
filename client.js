var LISTEN=2334;
var REMOTE_URL='http://178.18.17.182:81';

var io=require('socket.io-client');

var server=require('net').createServer();
server.listen(LISTEN,function(){
	console.log('Listen on port '+LISTEN);
});
server.on('connection',function(socket){
	console.log('!');
	// var remote_tcpok=false;
	var pool=[];
	var ws=io.connect(REMOTE_URL,{'force new connection': true});
	socket.pause();
	ws.on('connect',function(){
		console.log('Websocket connected.');
	});
	socket.on('data',function(data){
		// if(remote_tcpok){
		// 	ws.emit('data',data);
		// }else{
		// 	pool.push(data);
		// }
		ws.emit('data',data);
	});
	ws.on('tcpok',function(){
		// remote_tcpok=true;
		// for(var i=0;i<pool.length;i++)ws.emit('data',pool[i]);
		// pool=null;
		socket.resume();
	});
	ws.on('data',function(data){
		if(data)socket.write(data);
	});
	ws.on('disconnect',function(){
		socket.end();
	});
	ws.on('close',function(){
		socket.end();
	});
	socket.on('end',function(data){
		if(data)ws.emit('data',data);
		ws.close();
	});
});
