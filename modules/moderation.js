const Discord = require('discord.js')


//Clear Messages
exports.clear = async (bot, message, args) =>{

    //Check For Permission
    let permissions = message.member.permissions;
    let canDo = permissions.has("MANAGE_MESSAGES")
    if(!canDo) return message.reply("You do not have permission to do this")
    
    //Get Number
    let count = parseInt(args[0])

    //Error Handling
    if(!args[0]) return message.channel.send("Enter a number of messages to delete")
    if(isNaN(count)) return message.channel.send("This is not a number")
    if(count > 100 || args[0] < 1) return message.channel.send("You can only delete 1-100 messages at a time")

    //Delete Message
    await message.delete()
    await message.channel.bulkDelete(count)
    .then(()=>{
        let cleared = new Discord.RichEmbed()
        .setDescription(`Cleared ${count} message(s)`)
        .setColor("#33bbcc")
        message.channel.send(cleared);
    })
    .catch(error => message.channel.send(`${error}`));

}

//Gag Messages
exports.gag = async (bot, message, args) =>{

    //Check For Permission
    let permissions = message.member.permissions;
    let canDo = permissions.has("MANAGE_MESSAGES")
    if(!canDo) return message.reply("You do not have permission to do this")

    let toGag = message.mentions.members.first()


    message.channel.overwritePermissions(toGag, {
        SEND_MESSAGES: false
    })
    .then(() => {
        let gagged = new Discord.RichEmbed()
        .setDescription(`Gagged ${toGag}`)
        .setColor("#33bbcc")
        message.channel.send(gagged);

    })
    .catch(console.error);

}

//unGag Messages
exports.ungag = async (bot, message, args) =>{

    //Check For Permission
    let permissions = message.member.permissions;
    let canDo = permissions.has("MANAGE_MESSAGES")
    if(!canDo) return message.reply("You do not have permission to do this")

    let toUnGag = message.mentions.members.first()


    message.channel.overwritePermissions(toUnGag, {
        SEND_MESSAGES: true
    })
    .then(() => {
        let ungagged = new Discord.RichEmbed()
        .setDescription(`Un-Gagged ${toUnGag}`)
        .setColor("#33bbcc")
        message.channel.send(ungagged);

    
    })
    .catch(console.error);

}

//Kick Member
exports.kick = async (bot, message, args) =>{

    //Check For Permission
    let permissions = message.member.permissions;
    let canDo = permissions.has("KICK_MEMBERS")
    if(!canDo) return message.channel.send("You do not have permission to do this")
    
    //Get Mention
    let user = message.mentions.users.first();
    if (!user) return message.channel.send('You didn\'t mention the user to kick!');

    //Get member
    let member = message.guild.member(user);
    if (!member) return message.channel.send('That user isn\'t in this server!');
    member.send(`You have been kicked by ${message.author}`)
    .then(async ()=>{

        //Run Kick
        await member.kick('Kicked by Moderator')
        .then(() => {
            message.channel.send(`Successfully kicked ${user.tag}`);

        }).catch(err => {

            message.reply('I was unable to kick the member');
            console.error(err);
            
        });

    });
    

}

//Ban Member
exports.ban = async (bot, message, args) =>{

    let banTime = 1

    //Check For Permission
    let permissions = message.member.permissions;
    let canDo = permissions.has("BAN_MEMBERS")
    if(!canDo) return message.channel.send("You do not have permission to do this")
    
    //Get Mention
    let user = message.mentions.users.first();
    if (!user) return message.channel.send('You didn\'t mention the user to ban!');

    //Get member
    let member = message.guild.member(user);
    if (!member) return message.channel.send('That user isn\'t in this server!');
    member.send(`You have been ban by ${message.author.tag} for ${banTime} day(s)`)
    .then(async ()=>{

        //Run Ban
        await member.ban({
            days: banTime,
            reason: `Banned by ${message.author.tag}`,
        })
        .then(() => {
            message.channel.send(`Successfully banned ${user.tag}`);



        }).catch(err => {

            message.reply('I was unable to ban the member');
            console.error(err);
            
        }); 

    })

}

//Ban Member
exports.fban = async (bot, message, args) =>{

    let banTime = 1

    //Check For Permission
    let permissions = message.member.permissions;
    let canDo = permissions.has("BAN_MEMBERS")
    if(!canDo) return message.channel.send("You do not have permission to do this")
    
    //Get Mention
    let user = message.mentions.users.first();
    if (!user) return message.channel.send('You didn\'t mention the user to ban!');

    //Get member
    let member = message.guild.member(user);
    if (!member) return message.channel.send('That user isn\'t in this server!');
    message.channel.send(`${user} has been ban by ${message.author} permanently`)


}

