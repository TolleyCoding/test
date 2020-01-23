exports.run = (client, message) => {
    const d = new Date(new Date().toUTCString());
    message.reply(`The current zulu time is ${d}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['t'],
    permLevel: 1
};

exports.help = {
    name: 'time',
    description: 'Gives the current bot time',
    usage: 'time',
};