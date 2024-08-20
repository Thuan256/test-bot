const { Message, EmbedBuilder, Interaction } = require("discord.js");

/**
 * 
 * @param {string} err 
 * @param {Message<true> | Interaction} meta
 */
exports.error = async (err, meta) => {
    try {

        if (!meta) throw new Error('INVALID_META')
        const e = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`<:cross_:967784767514869801> ${err}`)

        const msg = { embeds: [e], allowedMentions: { repliedUser: false }, ephemeral: true }

        let m;

        m = await meta?.reply(msg).catch(async () => {

            if (!!meta?.followUp) {
                m = await meta.followUp(msg).catch(async () => {
                    m = await meta.channel.send({ embeds: [e] }).catch(() => { })
                })
            } else m = await meta.channel.send({ embeds: [e] }).catch(() => { })
        })

        setTimeout(() => {
            if (!m) return;
            m.delete().catch(() => { })
        }, 45000);

    } catch (e) {
        console.error(e)
    }
}