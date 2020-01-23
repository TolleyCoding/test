const fs = require('fs');
exports.run = (client, message) => {
    message.reply(`I am in ${client.guilds.array().length} servers! I'll put a list of them in a text file for you. Wait a sec :)`);
    client.guilds.forEach((guild) => {
        fs.appendFileSync(`./serverList${message.author.id}.txt`, ` - ${guild.name}\n`);
    });
    message.reply('Done! Here it is.', {files: [`serverList${message.author.id}.txt`]});
    setTimeout(() => {
        fs.unlinkSync(`./serverList${message.author.id}.txt`);
    }, 1000);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sl'],
    permLevel: 4
};

exports.help = {
    name: 'serverlist',
    description: 'Lists all the servers that the bot is connected to.',
    usage: 'serverlist <game>'
};
