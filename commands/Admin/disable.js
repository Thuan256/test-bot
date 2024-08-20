const { EmbedBuilder, Client, Message } = require("discord.js");
const fs = require("fs")
const { error } = require("my-utils");;

module.exports = {
    name: 'disable',
    category: 'Admin',
    /**
     * 
     * @param {Client} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        try {

            const commands = client.commands;
            const aliases = client.aliases;
            const subCommands = client.subCommands;
            const subAliases = client.subAliases;
            const cmdStatus = client.cmdStatus;

            const disable = async (cmd, id, type) => {
                if (cmd === 'disable' || cmd === 'enable') return 'CAN_NOT_DISABLE';

                const commandsData = fs.readFileSync('././data/commands.json', 'utf8');
                const data = JSON.parse(commandsData);

                if (type === 'server') {
                    data[cmd].server = true;
                } else {
                    const disableIndex = data[cmd].disable[type].indexOf(id);
                    if (disableIndex !== -1) return 'DISABLED';

                    const enableIndex = data[cmd].enable[type].indexOf(id);
                    if (enableIndex !== -1) data[cmd].enable[type].splice(enableIndex, 1);

                    data[cmd].disable[type].push(id);
                }

                cmdStatus.set(cmd, data[cmd]);
                fs.writeFileSync('././data/commands.json', JSON.stringify(data, null, 2));
            }

            if (!args[0]) return error('Vui lòng nhập lệnh', message);

            const cmd = commands.get(args[0]) || aliases.get(args[0]);
            if (!cmd) {
                const category = args[0].toLowerCase();
                const cmds = commands.filter(c => String(c.category).toLowerCase() === category);

                if (!cmds.size) return error(`Không tìm thấy lệnh/ nhóm lệnh \`${category}\``, message);

                const [_, arg] = args;

                const role = message.guild.roles.cache.get(arg) || message.mentions.roles.first();
                const user = message.guild.members.cache.get(arg) || message.mentions.members.first();
                const channel = client.channels.cache.get(arg) || message.mentions.channels.first();

                const [type, id, text] = (!arg) ? ['channels', message.channel.id, `cho kênh <#${message.channel.id}>`] :
                    role ? ['roles', role.id, `cho role <@&${role.id}>`] :
                        user ? ['users', user.id, `cho <@${user.id}>`] :
                            channel ? ['channels', channel.id, `cho kênh <#${channel.id}>`] :
                                arg === 'server' ? ['server', null, 'trong toàn bộ máy chủ'] :
                                    error(`\`${arg}\` không phải vai trò, kênh hay người dùng`, message);

                cmds.forEach(async (cmd) => await disable(cmd.name, id, type));

                const e = new EmbedBuilder()
                    .setDescription(`${client.emoji.greentick} Đã tắt nhóm lệnh ${category} ${text}`)
                    .setColor('Green');

                await message.reply({ embeds: [e], allowedMentions: { repliedUser: false } }).catch(() => { });

            } else {
                const subCommand = subCommands[cmd]

                const subcmd = subCommand?.get(args[1])
                    || subCommand?.get(subAliases?.get(args[1]))

                const arg = subcmd ? args[2] : args[1]

                const role = message.guild.roles.cache.get(arg) || message.mentions.roles.first();
                const user = message.guild.members.cache.get(arg) || message.mentions.members.first();
                const channel = client.channels.cache.get(arg) || message.mentions.channels.first();

                const [type, id, text] = (!arg) ? ['channels', message.channel.id, `cho kênh <#${message.channel.id}>`] :
                    role ? ['roles', role.id, `cho role <@&${role.id}>`] :
                        user ? ['users', user.id, `cho <@${user.id}>`] :
                            channel ? ['channels', channel.id, `cho kênh <#${channel.id}>`] :
                                arg === 'server' ? ['server', null, 'trong toàn bộ máy chủ'] :
                                    error(`\`${arg}\` không phải vai trò, kênh hay người dùng`, message);


                const key = `${cmd.name} ${subcmd?.name || ''}`.trim()
                
                const result = await disable(key, id, type)

                if (result === 'DISABLED') return error(`Lệnh \`${key}\` đã được tắt rồi!`, message);
                else if (result === 'CAN_NOT_DISABLE') return error(`Không thể tắt lệnh \`${key}\``, message)

                const e = new EmbedBuilder()
                    .setDescription(`${client.emoji.greentick} Đã tắt lệnh \`${key}\` ${text}`)
                    .setColor('Green');

                await message.reply({ embeds: [e], allowedMentions: { repliedUser: false } }).catch(() => { });
            }
        } catch (e) {
            console.error(e);
        }
    }
};