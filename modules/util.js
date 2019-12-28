const Discord = require('discord.js')
const moment = require('moment')
const request = require('request')

const config = require('../config/bot.json')
const helpJSON = require('../config/help.json')

// Returns Pong
exports.ping = (bot, message, args)=>{
    message.channel.send(`Pong! (${bot.ping} ms)`)
    return;
}

// Bot Info
exports.info = async (bot, message, args) =>{

    // Fetch Creator Info
    bot.fetchUser(`125687298485518336`)
    .then(user =>{

    // Get Creator Data
    let creatorProfilePicture = user.avatarURL
    
    // Post Embed
    let embed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Version ${config.version}`)
    .setThumbnail(bot.user.avatarURL)
    .setDescription(`${config.description}`)
    .addField(`Serving`, `${bot.users.size} users`)
    .addField(`Running on`, `${bot.guilds.size} servers`)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setFooter(`Created by ${config.author}`, creatorProfilePicture);
    return message.channel.send(embed);

    });


}

//Show Avatar
module.exports.avatar = async (bot, message, args) =>{
    
    let embed = new Discord.RichEmbed()
    .setImage(message.author.avatarURL)
    .setFooter(`${message.author.username}'s Avatar`, message.author.avatarURL)
    message.channel.send(embed); 

}

// Displays Emotes
module.exports.emotes = async (bot, message, args) =>{


    try{

        let list = message.guild.emojis.map(emote => emote)

        let embed = new Discord.RichEmbed()
        .addField(`Emojis on ${message.guild.name}`, `${list.join("")}`)
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
        message.channel.send(embed)

    }catch(err){
        
        let embed = new Discord.RichEmbed()
        .setDescription(`No Emotes Found`)
        message.channel.send(embed)
        console.log(`${message.guild.name}: No Emotes Found`)

    }; 

}


//Screen Share
module.exports.share = async (bot, message, args) =>{
    
    if(!message.member.voiceChannel) return message.channel.send('You need to join a voice channel first!').then(msg =>{msg.delete(5000)});

    url = `https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannel.id}`

    message.channel.send(`ScreenShare for ${message.member.voiceChannel.name}: ${url}`)

}

//Profile
module.exports.profile = async (bot, message, args) =>{

    //Get Color
    switch(message.member.presence.status){
        case 'online':
        var statusColor = '#48cc3f';
        break
        case 'idle':
        var statusColor = '#e5c227';
        break
        case 'offline':
        var statusColor = '#565656';
        break
        case 'dnd':
        var statusColor = '#ff1c1c';
    }


    //Post Profile
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}'s Profile`, message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setColor(statusColor)
    .addField(`Status`, `\`${message.member.presence.status}\``)
    .addField(`Name`, message.member)
    .addField(`Join Date`, `\`${moment(message.member.joinedAt).fromNow()} (${moment(message.member.joinedAt).format('MMMM Do YYYY')})\``)
    .addField(`Creation Date`, `\`${moment(message.author.createdAt).fromNow()} (${moment(message.author.createdAt).format('MMMM Do YYYY')})\``)
    .setTimestamp()

    message.channel.send(embed)

}


//Server Info
module.exports.server = async (bot, message, args) =>{

    let embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setTitle(message.guild.name)
    .setDescription(`
            📛 Name: \*\*${message.guild.name}\*\*
            *️⃣ ID: \*\*${message.guild.id}\*\*
            🗓️ Date Created : \*\*${moment(message.guild.createdAt).fromNow()} (${moment(message.guild.createdAt).format('MMMM Do YYYY')})\*\*
            👑 Owner : \*\*${message.guild.owner}\*\*
            🧑‍🤝‍🧑 Members : \*\*${message.guild.memberCount}\*\*
            🌎 Region : \*\*${message.guild.region.toUpperCase()}\*\*
            `)
    .setImage(message.guild.iconURL)
    return message.channel.send(embed);

}

//Server Info
module.exports.user = async (bot, message, args) =>{

    if(args[0]){

        bot.fetchUser(args[0])
        .then(search =>{
            
            let embed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setTitle(search.username)
            .setDescription(`
                    📛 Name: \*\*${search}\*\*
                    #️⃣ Tag: \*\*${search.discriminator}\*\*
                    🤖 Bot: \*\*${search.bot}\*\*
                    *️⃣ ID: \*\*${search.id}\*\*
                    🗓️ Created: \*\*${moment(search.createdAt).fromNow()} (${moment(search.createdAt).format('MMMM Do YYYY')})\*\*
                    `)
            .setImage(search.avatarURL)
            .setColor(statusColor)
            return message.channel.send(embed);
    

        })
        .catch(e =>{
            message.channel.send(`Search Error`)
        })

    }else{

        //Get Color
        switch(message.member.presence.status){
            case 'online':
            var statusColor = '#48cc3f';
            break
            case 'idle':
            var statusColor = '#e5c227';
            break
            case 'offline':
            var statusColor = '#565656';
            break
            case 'dnd':
            var statusColor = '#ff1c1c';
        }

        let embed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTitle(message.author.username)
        .setDescription(`
                📛 Name: \*\*${message.author}\*\*
                #️⃣ Tag: \*\*${message.author.discriminator}\*\*
                🤖 Bot: \*\*${message.author.bot}\*\*
                🖥️ Status: \*\*${message.member.presence.status}\*\*
                *️⃣ ID: \*\*${message.author.id}\*\*
                🗓️ Created: \*\*${moment(message.author.createdAt).fromNow()} (${moment(message.author.createdAt).format('MMMM Do YYYY')})\*\*
                `)
        .setImage(message.author.avatarURL)
        .setColor(statusColor)
        return message.channel.send(embed);

    }

}

//Display Help
module.exports.help = async (bot, message, args) =>{

    let embed = new Discord.RichEmbed()
    .setTitle("Server Commands")
    .setDescription(`A helpful List of Commands`)
    .addField("General Commands", `${helpJSON.util.map(c => `\`${config.prefix}${c.name}\` : **${c.help}**`).join("\n")}`)
    .addField("Fun Commands", `${helpJSON.fun.map(c => `\`${config.prefix}${c.name}\` : **${c.help}**`).join("\n")}`)
    .addField("Lewd Commands", `${helpJSON.lewd.map(c => `\`${config.prefix}${c.name}\` : **${c.help}**`).join("\n")}`)
    .addField("Mod Commands", `${helpJSON.moderation.map(c => `\`${config.prefix}${c.name}\` : **${c.help}**`).join("\n")}`)
    .addField("Owner Commands", `${helpJSON.owner.map(c => `\`${config.prefix}${c.name}\` : **${c.help}**`).join("\n")}`)
    return message.channel.send(embed);

}



