const { Client } = require('discord.js');
const { readdirSync } = require('node:fs');
const { consolelog } = require("my-utils");;

module.exports = {
    id: 'events',
    aliases: ['event', 'e'],
    path: '/events.js',
    position: -2,
    reload_able: true,
    /**
     * 
     * @param {Client} client 
    */
    run: async (client) => {
        try {
            consolelog('EVENTS', `&aLoading...`)

            client.eventNames().forEach(eventName => {
                client.listeners(eventName).forEach(listener => {
                    if (listener.name === 'discordListener')
                        client.off(eventName, listener)
                })
            })
            client.setMaxListeners(0);

            const events = readdirSync('./events/').filter(file => file.endsWith(".js"));

            for (let path of events) {

                delete require.cache[require.resolve(`../events/${path}`)];
                const event = require(`../events/${path}`);

                const discordListener = (...args) => event.execute(...args, client)

                if (event.once) client.once(event.name, discordListener)
                else client.on(event.name, discordListener)

                consolelog('EVENT', `&aLoaded &e${event.name} &f( &d${path}&f )`)
            }
        } catch (e) {
            console.error(e);
        }
    }
}