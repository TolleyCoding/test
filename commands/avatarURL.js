exports.run = (client, message, params) => {
    if (params.length != 1) {
        return message.reply("You need to mention someone");
    }
    message.reply(`${message.mentions.users.first()}'s avatar URL is: ${message.mentions.users.first().displayAvatarURL}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: "avatarurl",
    description: "Gets a url to the mentioned users avatar",
    usage: "avatarurl [mention]"
};