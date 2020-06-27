
const dbService = require('../../services/db.service')
const externalService = require('../../services/externalService.js')
const connectSockets = require('../../api/socket/socket.routes')

const ObjectId = require('mongodb').ObjectId


module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    runInterval,
}

function runInterval() {
    setInterval(async () => {
        const taskArr = await getTaskToExec()
        const task = taskArr[0]
        if (!task) return

        try {
            console.log('Trying task', task)
            await externalService.execute(task)
            task.doneAt = Date.now()


        } catch (error) {
            console.log(error, 'Task has failed')
        } finally {
            task.lastTriedAt = Date.now()
            task.triesCount++

            update(task)
        }
    }, 3000);
}

async function getTaskToExec() {
    const criteria = {}
    const sortCriteria = {}
    criteria['doneAt'] = null
    sortCriteria['triesCount'] = 1
    sortCriteria['importance'] = -1
    const collection = await dbService.getCollection('task')
    try {
        var taskRes = await collection.find(criteria).sort(sortCriteria).limit(1).toArray();
        if (taskRes.length === 0) console.log('no pending tasks...')
        return taskRes
    } catch (err) {
        console.log('ERROR: cannot find  tasks')
        throw err;
    }
}



async function query(filterBy = {}) {
    const sortCriteria = {}
    const collection = await dbService.getCollection('task')
    try {
        var tasks = await collection.find({}).toArray();
        return tasks
    } catch (err) {
        console.log('ERROR: cannot find tasks')
        throw err;
    }
}

async function getById(taskId) {
    const collection = await dbService.getCollection('task')
    try {
        const task = await collection.findOne({ "_id": ObjectId(taskId) })
        return task
    } catch (err) {
        console.log(`ERROR: while finding task ${taskId}`)
        throw err;
    }
}


async function remove(taskId) {
    const collection = await dbService.getCollection('task')
    try {
        await collection.deleteOne({ "_id": ObjectId(taskId) })
    } catch (err) {
        console.log(`ERROR: cannot remove task ${taskId}`)
        throw err;
    }

}

async function update(task) {
    const collection = await dbService.getCollection('task')
    task._id = ObjectId(task._id);

    try {
        await collection.replaceOne({ "_id": task._id }, { $set: task })

        return task
    } catch (err) {
        console.log(`ERROR: cannot update task ${task._id}`)
        throw err;
    }
}

async function add(task) {
    delete task._id;
    const collection = await dbService.getCollection('task')
    try {
        await collection.insertOne(task);
        return task;
    } catch (err) {
        console.log(`ERROR: cannot insert task`)
        throw err;
    }
}
