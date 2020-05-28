var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var GphApiClient = require('giphy-js-sdk-core')
client = GphApiClient("vi0QjN2ykpc6HspbRCD45TsDDhk292Kn")

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		
		switch(cmd) {
			case 'giphy':
			
			if (args.length < 2) {
				bot.sendMessage({
					to: channelID,
					message: "Add a word after !giphy to search for gifs related to it!"
				})
			} else {
			
				var searchTerm = args[1].replace(/'/g, '"');
				client.search('gifs', {"q": searchTerm})
				  .then((response) => {
					var totalResponses = response.data.length;
					var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
					var responseFinal = response.data[responseIndex]

					bot.sendMessage({
						to: channelID,
						message: responseFinal.images.fixed_height.url
					})
				  })
				  .catch((err) => {
					console.log(err)
				  })
				}
			break;
			// Just add any case commands if you want to..
		}
     }
});