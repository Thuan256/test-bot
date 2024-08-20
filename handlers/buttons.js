const { readdirSync } = require('node:fs');
const { Collection } = require('discord.js');
const { consolelog } = require("my-utils");;

module.exports = {
    id: 'buttons',
    aliases: ['button'],
    path: '/buttons.js',
    reload_able: true,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        consolelog('BUTTON', `&aLoading...`);
        
        client.buttons = new Collection();

        const buttonFiles = readdirSync(`./interactions/buttons`).filter(file => file.endsWith('.js'));

        for (var file of buttonFiles) {

            delete require.cache[require.resolve(`../interactions/buttons/${file}`)];
            const button = require(`../interactions/buttons/${file}`);
            client.buttons.set(button.name, button);

            consolelog('BUTTON', `&aLoaded &e${button.name}`);
        }
    }
}