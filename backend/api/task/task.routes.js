const express = require('express')
const { getTasks, getTask, addTask, deleteTask, updateTask, performTask } = require('./task.controller')
const router = express.Router()

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', addTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.put('/:id/start', performTask)

module.exports = router