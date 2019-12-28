const Discord = require('discord.js')
const auth = require(`../auth/e621_hash.json`)
const blacklist = require(`../config/blacklist.json`)
let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');
let wrapper = new e621('Janet Bot / by Komdog on e621', auth.username, auth.hash, 3);

//e621 Grabber
exports.e621 = async (bot, message, args)=>{


    if(!args[0]) return message.channel.send(`\`Please enter tags\``);
    var tags = args.join("+")
        
    wrapper.requestservices.get(`https://e621.net/post/index.json?limit=1&tags=order:random+score:>10+${tags}`)
    .then((results) => {

        // Check if Empty
        if(results.length < 1) return message.channel.send(`Request Error`);

        // Get Tags to Array
        let tags = results.map(r => r.tags.split(" "));

        // Check Blacklist
        let check = tags[0].some(r=> blacklist.tags.indexOf(r) >= 0);
        if(check) return message.channel.send(`This post is blacklisted`)

        // Compatibility
        switch(`${results.map(r => r.file_ext)}`){
            case 'webm':
                var thumb = results.map(r => r.preview_url)
                message.channel.send(`${results.map(r => r.file_url)}`)
                break
            case 'swf':
                var thumb = results.map(r => r.preview_url)
                message.channel.send(`https://e621.net/post/show/${results.map(r => r.id)}`)
                return;
            case 'gif':
                var thumb = results.map(r => r.file_url)
                break
            case 'png':
                var thumb = results.map(r => r.file_url)
                break
            case 'jpg':
                var thumb = results.map(r => r.file_url)
                break
        }

        // Send Embed
        let embed = new Discord.RichEmbed()
        .setTitle(`Post ${results.map(r => r.id)}`)
        .setDescription(`Art by ${results.map(r => r.artist.join(" // "))}`)
        .setURL(`https://e621.net/post/show/${results.map(r => r.id)}`)
        .addField(`Score`, `${results.map(r => r.score)}`)
        .setThumbnail(`${thumb}`)
        .setFooter(`Requested by ${message.author.username}`,message.author.avatarURL)
        .setTimestamp()
        message.channel.send(embed)

        

    })

}

exports.topyiff = async (bot, message) => {
    
    wrapper.posts.getPopularPosts(enums.e621PopularityStrings.daily)
        .then(async (data) => {
            
            let image = data[0];
            
            let embed = new Discord.RichEmbed()
            .setTitle(`Loading...`)
            message.channel.send(embed).then( async (msg) =>{
  
                // Define New Message
                let embed2 = new Discord.RichEmbed()
                .setAuthor(`Author: ${image.author}`)
                .setDescription(`Score: ${image.score}`)
                .addField(`\`Source\``, `https://e621.net/post/show/${image.id}`)
            
                // Compatibility
                switch(image.file_ext){
                    case 'webm':
                        await message.channel.send('',{file: `${image.file_url}`});
                        msg.delete()
                        message.channel.send(embed2)
                        break
                    case 'swf':
                        await message.channel.send('',{file: `${image.preview_url}`});
                        msg.delete()
                        message.channel.send(embed2)
                        return;
                    case 'gif':
                        await message.channel.send('',{file: `${image.file_url}`});
                        msg.delete()
                        message.channel.send(embed2)
                        break
                    case 'png':
                        await message.channel.send('',{file: `${image.file_url}`});
                        msg.delete()
                        message.channel.send(embed2)
                        break
                    case 'jpg':
                        await message.channel.send('',{file: `${image.file_url}`});
                        msg.delete()
                        message.channel.send(embed2)
                        break
                };
                
            })
            
        });
        
}
