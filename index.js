const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js')
const fs = require('node:fs')
const { consolelog } = require('my-utils')

require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers
    ], partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.Channel,
        Partials.ThreadMember
    ],
})

client.once('ready', async (client) => {
    try {

        consolelog('CLIENT', `&cLogged in as &f${client.user.tag}`);
        consolelog('CLIENT', `&aLoading data...`);

        const start = Date.now()

        console.log('---------------------------------------------------')

        client.handlers = new Collection();

        fs.readdirSync('./handlers').forEach(async (handler) => {

            if (handler.endsWith('.js')) {
                const file = require(`./handlers/${handler}`)
                client.handlers.set(file.id.toLowerCase(), file)
            } else {
                const files = fs.readdirSync(`./handlers/${handler}/`).filter(f => f.endsWith('.js'))

                for (const file of files) {
                    let data = require(`./handlers/${handler}/${file}`);
                    client.handlers.set(data.id.toLowerCase(), data)
                }
            }

        })

        consolelog('HANDLERS', `&aLoading... &d${client.handlers.size} &ehandlers`);

        /**
         * 
         * @param {Collection} collection 
         * @returns 
         */
        function Sort(collection) {
            const positives = [];
            const negatives = [];
            const noPosition = [];

            Array.from(collection.entries()).forEach(([key, value]) => {
                if (value.position > 0) {
                    positives.push([key, value]);
                } else if (value.position < 0) {
                    negatives.push([key, value]);
                } else {
                    noPosition.push([key, value]);
                }
            });

            positives.sort((a, b) => a[1].position - b[1].position);
            negatives.sort((a, b) => a[1].position - b[1].position);

            const sortedCollection = new Collection();

            positives.forEach(([key, value]) => {
                sortedCollection.set(key, value);
            });

            noPosition.forEach(([key, value]) => {
                sortedCollection.set(key, value);
            });

            negatives.forEach(([key, value]) => {
                sortedCollection.set(key, value);
            });

            return sortedCollection;
        }

        client.handlers = Sort(client.handlers)


        async function load() {
            for (const [_, handler] of client.handlers) {
                await handler.run(client)
            }
        }

        const guild = await client.guilds.fetch('755793441287438469')
        await guild.members.fetch()
        await guild.roles.fetch()

        await load()
        console.log('---------------------------------------------------')
        consolelog('CLIENT', `&aLoad finished in &d${Date.now() - start}ms`);
        consolelog('CLIENT', `&cBot is ready to use`);
        console.log('---------------------------------------------------')

    } catch (e) {
        console.error(e)
    }
})

client.login(process.env.TOKEN)