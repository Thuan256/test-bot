const { Message, ButtonBuilder, EmbedBuilder, ComponentType, StringSelectMenuBuilder } = require("discord.js")

/**
 * 
 * @param {Message} message 
 * @param {number} timeout 
 */
exports.disableComponents = (message, timeout) => {
    try {
        if (!message) return;
        if (!timeout) timeout = 0

        setTimeout(async () => {

            message = await message?.fetch().catch(() => { })

            if (message) {
                if (message.components.length == 0) return;
                message.components.forEach(component => {
                    component.components.forEach((_component, index) => {

                        let standardComponent

                        if (_component.data.type == ComponentType.Button) {
                            standardComponent = ButtonBuilder.from(_component)
                        } else if (_component.data.type == ComponentType.StringSelect) {
                            standardComponent = StringSelectMenuBuilder.from(_component)
                        }

                        standardComponent.setDisabled(true)

                        component.components[index] = standardComponent
                    })
                })

                const { embeds } = message;

                if (embeds[0]) {
                    var embed = EmbedBuilder.from(embeds[0])
                        .setColor('Grey')
                }

                message.edit({ embeds: [embed], components: message.components, files: [] }).catch(() => { return })
            }
        }, timeout);
    } catch (e) {
        console.error(e)
    }
}