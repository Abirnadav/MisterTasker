

module.exports = {
    execute
}
function execute() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.7) resolve(parseInt(Math.random() * 100))
            else reject('Err');
        }, 0)
    })
}