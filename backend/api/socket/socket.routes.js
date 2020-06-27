
module.exports = {
    connectSockets,
    updateFinishedTask
}
let gSocket

function updateFinishedTask() {
    gSocket.emit('taskUpdate')
    console.log('task finished! sending emit')
}

function connectSockets(io) {
    io.on('connection', socket => {
        gSocket = socket
        console.log('socket on!')
    })
}