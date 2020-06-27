const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const taskService = require('./api/task/task.service')
taskService.runInterval()
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        origin: /http:\/\/localhost:\d+/,
        credentials: true
    };
    app.use(cors(corsOptions));
}

const taskRoutes = require('./api/task/task.routes')

const connectSockets = require('./api/socket/socket.routes')


// routes
app.use('/api/task', taskRoutes)
connectSockets.connectSockets(io)
const port = process.env.PORT || 3030;

http.listen(port, () => {
    console.log('Server is running on port: ' + port)
});

