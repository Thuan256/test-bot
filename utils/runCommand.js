const { Message, Client } = require("discord.js");

/**
 * 
 * @param {Client} client
 * @param {Object} command 
 * @param {Object} subCommand
 * @param {Message<true>} message 
 * @param {string[]} args 
 * @returns 
 */
exports.runCommand = async (client, command, subCommand, message, args, obj) => {
    try {

        const member = message.member
        const channel = message.channel

        const id = member.id

        const commandName = `${command.name} ${subCommand?.name ?? ''}`.trim()
        const cmdStatus = client.cmdStatus.get(commandName)

        const disabled = {
            user: cmdStatus.disable.users.includes(id),
            role: member.roles.cache.some(r => cmdStatus.disable.roles.includes(r.id)),
            channel: cmdStatus.disable.channels.includes(channel.id)
        }

        const enabled = {
            user: cmdStatus.enable.users.includes(id),
            role: member.roles.cache.some(r => cmdStatus.enable.roles.includes(r.id)),
            channel: cmdStatus.enable.channels.includes(channel.id)
        }

        function alert() {
            message.reply(`> ${client.emoji.cross} Lệnh \`${commandName}\` đã bị tắt trong kênh này hoặc bạn không được phép sử dụng!`).then((m) => {
                setTimeout(() => {
                    m.delete().catch(() => { })
                }, 20000);
            }).catch(() => { })
        }

        const checkResult =
            disabled.user
                ? false
                : enabled.user
                    ? true
                    : disabled.role && !enabled.role
                        ? false
                        : enabled.role
                            ? true
                            : disabled.channel
                                ? false
                                : enabled.channel
                                    ? true
                                    : cmdStatus.server
                                        ? false
                                        : true;

        if (!checkResult) return alert();

        if (subCommand) subCommand.run(client, message, args, obj);
        else command.run(client, message, args, obj);
    } catch (e) {
        console.error(e)
    }
}


//===========Lockdown Method===========
// const e = new EmbedBuilder()
//     .setColor('Gold')
//     .setDescription([
//         `<:warn:1125223856647458818> Tính năng đang trong quá trình bảo trì để nâng cấp và sửa chữa! Rất xin lỗi vì sự bất tiện này!`,
//         `• Mọi thắc mắc vui lòng liên hệ <@749125766402277377> !`
//     ].join('\n'))
// const _m = await message.reply({
//     embeds: [e],
//     allowedMentions: { repliedUser: false }
// }).catch(() => { })

// setTimeout(async () => {
//     await _m.delete().catch(() => { })
// }, 10000);
// break;
//===========Lockdown Method===========