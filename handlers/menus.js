const { Collection, Client } = require("discord.js");
const { consolelog } = require("my-utils");
const fs = require('node:fs');

module.exports = {
    id: 'menus',
    aliases: ['menu'],
    path: '/menus.js',
    reload_able: true,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        try {
            consolelog('SELECT_MENUS', `&aLoading...`)

            client.menus = new Collection()

            fs.readdirSync('./interactions/menus').forEach(dir => {
                if (dir.endsWith('.js')) {

                    delete require.cache[require.resolve(`../interactions/menus/${dir}`)]
                    let menu = require(`../interactions/menus/${dir}`);

                    if (menu.name) {
                        client.menus.set(menu.name, menu)
                        consolelog('SELECT_MENUS', `&aLoaded &e${dir}`)
                    }
                } else {
                    const values = fs.readdirSync(`./interactions/menus/${dir}/`).filter(f => f.endsWith('.js'))

                    for (const file of values) {

                        delete require.cache[require.resolve(`../interactions/menus/${dir}/${file}`)]
                        let value = require(`../interactions/menus/${dir}/${file}`);

                        if (value.name) {
                            client.menus.set(value.name, value);
                            consolelog('SELECT_MENUS', `&aLoaded &e${file}`)
                        } else continue
                    }
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
}