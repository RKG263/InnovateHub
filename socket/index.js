const http = require('http');
const socketIo = require('socket.io');

// Create HTTP server
const server = http.createServer();

// Create Socket.io server instance with CORS enabled
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173", // Allow connections from this origin
  },
});

// Connection event handler
io.on('connection', (socket) => {
    console.log('New client connected');

    // Join event handler
    socket.on('join', (userId) => {
        console.log(`User ${userId} joined`);
        socket.join(userId);
    });

    // Private message event handler
    socket.on('private_message', ({ recipientId, msg }) => {
        console.log(`Sending private message to ${recipientId}`);
        io.to(recipientId).emit('private_message', msg);
    });

    // Disconnect event handler
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Define port
const port =  4000;

// Start server listening on the specified port
server.listen(port, () => console.log(`Server running on port ${port}`));
