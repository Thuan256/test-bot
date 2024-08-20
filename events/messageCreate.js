const config = require('../config.json');
const { PermissionsBitField, Client, Message } = require('discord.js');
const { runCommand } = require("my-utils");;

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Message<true>} message 
     * @param {Client} client 
     * @returns 
     */
    execute: async (message, client) => {
        try {

            function check(perm) {
                if (message.channel.permissionsFor(client.user.id).has(perm)) {
                    return true
                } else return false
            }

            if (message.author.bot) return;
            if (!message.guild) return;

            delete require.cache[require.resolve(`../data/setting.json`)];
            const setting = require('../data/setting.json')
            if (
                setting.lockdown
                && !setting.admin.includes(message.author.id)
                && !setting.whitelist.includes(message.author.id)
            ) return;

            const prefixs = [config.prefix, ...new Set(client.commands.filter(cmd => cmd.cprefix).map(i => i.cprefix))]
            var content = message.content.toLowerCase()

            const prefix = prefixs.find(i => content.toLowerCase().startsWith(`${i}`))
            if (!prefix) return;

            const args = message.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g);
            const cmd = args.shift().toLowerCase();

            if (cmd.length == 0) return;

            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
            if (!command) return;

            if ((!command.cprefix && prefix !== config.prefix) || (command.cprefix && command.cprefix !== prefix)) return;

            if (
                (command.requireSpace == undefined && content.split(/ +/g).shift() !== prefix) ||
                (command.requireSpace == false && content.slice(prefix.length).startsWith(' '))
            ) return;

            const _send = check([PermissionsBitField.Flags.SendMessages])
            const _sendEmbed = check([PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles])

            if (!_send) return message.author.send(`> Mình không có quyền gửi tin nhắn vào kênh ${message.channel} ${client.emoji.khoc}`).catch(() => { return })
            else if (!_sendEmbed) return message.channel.send(`> Mình không có quyền gửi ảnh hoặc liên kết vào kênh này ${client.emoji.khoc}`)

            runCommand(client, command, null, message, args);
        } catch (e) {
            console.error(e)
        }
    },
};
