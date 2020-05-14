const winston = require("winston");
const main = winston.loggers.get("main");
module.exports = () => {
    main.warn("Bot has been disconnected at " + new Date());
};