const { REST, Routes, Collection, Client } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config();

module.exports = {
    id: 'slash',
    aliases: [],
    path: '/slash.js',
    reload_able: false,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        try {
            client.slash_commands = new Collection()
            const commands = [];
            const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
            fs.readdirSync('./interactions/slash/').forEach(async file => {
                const command = require(`../interactions/slash/${file}`);
                commands.push(command.data.toJSON());
                client.slash_commands.set(command.data.name, command);
            })
            try {
                await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: commands },
                );
            } catch (e) {
                console.error(e);
            }
        } catch (e) {
            console.error(e)
        }

    }
}