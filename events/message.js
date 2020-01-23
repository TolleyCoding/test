const config = require('../util/configReader').config;
const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = message => {
    const client = message.client;
    if (message.author.bot) return;
    if (!message.guild) return message.reply('Sorry ChatBot does not supports commands from DMs at the moment.');

    const prefix = config.Bot.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    } else if (cmd.conf.enabled === false) {
        return message.reply(':frowning: Sorry, that command is disabled.');
    } else {
        return message.reply(':frowning: I don\'t recognize that command. Do `' + prefix + 'help` to see all of my commands. If you believe this is in error then dm <@251055152667164676>');
    }
    const perms = client.elevation(message, cmd.conf.permLevel);
    if (perms === 'fail') return;
    if (perms < cmd.conf.permLevel) return message.reply(`You do not have permission to do this! You need Permlevel ${cmd.conf.permLevel} but you only have Permlevel ${perms}`);
    try {
        main.verbose(`User ${message.author.id} (${message.author.username}#${message.author.discriminator}) is running '${message.content}' in Guild ${message.guild.id} (${message.guild.name})`);
        cmd.run(client, message, args);
    } catch (err) {
        main.warn(`There was an error while User ${message.author.id} (${message.author.username}#${message.author.discriminator}) was running '${message.content}' in Guild ${message.guild.id} (${message.guild.name}) The content was\n${err}`);
        return message.reply('Sorry an error has occurred please DM <@251055152667164676> with the error message below\n```Command Runner: ' + err + '```');
    }

};