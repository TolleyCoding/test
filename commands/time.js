exports.run = (client, message) => {
    const d = new Date(new Date().toUTCString());
    message.reply(`The current time is ${d}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["t"],
    permLevel: 1
};

exports.help = {
    name: "time",
    description: "Gives the current time",
    usage: "time",
};