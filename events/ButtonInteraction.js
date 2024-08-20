const { ButtonInteraction, Client } = require("discord.js");
const { error } = require("my-utils");

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    execute: async (interaction, client) => {
        try {
            //if (Date.now() - interaction.message.createdTimestamp > 60 * 1000 * 10) return;

            delete require.cache[require.resolve(`../data/setting.json`)];
            const setting = require('../data/setting.json')
            if (
                setting.lockdown
                && !setting.admin.includes(interaction.user.id)
                && !setting.whitelist.includes(interaction.user.id)
            ) return;

            if (!interaction.isButton()) return

            const { customId } = interaction

            const [buttonId, userId] = customId.split('.')

            var button = client.buttons.get(buttonId)
            if (!button) return;

            if (userId !== 'none') if (userId && (userId !== interaction.user.id)) return error('Bạn không được dùng nút này', interaction);

            await button.execute(interaction, client)
        } catch (e) {
            console.error(e)
        }
    },
};