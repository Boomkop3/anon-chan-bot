const Discord = require('discord.io');
const https = require('https');
const auth = require('./auth.json');

// Initialize Discord Bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

console.log('starting bot...');

let spam = []; 
let logChannel = "";

setInterval(()=>{
	if (spam.length > 0){
		bot.sendMessage({
			to: logChannel,
			message: spam.shift()
		});
		console.log('flusing log...');
	}
}, 1500);

bot.on('disconnect', (error, code)=>{
	bot.connect();
});

bot.on('message', function (user, userID, channelID, message, evt) {
    try {
		let sourceChannel = "" + channelID;
		if (logChannel == sourceChannel){
			return;
		}
		console.log(auth.id + ": input from: " + user);
        const data = JSON.stringify({
            user: user,
            userID: userID,
            channelID: channelID,
            message: message,
            evt: evt
        });
		let logMessage = "user: " + user + "\r\n" + "in channel: " + channelID + "\r\nmessage: \r\n" + message;
		spam.push(logMessage);
    } catch (error) {
        console.log(error);
    }
});

console.log('bot started');