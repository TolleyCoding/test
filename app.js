// cSpell:ignore Enmap, main
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./util/configReader").config;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Get Logger
require("./start_scripts");
const winston = require("winston");
const main = winston.loggers.get("main");
require("./util/eventLoader")(client);

//Print out lettering
main.verbose("  _                     _ _             ");
main.verbose(" | |                   | (_)            ");
main.verbose(" | |     ___   __ _  __| |_ _ __   __ _ ");
main.verbose(" | |    / _ \\ / _` |/ _` | | '_ \\ / _` |");
main.verbose(" | |___| (_) | (_| | (_| | | | | | (_| |");
main.verbose(" |______\\___/ \\__,_|\\__,_|_|_| |_|\\__, |");
main.verbose("                                   __/ |");
main.verbose("                                  |___/");
main.verbose("------------------------------------------------");

function init() {
    main.info("Connecting...");
}

function loadCommands() {

    let files;
    try {
        files = fs.readdirSync("./commands/");
    } catch (error) {
        throw new Error("Module Load Error");
    }
    main.verbose(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
        const props = require(`./commands/${f}`);
        main.verbose(`Loading Command: ${props.help.name}. 👌`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
    main.verbose("------------------------------------------------");
}

function ele() {
    client.elevation = (message, lvl) => {
        try {
            const admin = message.guild.roles.find(role => role.name === config.Bot.adminRole);
            let permlvl = 1;
            if (message.author.id === config.Bot.ownerid) return 3;
            if (lvl > 1 && permlvl === 1) {
                if (admin == undefined) {
                    message.reply("Could not find admin role");
                    return "fail";
                }
                if (message.member.roles.has(admin.id)) permlvl = 2;
            }
            return permlvl;
        } catch (err) {
            message.reply("Sorry an error has occurred please DM <@251055152667164676> with the error message below\n```Elevation System: " + err + "```");
            return "fail";
        }
    };
}

main.debug("No test, starting TLoL Bot");
init();
main.verbose("------------------------------------------------");
//Load in alphabetical order (cause OCD and neatness)
loadCommands();
ele();

if (!fs.existsSync("./test.txt")) {
    if (config.Bot.token != "YOUR-BOT-TOKEN-HERE") {
        client.login(config.Bot.token).catch(error => { main.error(`Error During Login. ${error}`); process.exit(1); });
    } else {
        main.error("No token in config.toml. Aborting...");
    }
}