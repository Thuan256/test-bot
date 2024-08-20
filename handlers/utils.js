const { consolelog } = require('../utils/consolelog')

module.exports = {
    id: 'utils',
    aliases: ['util', 'u'],
    path: '/utils.js',
    reload_able: true,
    run: async () => {
        try {
            consolelog('UTILS', `&aLoading...`)

            delete require.cache[require.resolve('my-utils')]
            const utils = require('my-utils')

            consolelog('UTILS', `&aLoaded &d${Object.values(utils).length} &eutils`)

        } catch (e) {
            console.error(e)
        }
    }
}