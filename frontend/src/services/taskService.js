import HttpService from './HttpService'

const baseUrl = '/task'

export default {
    query,
    save,
    update,
    remove,
    get,
    taskStart
}

function update(task, value, field) {
    task[field] = value
    return HttpService.put(`${baseUrl}/${task._id}`, task)

}


async function query(filterBy) {
    if (!filterBy) return HttpService.get(`${baseUrl}`);
}

function get(id) {
    return HttpService.get(`${baseUrl}/${id}`)
}


function remove(id) {
    return HttpService.delete(`${baseUrl}/${id}`)
}

function save(task) {
    if (!task._id) {
        return HttpService.post(`${baseUrl}`, task)

    }
    return HttpService.put(`${baseUrl}/${task._id}`, task)
}

async function taskStart(taskId) {
    try {
        return HttpService.put(`${baseUrl}/${taskId}/start`, taskId)
    }
    catch (err) {
        console.log(err)
    }
}






