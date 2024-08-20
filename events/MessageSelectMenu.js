const { StringSelectMenuInteraction, Client } = require("discord.js");
const { error } = require("my-utils");

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {StringSelectMenuInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    execute: async (interaction, client) => {
        if (!interaction.isStringSelectMenu()) return;

        await interaction.message.edit({ components: interaction.message.components }).catch(() => { })

        const [value] = interaction.values;
        const { customId } = interaction;
        const [menuId, userId] = customId.split('.')

        const menu = client.menus.get(value) || client.menus.get(menuId);

        if (!menu) return;

        if (userId && (userId !== interaction.user.id)) return error('Bạn không được dùng menu này', interaction);
        menu.execute(interaction, client)

    },
};