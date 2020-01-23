const chalk = require('chalk');
const winston = require('winston');
const main = winston.loggers.get('main');
module.exports = client => {
    main.info(chalk.green('Connected!'));
    client.user.setActivity('over difficultJet and it\'s Discord', { type: 'WATCHING' });
};
