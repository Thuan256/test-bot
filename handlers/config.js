const { Client } = require("discord.js");
const fs = require('node:fs')
const { consolelog } = require("my-utils");

module.exports = {
    id: 'config',
    path: '/config.js',
    position: 2,
    reload_able: true,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        try {
            consolelog('CONFIG', `&aLoading...`)

            const jsonString = fs.readFileSync('./config.json', 'utf-8')
            let config = JSON.parse(jsonString)

            client.config = config

            consolelog('CONFIG', `&aLoaded...`)
        } catch (e) {
            console.error(e)
        }
    }
}