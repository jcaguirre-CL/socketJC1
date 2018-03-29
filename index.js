var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/verde', function(req, res){
	console.log('cambiamos a verde');
	io.emit('cambiarVerde', 'verde');
	res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Cambiamos a verde');
        res.end();
});
////From githug
app.get('/azul', function(req, res){
	console.log('cambiamos a azul');
	io.emit('cambiarAzul', 'azul');
	res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Cambiamos a azul');
        res.end();
});
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message from client: ' + msg);
    io.emit('chat message', msg);
  });
	
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
