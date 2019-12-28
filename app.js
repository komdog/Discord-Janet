//Get Discord
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

//Get Data Files
const login = require('./auth/token.json')
const config = require('./config/bot.json')

//Get Commands
const Autorun = require('./modules/autorun')
const Debug = require('./modules/debug')
const Fun = require('./modules/fun')
const Lewd = require('./modules/lewd')
const Moderation = require('./modules/moderation')
const Social = require('./modules/social')
const Util = require('./modules/util')

//Packages
const moment = require('moment')

bot.on('ready', ()=>{

    //Log Init
    console.log(`${bot.user.username} in Online`)
    console.log(`Serving ${bot.users.size} users`);
    console.log(`Running on ${bot.guilds.size} servers`);

    // Activity Options
    let options = {
         type: 'PLAYING',
         url: null
    }

    // Set Game / Activity
    bot.user.setActivity('!help', options)
})

bot.on(`message`, async message =>{

    //Message Inits
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //Get Lowercase Message
    let cmdArray = message.content.toLowerCase().split(" ")

    //Config
    let prefix = config.prefix
    let args = cmdArray.slice(1);
    let cmd = cmdArray[0].toLowerCase().slice(prefix.length);

    //Command Detection
    let getChar = cmdArray[0].charAt(0)

    // Check for Prefix Match
    if(getChar != prefix) return;
    
    //Load Autorun
    //if(cmd == 'init') return Autorun.init(bot,message);

    //Load Debug
    if(cmd == 'broadcast') return Debug.broadcast(bot,message,args);
    
    // Load Social Commands
    if(cmd == 'social') return Social.social(bot,message,args);

    // Load Utility Commands
    if(cmd == 'ping') return Util.ping(bot,message,args);
    if(cmd == 'info') return Util.info(bot,message,args);
    if(cmd == 'avatar') return Util.avatar(bot,message,args);
    if(cmd == 'emotes') return Util.emotes(bot,message,args);
    if(cmd == 'share') return Util.share(bot,message,args);
    if(cmd == 'profile') return Util.profile(bot,message,args);
    if(cmd == 'server') return Util.server(bot,message,args);
    if(cmd == 'user') return Util.user(bot,message,args);
    if(cmd == 'help') return Util.help(bot,message,args);

    // Load Fun Commands
    if(cmd == '8ball') return Fun.ball(bot,message,args)
    if(cmd == 'dice') return Fun.dice(bot,message,args)
    if(cmd == 'shoot') return Fun.shoot(bot,message,args)
    if(cmd == 'dog') return Fun.dog(bot,message,args)
    if(cmd == 'shibe') return Fun.shibe(bot,message,args)
    if(cmd == 'cat') return Fun.cat(bot,message,args)
    if(cmd == 'duck') return Fun.duck(bot,message,args)

    // Load Lewd Commands
    if(cmd == 'e621') return Lewd.e621(bot,message,args)
    if(cmd == 'topyiff') return Lewd.topyiff(bot,message,args)

    // Load Moderation Commands
    if(cmd == 'clear') return Moderation.clear(bot,message,args);
    if(cmd == 'gag') return Moderation.gag(bot,message,args);
    if(cmd == 'ungag') return Moderation.ungag(bot,message,args);
    if(cmd == 'kick') return Moderation.kick(bot,message,args);
    if(cmd == 'ban') return Moderation.ban(bot,message,args);
    if(cmd == 'pban') return Moderation.fban(bot,message,args);
    
    

});

bot.login(login.token)