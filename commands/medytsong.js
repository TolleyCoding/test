const request = require("request");

function YouTubeGetID(url) {
    var ID = "";
    url = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        // eslint-disable-next-line no-useless-escape
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}


exports.run = (client, message, params) => {
    if (params.length != 1) {
        return message.reply("You need to supply a YouTube URL");
    }
    const id = YouTubeGetID(params[0]);
    request({
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyCkm1BGHl3R7xmzx2Abw2WLjpMbmdTpaxY&id=${id}`,
        json: true
    }, (err, res, body) => {
        try {
            const embed = {
                "title": "Mediocre Song",
                "color": 15400704,
                "timestamp": new Date(),
                "footer": {
                    "icon_url": message.author.displayAvatarURL,
                    "text": `Added by ${message.author.tag}`
                },
                "image": {
                    "url": `https://img.youtube.com/vi/${id}/0.jpg`
                },
                "fields": [
                    {
                        "name": "Name:",
                        "value": body.items[0].snippet.title
                    },
                    {
                        "name": "URL:",
                        "value": `https://www.youtube.com/watch?v=${id}`
                    }
                ]
            };
            message.channel.send({ embed });
            message.delete();
        } catch (error) {
            console.error(error);
            console.error("Error above handled");
            message.reply("Sorry, an error occurred. Please message <@251055152667164676>");
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: "medytsong",
    description: "Creates a rich embed with a YouTube link",
    usage: "medytsong [link] [name]"
};