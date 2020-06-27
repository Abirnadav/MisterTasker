const taskService = require('./task.service')
const externalService = require('../../services/externalService.js')


async function getTask(req, res) {
    const task = await taskService.getById(req.params.id)
    res.send(task)
}

async function getTasks(req, res) {
    const tasks = await taskService.query(req.query)
    res.send(tasks)
}

async function deleteTask(req, res) {
    await taskService.remove(req.params.id)
    res.end()
}

async function updateTask(req, res) {
    const task = req.body;
    await taskService.update(task)
    res.send(task)
}

async function addTask(req, res) {
    const task = req.body;
    await taskService.add(task)
    res.send(task)
}

async function performTask(req, res) {

    const task = await taskService.getById(req.params.id)
    try {
        await externalService.execute(task)
        task.doneAt = Date.now()
    } catch (error) {
        console.log(error, '- task failed')
    } finally {
        task.lastTriedAt = Date.now()
        task.triesCount++
        taskService.update(task)
        res.send(task)
    }
}

module.exports = {
    getTask,
    getTasks,
    deleteTask,
    updateTask,
    addTask,
    performTask
}