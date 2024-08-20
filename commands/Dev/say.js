const { Message, Client } = require("discord.js")
module.exports = {
    name: 'say',
    category: 'Dev',
    aliases: [''],
    /**
    *
    * @param {Client} client 
    * @param {Message<true>} message 
    * @param {string[]} args
    */
    run: async (client, message, args) => {
        try {
            var channel = client.channels.cache.get(args[0]) || message.mentions.channels.first()
            if (channel) args.shift()
            else channel = message.channel
            await channel.send(`${args.join(' ')}`)
                .catch(async () => { return message.react(client.emoji.cross).catch(() => { }) })
                .then(() => {
                    message.delete().catch(() => { })
                })
        } catch (e) {
            console.error(e)
        }
    }
}