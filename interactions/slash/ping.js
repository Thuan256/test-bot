const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    run: async (client, interaction) => {
        interaction.reply(`Pong!`)
        // komuta seçenekler eklemek istersen guide: https://discordjs.guide/interactions/slash-commands.html#options
    }
};