const { Client, Message } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'Mics',
    /**
     * 
     * @param {Client} client 
     * @param {Message<true>} message 
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        try {
            
            const m = await message.reply({
                content: 'Pong!',
                allowedMentions: { repliedUser: false }
            }).catch(() => { });

            const ping = m.createdTimestamp - message.createdTimestamp

            await m.edit({
                content: `Pong! \`${ping}ms\``,
                allowedMentions: { repliedUser: false }
            }).catch(() => { })
        } catch (e) {
            console.error(e)
        }

    }
}