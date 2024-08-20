module.exports = {
    name: 'error',
    once: false,
    execute: async (error) => {
        return console.error(error)
    }
}