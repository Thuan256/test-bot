const { ModalSubmitInteraction, Client } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
     */
    execute: async (interaction, client) => {
        if (!interaction.isModalSubmit()) return;

        const [modalId] = interaction.customId.split('.')
        const modal = client.modals.get(modalId)

        if (!modal) return;

        modal.execute(interaction, client)
    },
};