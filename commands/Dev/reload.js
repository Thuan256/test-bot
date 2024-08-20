const { Message, Client, EmbedBuilder } = require("discord.js")
const { error } = require("my-utils");

module.exports = {
    name: 'reload',
    category: 'Dev',
    aliases: ['rl'],
    /**
     *
     * @param {Client} client 
     * @param {Message<true>} message 
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        try {
            if (!args[0]) return error('Vui lòng nhập id handler', message)

            let handlers = []
            let invalidHandlers = []
            let cantReloads = []
            let loadErrors = []

            handlers = args.join('').split(',').map(i => i.trim().toLowerCase())

            let e = new EmbedBuilder()
                .setColor('Yellow')
                .setDescription(`${client.emoji.loading} Reloading...`)
            let m = await message.reply({ embeds: [e] }).catch(() => { })

            for (let id of handlers) {
                const handler = client.handlers.get(id) || client.handlers.find(i => i.aliases?.includes(id))
                if (!handler) invalidHandlers.push(id)
                else if (!handler.reload_able) cantReloads.push(handler.id)

            }

            handlers = handlers.filter(i => !invalidHandlers.includes(i) && !cantReloads.includes(i)).map(id => client.handlers.get(id) || client.handlers.find(i => i.aliases?.includes(id)))

            for (const handler of handlers) {
                try {
                    delete require.cache[require.resolve(`../../handlers/${handler.path}`)]
                    const file = require(`../../handlers/${handler.path}`)

                    client.handlers.set(file.id, file)
                    await file.run(client)

                } catch (e) {
                    console.error(e)
                    loadErrors.push(handler.id)
                }
            }

            handlers = handlers.filter(i => !loadErrors.includes(i.id))

            let description = []

            e = new EmbedBuilder()
                .setAuthor({ name: 'Reload System', iconURL: 'https://cdn-icons-png.flaticon.com/128/5075/5075527.png' })
                .setColor('2b2d31')

            handlers.length > 0 && description.push(`${client.emoji.greentick} Reloaded: ${handlers.map(i => `\`${i.id}\``).join(', ')}`)
            invalidHandlers.length > 0 && description.push(`${client.emoji.cross} Not found: ${invalidHandlers.map(i => `\`${i}\``).join(', ')}`)
            cantReloads.length > 0 && description.push(`${client.emoji.cross} Can't reload : ${cantReloads.map(i => `\`${i}\``).join(', ')}`)
            loadErrors.length > 0 && description.push(`${client.emoji.cross} Load failed: ${loadErrors.map(i => `\`${i}\``).join(', ')}`)

            e.setDescription(description.join('\n'))
            await m.edit({ embeds: [e] }).catch(() => { })
        } catch (e) {
            console.error(e)
        }
    }
}