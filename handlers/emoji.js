const { Client } = require('discord.js');
const { consolelog } = require("my-utils");;

module.exports = {
    id: 'emoji',
    path: '/emoji.js',
    reload_able: true,
    /**
     * 
     * @param {Client} client 
    */
    run: async (client) => {
        try {
            consolelog('EMOJI', `&aLoading...`)

            client.emoji = {}

            delete require.cache[require.resolve('../data/emoji.json')]
            const emoji = require('../data/emoji.json')
            client.emoji = emoji

            consolelog('EMOJI', `&aLoaded &d${Object.keys(emoji).length} &eemojis`)
        } catch (e) {
            console.error(e)
        }
    }
}