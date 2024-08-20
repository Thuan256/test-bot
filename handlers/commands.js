const { Collection, Client } = require('discord.js');
const fs = require('node:fs')
const { consolelog } = require("my-utils");;

module.exports = {
    id: 'command',
    aliases: ['cmd', 'c'],
    path: '/commands.js',
    reload_able: true,
    /**
     * 
     * @param {Client} client 
    */
    run: async (client) => {
        try {
            consolelog('COMMANDS', `&aLoading..`)

            client.commands = new Collection();
            client.subCommands = new Collection();
            client.subAliases = new Collection();
            client.aliases = new Collection();
            client.cmdStatus = new Collection();

            const jsonString = await fs.promises.readFile('./data/commands.json')
            const data = JSON.parse(jsonString)

            const df = {
                disable: {
                    channels: new Array(),
                    users: new Array(),
                    roles: new Array()
                },
                enable: {
                    channels: new Array(),
                    users: new Array(),
                    roles: new Array()
                },
                server: false
            }

            for (let commandDir of fs.readdirSync('./commands')) {
                const commandFiles = fs.readdirSync(`./commands/${commandDir}/`).filter(file => file.endsWith('.js'));
                for (let commandFile of commandFiles) {

                    let dir = `../commands/${commandDir}/${commandFile}`
                    delete require.cache[require.resolve(dir)];
                    const cmd = require(dir);

                    if (cmd.name) {
                        client.commands.set(cmd.name, cmd);
                        var subs = []

                        if (cmd.subcmd) {
                            client.subCommands[cmd.name] = new Collection();

                            let dir = `./commands/${commandDir}/subcommands-${cmd.name}/`

                            const subCommandFiles = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

                            for (let subCommandFile of subCommandFiles) {

                                delete require.cache[require.resolve(`.${dir}/${subCommandFile}`)];
                                const sub = require(`.${dir}/${subCommandFile}`)

                                if (sub.name) {

                                    subs.push(sub.name)
                                    client.subCommands[cmd.name].set(sub.name, sub)

                                    const key = `${cmd.name} ${sub.name}`
                                    if (!data[key]) data[key] = df
                                    client.cmdStatus.set(key, data[key])
                                }
                                if (sub.aliases && Array(sub.aliases)) sub.aliases.forEach(a => client.subAliases.set(a, sub.name))
                            }
                        }
                        consolelog('COMMANDS', `&aLoaded &e${cmd.name} ${(subs.length > 0) ? `&f(&d${subs.join(', ')}&f)` : ''}`)

                        const key = cmd.name
                        if (!data[key]) data[key] = df
                        client.cmdStatus.set(key, data[key])
                    }
                    if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
                }
            }

            fs.writeFileSync('./data/commands.json', JSON.stringify(data, null, 2))
        } catch (e) {
            console.error(e)
        }
    }
}