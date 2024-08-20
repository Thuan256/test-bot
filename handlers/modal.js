const { readdirSync } = require('node:fs');
const { Collection, Client } = require('discord.js');
const { consolelog } = require("my-utils");;

module.exports = {
    id: 'modals',
    aliases: ['modal'],
    path: '/modal.js',
    reload_able: true,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        try {
            consolelog('MODAL', `&aLoading...`);

            client.modals = new Collection();

            const modalFiles = readdirSync(`./interactions/modals/`).filter(file => file.endsWith('.js'));

            for (var file of modalFiles) {

                delete require.cache[require.resolve(`../interactions/modals/${file}`)];
                const modal = require(`../interactions/modals/${file}`);

                client.modals.set(modal.name, modal);
                consolelog('MODAL', `&aLoaded &e${modal.name}`);
            }
        } catch (e) {
            console.error(e)
        }
    }
}