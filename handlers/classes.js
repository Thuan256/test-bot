const { consolelog } = require('../utils/consolelog')

module.exports = {
    id: 'classes',
    aliases: ['class', 'cl'],
    path: '/classes.js',
    reload_able: true,
    run: async () => {
        try {
            consolelog('CLASSES', `&aLoading...`)

            delete require.cache[require.resolve('my-classes')]
            const classes = require('my-classes')

            consolelog('CLASSES', `&aLoaded &d${Object.values(classes).length} &eclasses`)

        } catch (e) {
            console.error(e)
        }
    }
}