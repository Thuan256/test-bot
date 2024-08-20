module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {
        if (!interaction.isCommand()) return
        const command = client.slash_commands.get(interaction.commandName.toLowerCase())
        if (!command) return;
        command.run(client, interaction)
    }
}