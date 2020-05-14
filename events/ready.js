const chalk = require("chalk");
const winston = require("winston");
const main = winston.loggers.get("main");
module.exports = client => {
    main.info(chalk.green("Connected!"));
    client.user.setActivity("over cool servers", { type: "WATCHING" });
    const channel = client.channels.get("702838776581324866");
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
    }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
    });
};
