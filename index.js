const Discord = require('discord.io');
const https = require('https');
const auth = require('./auth.json');

// Initialize Discord Bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

console.log('starting bot...');

let anons = [];
let spam = [];
let unspam = [];
let channel = '';
let selfid = '';
let clientid = '';
let selfref = '<@!' + clientid + '>';

bot.on('ready', function () {
	setInterval(()=>{
		if (unspam.length > 0){
			bot.deleteMessage({
				"channelID": channel, 
				"messageID": unspam.shift()
			}, 
			function (error) {
				console.log(error);
			});
			console.log('flushing unspam...');
		}
		if (spam.length > 0){
			bot.sendMessage({
				to: channel,
				message: spam.shift()
			});
			console.log('flushing spam...');
		}
	}, 3000);
});

bot.on('disconnect', (error, code)=>{
	bot.connect();
});

bot.on('message', function (user, userID, channelID, message, evt) {
    try {
		if (channelID != channel) { return; }; // Lock to my channel
		if (userID == selfid) { return; } // Don't respond to self
		if (message == '!anon help' || message.startsWith(selfref)){
			spam.push("Just say '!anon' to summon my devine powers");
		}
		if (anons.includes(userID)){
			if (message == '!anon'){
				anons = anons.filter(anon => anon != userID);
				spam.push('Bye anon');
			} else {
				var messageid = evt.d.id;
				unspam.push(messageid);
				spam.push(message);		
			}
		} else {
			if (message == '!anon'){
				anons.push(userID);
				spam.push('Hi anon');
			}
		}
    } catch (error) {
        console.log(error);
    }
});

console.log('bot started');
