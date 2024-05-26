const Discord = require("discord.js")

const client = new Discord.Client()

const db = require("quick.db")

let config = require("./config.js");
let Config = require("./config.js");

let prefix = config.setting.Prefix

client.on("ready", () => {
  console.log("IM READY ...... " + client.user.tag)
});

client.on("message", message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase()
  if (command === 'help') {
    let help = new Discord.MessageEmbed()
      .setAuthor('LayerProtection', `https://cdn.discordapp.com/icons/736264818318639195/a_03b9eab9ad0164d958842bee2370cfa1.gif?size=1024`)
      .setTitle("Help Menu")
      .addField("General", `\`${prefix}about\``)
      .addField("Security", `\`${prefix}anti\`, \`${prefix}trust\`, \`${prefix}trustlist\`, \`${prefix}settings\` ,\`${prefix}threatchannel\``)

    message.channel.send(help)
  }
})

client.on("message", message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase()
  if (command === "about") {
    let embed = new Discord.MessageEmbed()
      .setAuthor("LayerProtection", `https://cdn.discordapp.com/icons/736264818318639195/a_03b9eab9ad0164d958842bee2370cfa1.gif?size=1024`)
      .setTitle("PROTECTION SYSTEM 1.1.0")
      .addField("Creators", ` <@478669437432496148> , <@727490074127892823>`)
      .addField("CopyRights", `\`LAYERCODING : DISCORD.GG/LAYER\``)
      .addField("Commands", `\`1 General Commands , 5 Security Commands , 10 Protection Commands\``)
      .addField("Version", `\`Protection-System 1.1.0\``)
    message.channel.send(embed)
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.channel.guild) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase()
  const Layerjoin = message.content.split(' ').slice(1).join(' ');
  let data = db.get(`AntiBots_${message.guild.id}`)
  if (command === "antibots") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    if (data) {
      db.delete(`AntiBots_${message.guild.id}`)
      message.channel.send("- **Anti Bots disabled now .**")
    }
    else {
      db.set(`AntiBots_${message.guild.id}`, true)
      message.channel.send("- **Anti Bots enabled now .**")
    }
  }
  if (command === "trust") {
    if (message.author.id !== message.guild.ownerID) return message.channel.send("- **This command is only for GuildOwner .**");
    let user = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(" ")[1])
    if (!args[0]) return message.channel.send("- **Didn't type [MemberID | Mention] .**")
    if (!user) return message.channel.send("- **I cant find this member .**")
    let data = db.get(`${user.id}_Whitelisted`)
    if (data) {
      db.delete(`${user.id}_Whitelisted`)
      message.channel.send(`- **${user.user.tag}** was removed from users trustlist .`)
    }
    else {
      db.set(`${user.id}_Whitelisted`, true)
      message.channel.send(`- **${user.user.tag}** was added to users trustlist .`)
    }
  }
  if (command == "antichannels") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    if (!args[0]) return message.channel.send("- **Didn't type [Create | Delete] .**")
    if (!(args[0] == "create" || args[0] == "delete")) return message.channel.send("- **Used wrong args .**")
    if (args[0].toLowerCase() == "delete") {
      if (db.get(`AntiDeleteChannels_${message.guild.id}`) !== true) {
        db.set(`AntiDeleteChannels_${message.guild.id}`, true);
        message.channel.send("- **Anti channels delete enabled now .**");
      } else {
        db.set(`AntiDeleteChannels_${message.guild.id}`, false);
        message.channel.send("- **Anti channels delete disabled now .**");
      }
    }
    if (args[0].toLowerCase() === "create") {
      if (db.get(`AntiCreateChannels_${message.guild.id}`) !== true) {
        db.set(`AntiCreateChannels_${message.guild.id}`, true);
        message.channel.send("- **Anti channels create enabled now .**");
      } else {
        db.set(`AntiCreateChannels_${message.guild.id}`, false);
        message.channel.send("- **Anti channels create disabled now .**");
      }
    }
  }
  if (command == "antiroles") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    if (!args[0]) return message.channel.send("- **Didn't type [Create | Delete] .**")
    if (!(args[0] == "create" || args[0] == "delete")) return message.channel.send("- **Used wrong args .**")
    if (args[0].toLowerCase() == "delete") {
      if (db.get(`AntiDeleteRoles_${message.guild.id}`) !== true) {
        db.set(`AntiDeleteRoles_${message.guild.id}`, true);
        message.channel.send("- **Anti roles delete enabled now .**");
      } else {
        db.set(`AntiDeleteRoles_${message.guild.id}`, false);
        message.channel.send("- **Anti roles delete disabled now .**");
      }
    }
    if (args[0].toLowerCase() === "create") {
      if (db.get(`AntiCreateRoles_${message.guild.id}`) !== true) {
        db.set(`AntiCreateRoles_${message.guild.id}`, true);
        message.channel.send("- **Anti roles create enabled now .**");
      } else {
        db.set(`AntiCreateRoles_${message.guild.id}`, false);
        message.channel.send("- **Anti roles create disabled now .**");
      }
    }
  }
  if (command == "antilinks") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    let data = db.get(`antilinks_${message.guild.id}`)

    if (data) {
      db.delete(`antilinks_${message.guild.id}`)
      message.channel.send("- **Anti links disabled now .**");
    } else {
      db.set(`antilinks_${message.guild.id}`, true)
      message.channel.send("- **Anti links enabled now .**");
    }
  }
  if (command == "trustlist") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    let count = 1;
    const msg = message.guild.members.cache.filter(member => db.get(`${member.id}_Whitelisted`) == true).map(member => `**${count++}** \`${member.user.tag}\` .`).join("\n");
    const size = message.guild.members.cache.filter(member => db.get(`${member.id}_Whitelisted`) == true).size;
    if (size > 0) {
      message.channel.send({ embed: { description: `List of trust users \n${msg} \nTrusted Users Size **${size}**` } });
    } else {
      message.channel.send("- **There is no one trusted .**");
    }
  }
  if (command === "antikicks") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    let data = db.get(`Limitkicks_${message.guild.id}`)

    if (data) {
      db.delete(`Limitkicks_${message.guild.id}`)
      message.channel.send("- **Anti Kicks disabled now .**");
    } else {
      db.set(`Limitkicks_${message.guild.id}`, true)
      message.channel.send("- **Anti Kicks enabled now .**");
    }
  }
  if (command === "antibans") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    let data = db.get(`Limitbans_${message.guild.id}`)

    if (data) {
      db.delete(`Limitbans_${message.guild.id}`)
      message.channel.send("- **Anti Bans disabled now .**");
    } else {
      db.set(`Limitbans_${message.guild.id}`, true)
      message.channel.send("- **Anti Bans enabled now .**");
    }
  }
  if (command == "anti") {
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTitle("Anti list")
      .setDescription(`\`${prefix}antiban\`,\n\`${prefix}antikick\`,\n\`${prefix}antichannels delete,create\`,\n\`${prefix}antiroles create,delete\`,\n\`${prefix}antispam\`,\n\`${prefix}antilink\`,\n\`${prefix}antibot\`.`)
      .setFooter(`Developed BY Tarik,Yousif`, `https://cdn.discordapp.com/icons/736264818318639195/a_03b9eab9ad0164d958842bee2370cfa1.gif?size=1024`)
    message.channel.send(embed)
  }
  if ((command == "settings") || (command === "setting")) {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    let on = config.react.ON;
    let off = config.react.OFF;
    let hammer = config.react.HAMMER;
    let SpamSystem = db.get(`${message.guild.id}_SpamMODE`);
    let AntiLinksSystem = db.get(`antilinks_${message.guild.id}`)
    let AntiBotsSystem = db.get(`AntiBots_${message.guild.id}`)
    let AntiKicksSystem = db.get(`Limitkicks_${message.guild.id}`)
    let AntiBansSystem = db.get(`Limitbans_${message.guild.id}`)
    let AntiChannelCreate = db.get(`AntiCreateChannels_${message.guild.id}`)
    let AntiChannelDelete = db.get(`AntiDeleteChannels_${message.guild.id}`)
    let AntiRolesCreate = db.get(`AntiCreateRoles_${message.guild.id}`)
    let AntiRolesDelete = db.get(`AntiDeleteRoles_${message.guild.id}`)
    if (SpamSystem) { SpamSystem = on } else { SpamSystem = off }
    if (AntiBotsSystem) { AntiBotsSystem = on } else { AntiBotsSystem = off }
    if (AntiLinksSystem) { AntiLinksSystem = on } else { AntiLinksSystem = off }
    if (AntiKicksSystem) { AntiKicksSystem = on } else { AntiKicksSystem = off }
    if (AntiBansSystem) { AntiBansSystem = on } else { AntiBansSystem = off }
    if (AntiChannelCreate) { AntiChannelCreate = on } else { AntiChannelCreate = off }
    if (AntiChannelDelete) { AntiChannelDelete = on } else { AntiChannelDelete = off }
    if (AntiRolesCreate) { AntiRolesCreate = on } else { AntiRolesCreate = off }
    if (AntiRolesDelete) { AntiRolesDelete = on } else { AntiRolesDelete = off }
    let embed = new Discord.MessageEmbed()
      .setAuthor("LayerProtection", `https://cdn.discordapp.com/icons/736264818318639195/a_03b9eab9ad0164d958842bee2370cfa1.gif?size=1024`)
      .setTitle("Security Settings")
      .addField(`Anti Ban`, `Enabled : ${AntiBansSystem}\nWarn at: ${Math.floor(config.protection.AntiBans / 2)} :warning:\nPunish at: ${config.protection.AntiBans  + 1} ${hammer}`, true)
      .addField(`Anti Kick`, `Enabled :  ${AntiKicksSystem}\nWarn at: ${Math.floor(config.protection.AntiKicks / 2)} :warning:\nPunish at: ${config.protection.AntiKicks  + 1} ${hammer}`, true)
      .addField(`Anti Spam`, `Enabled : ${SpamSystem}\nWarn at: ${Math.floor(config.protection.AntiSpam / 2)} :warning:\nPunish at: ${config.protection.AntiSpam  + 1} ${hammer}`, true)
      .addField(`Anti Links`, `Enabled :  ${AntiLinksSystem}\nWarn at:  ${Math.floor(config.protection.AntiLinks / 2)}  :warning:\nPunish at: ${config.protection.AntiLinks + 1} ${hammer}`, true)
      .addField(`Anti Channel-Create`, `Enabled :  ${AntiChannelCreate}\nWarn at: ${Math.floor(config.protection.AntiChannelsCreate / 2)} :warning:\nPunish at: ${config.protection.AntiChannelsCreate + 1} ${hammer}`, true)
      .addField(`Anti Channel-Delete`, `Enabled :  ${AntiChannelDelete}\nWarn at: ${Math.floor(config.protection.AntiChannelsDelete / 2)} :warning:\nPunish at: ${config.protection.AntiChannelsDelete + 1} ${hammer}`, true)
      .addField(`Anti Role-Create`, `Enabled :  ${AntiRolesCreate}\nWarn at: ${Math.floor(config.protection.AntiRolesCreate / 2)} :warning:\nPunish at: ${config.protection.AntiRolesCreate + 1} ${hammer}`, true)
      .addField(`Anti Role-Delete`, `Enabled :  ${AntiRolesDelete}\nWarn at: ${Math.floor(config.protection.AntiRolesDelete / 2)} :warning:\nPunish at: ${config.protection.AntiRolesDelete + 1} ${hammer}`, true)
      .addField(`Anti Bots`, `Enabled :  ${AntiBotsSystem}`, true)
    message.channel.send(embed);
  }
  if (command == "threatchannel") {
    if (message.author.id !== message.guild.ownerID) return message.channel.send("- **This command is only for GuildOwner .**")
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content.split(" ")[1])
    if (!args[0]) return message.channel.send("- **Didn't type [ChannelID | Mention] .**");
    if (!channel) return message.channel.send("- **I can't find this channel .**");
    db.set(`threatchannel_${message.guild.id}`, channel.id);
    message.channel.send(`- ${channel} has been set as **Threats Channel** .`);
  }
  if (command === "antispam") {
    if (message.member.id !== message.guild.ownerID && db.get(`${message.member.id}_Whitelisted`) !== true) return message.channel.send("- **You don't have permissions .**");
    if (db.get(`${message.guild.id}_SpamMODE`) == true) {
      db.set(`${message.guild.id}_SpamMODE`, false);
      message.channel.send("- **Anti spam disabled now .**");
    } else {
      db.set(`${message.guild.id}_SpamMODE`, true);
      message.channel.send("- **Anti spam enabled now .**");
    }
  }
});

const _0x128f=['_Spam','hasPermission','**\x20(ID\x20','1597183wgirmD','guildBanAdd','has','AntiKicks','ROLE_CREATE','547895cbysAE','CHANNEL_CREATE','bot','1388841nXtHSx','setFooter','channelCreate','add','floor','Channels\x20Count','**\x20Roles','setAuthor','catch','User','_CreatedChannels','_AntiLinks','-\x20<@!','kick','send','AntiSpam','Limitkicks_','createdAt','then','Links','roles','AntiBan\x20Warning\x20⚠️','setTimestamp','AntiRolesCreate','roleDelete','log','-\x20**:warning:\x20Please\x20don\x27t\x20spamming\x20or\x20you\x20will\x20get\x20muted\x20role\x20.**','Protection\x20System','guild','ROLE_DELETE','addField','user','muted','\x20Links**','AntiChannelCreate\x20Warning\x20⚠️','executor','**\x20Channels','BOT_ADD','channelDelete','AntiKick\x20Warning\x20⚠️','set','\x20Kicks**','channels','CHANNEL_DELETE','AntiBots_','endsWith','entries','find','filter','Limitbans_','Kicks\x20Count','AntiLinks','MEMBER_BAN_ADD','threatchannel_','tag','Server','author','AntiDeleteChannels_','remove','-\x20**Links\x20are\x20now\x20allowed\x20in\x20this\x20server.\x20:x:\x20**','AntiDeleteRoles_','setColor','\x20Bans**','content','members','_Bans','_CreatedRoles','AntiRolesDelete','warnColor','ready','_Kicks','owner','_DeletedRoles','delete','AntiRoleDelete\x20Warning\x20⚠️','MessageEmbed','ADMINISTRATOR','setTitle','ownerID','3IVggKi','joinedAt','_SpamMODE','guilds','305721TWWHYB','startsWith','member','\x20left\x20the\x20guild,\x20most\x20likely\x20of\x20their\x20own\x20will.','AntiChannelsCreate','AntiRoleCreate\x20Warning\x20⚠️','embed','guildMemberAdd','@everyone','_DeletedChannels','812183dBzTkT','antilinks_','cache','get','1716280jwbLiG','>\x20`has\x20muted\x20for\x20spamming`\x20.','first','Roles\x20Count','AntiBans','message','name','iconURL','roleCreate','fetchAuditLogs','1644223oYUxJI','toLowerCase','MEMBER_KICK','protection','Bans\x20Count','_Whitelisted','channel','_AntiSpam','forEach'];const _0x3ab85b=_0x28f1;function _0x28f1(_0x40f135,_0x1f3c76){_0x40f135=_0x40f135-0x114;let _0x128f58=_0x128f[_0x40f135];return _0x128f58;}(function(_0x3833c0,_0x9839a9){const _0x1ccab4=_0x28f1;while(!![]){try{const _0x492c67=parseInt(_0x1ccab4(0x176))+parseInt(_0x1ccab4(0x15e))+parseInt(_0x1ccab4(0x18a))+-parseInt(_0x1ccab4(0x168))+-parseInt(_0x1ccab4(0x15a))*-parseInt(_0x1ccab4(0x187))+-parseInt(_0x1ccab4(0x182))+-parseInt(_0x1ccab4(0x16c));if(_0x492c67===_0x9839a9)break;else _0x3833c0['push'](_0x3833c0['shift']());}catch(_0x1cf060){_0x3833c0['push'](_0x3833c0['shift']());}}}(_0x128f,0xd12f8),client['on'](_0x3ab85b(0x150),()=>{setInterval(()=>{const _0x410761=_0x28f1;client[_0x410761(0x15d)]['cache']['forEach'](_0x48361d=>{const _0x587b22=_0x410761;_0x48361d['members'][_0x587b22(0x16a)][_0x587b22(0x17e)](_0x55b92a=>{const _0x418e70=_0x587b22;db[_0x418e70(0x184)](_0x55b92a['id']+_0x418e70(0x14c))&&db[_0x418e70(0x133)](_0x55b92a['id']+_0x418e70(0x14c),0x0),db[_0x418e70(0x184)](_0x55b92a['id']+_0x418e70(0x151))&&db[_0x418e70(0x133)](_0x55b92a['id']+_0x418e70(0x151),0x0),db[_0x418e70(0x184)](_0x55b92a['id']+_0x418e70(0x115))&&db[_0x418e70(0x184)](_0x55b92a['id']+_0x418e70(0x115),0x0),db['has'](_0x55b92a['id']+_0x418e70(0x167))&&db['set'](_0x55b92a['id']+_0x418e70(0x167),0x0),db['has'](_0x55b92a['id']+_0x418e70(0x14d))&&db[_0x418e70(0x133)](_0x55b92a['id']+'_CreatedRoles',0x0),db[_0x418e70(0x184)](_0x55b92a['id']+_0x418e70(0x153))&&db[_0x418e70(0x133)](_0x55b92a['id']+_0x418e70(0x153),0x0),db[_0x418e70(0x184)](_0x55b92a['id']+_0x418e70(0x116))&&db[_0x418e70(0x133)](_0x55b92a['id']+_0x418e70(0x116),0x0),db['has'](_0x55b92a['id']+'_AntiSpam')&&db['set'](_0x55b92a['id']+_0x418e70(0x17d),0x0);});});},0x3e8*0x3c*0x3c);}),client['on'](_0x3ab85b(0x171),async _0x39c37a=>{const _0x214bec=_0x3ab85b;try{if(_0x39c37a[_0x214bec(0x143)]['bot'])return;if(!_0x39c37a[_0x214bec(0x17c)][_0x214bec(0x127)])return;if(_0x39c37a[_0x214bec(0x160)]['hasPermission'](_0x214bec(0x157)))return;db['get'](_0x39c37a[_0x214bec(0x127)]['id']+_0x214bec(0x15c))===!![]&&(!db['has'](_0x39c37a['author']['id']+_0x214bec(0x17f))?db[_0x214bec(0x133)](_0x39c37a['author']['id']+_0x214bec(0x17f),_0x39c37a[_0x214bec(0x14a)]):_0x39c37a[_0x214bec(0x14a)]===db[_0x214bec(0x16b)](_0x39c37a[_0x214bec(0x143)]['id']+_0x214bec(0x17f))?(db[_0x214bec(0x18d)](_0x39c37a[_0x214bec(0x143)]['id']+_0x214bec(0x17d),0x1),db['get'](_0x39c37a[_0x214bec(0x143)]['id']+'_AntiSpam')==Math[_0x214bec(0x18e)](config[_0x214bec(0x179)]['AntiSpam']/0x2)&&_0x39c37a[_0x214bec(0x143)][_0x214bec(0x119)](_0x214bec(0x125)),db['get'](_0x39c37a['author']['id']+_0x214bec(0x17d))>config['protection'][_0x214bec(0x11a)]&&(_0x39c37a[_0x214bec(0x160)][_0x214bec(0x11f)][_0x214bec(0x18d)](_0x39c37a['guild'][_0x214bec(0x11f)][_0x214bec(0x16a)]['find'](_0x3b89d3=>_0x3b89d3[_0x214bec(0x172)]['toLowerCase']()==_0x214bec(0x12b))),_0x39c37a[_0x214bec(0x17c)]['send'](_0x214bec(0x117)+_0x39c37a[_0x214bec(0x143)]['id']+_0x214bec(0x16d)),db['set'](_0x39c37a[_0x214bec(0x143)]['id']+_0x214bec(0x17d),0x0)),await _0x39c37a[_0x214bec(0x154)]()):db[_0x214bec(0x154)](_0x39c37a[_0x214bec(0x143)]['id']+_0x214bec(0x17f)));}catch{};}),client['on'](_0x3ab85b(0x171),async _0x936bf6=>{const _0x5a1f17=_0x3ab85b;try{if(_0x936bf6[_0x5a1f17(0x143)][_0x5a1f17(0x189)])return;if(!_0x936bf6[_0x5a1f17(0x17c)][_0x5a1f17(0x127)])return;const _0x4c6fb8=_0x936bf6['guild'][_0x5a1f17(0x152)][_0x5a1f17(0x12a)];if(_0x936bf6[_0x5a1f17(0x160)][_0x5a1f17(0x180)](_0x5a1f17(0x157)))return;if(db[_0x5a1f17(0x16b)](_0x5a1f17(0x169)+_0x936bf6['guild']['id'])===!![]){const _0x1e3dd1=config[_0x5a1f17(0x179)][_0x5a1f17(0x11e)];_0x1e3dd1[_0x5a1f17(0x17e)](async _0x4ed2dd=>{const _0x44dc2f=_0x5a1f17;if(_0x936bf6[_0x44dc2f(0x14a)][_0x44dc2f(0x177)]()[_0x44dc2f(0x15f)](_0x4ed2dd)||_0x936bf6[_0x44dc2f(0x14a)]['toLowerCase']()[_0x44dc2f(0x138)](_0x4ed2dd)||_0x936bf6['content'][_0x44dc2f(0x177)]()['includes'](_0x4ed2dd)){db[_0x44dc2f(0x18d)](_0x936bf6['author']['id']+_0x44dc2f(0x116),0x1);if(db[_0x44dc2f(0x16b)](_0x936bf6[_0x44dc2f(0x143)]['id']+'_AntiLinks')===Math[_0x44dc2f(0x18e)](config[_0x44dc2f(0x179)][_0x44dc2f(0x13e)]/0x2)){let _0x57dbf4=_0x936bf6[_0x44dc2f(0x127)]['channels'][_0x44dc2f(0x16a)]['get'](db[_0x44dc2f(0x16b)](_0x44dc2f(0x140)+_0x936bf6[_0x44dc2f(0x127)]['id'])),_0x39cec4=new Discord[(_0x44dc2f(0x156))]()['setAuthor'](_0x936bf6[_0x44dc2f(0x127)][_0x44dc2f(0x172)],_0x936bf6['guild'][_0x44dc2f(0x173)]())[_0x44dc2f(0x158)]('AntiLinks\x20Warning\x20⚠️')[_0x44dc2f(0x129)](_0x44dc2f(0x142),'**'+_0x936bf6[_0x44dc2f(0x127)]['name']+'**')[_0x44dc2f(0x129)]('User','**'+_0x936bf6[_0x44dc2f(0x143)][_0x44dc2f(0x141)]+_0x44dc2f(0x181)+_0x936bf6['author']['id']+')')[_0x44dc2f(0x129)]('Links\x20Count','**'+db[_0x44dc2f(0x16b)](_0x936bf6[_0x44dc2f(0x143)]['id']+_0x44dc2f(0x116))+_0x44dc2f(0x12c))[_0x44dc2f(0x18b)](_0x44dc2f(0x126))[_0x44dc2f(0x148)](config[_0x44dc2f(0x164)][_0x44dc2f(0x14f)])['setTimestamp']();_0x57dbf4[_0x44dc2f(0x119)](_0x39cec4),_0x4c6fb8[_0x44dc2f(0x119)](_0x39cec4);}db[_0x44dc2f(0x16b)](_0x936bf6[_0x44dc2f(0x143)]['id']+_0x44dc2f(0x116))>config[_0x44dc2f(0x179)][_0x44dc2f(0x13e)]&&(_0x936bf6['member']['roles'][_0x44dc2f(0x18d)](_0x936bf6[_0x44dc2f(0x127)]['roles'][_0x44dc2f(0x16a)][_0x44dc2f(0x13a)](_0x228355=>_0x228355[_0x44dc2f(0x172)][_0x44dc2f(0x177)]()==_0x44dc2f(0x12b))),_0x936bf6[_0x44dc2f(0x17c)]['send']('-\x20'+_0x936bf6['author']+'\x20`has\x20muted\x20for\x20share\x20links`\x20.'),db[_0x44dc2f(0x133)](_0x936bf6['author']['id']+_0x44dc2f(0x116),0x0)),await _0x936bf6[_0x44dc2f(0x154)]()[_0x44dc2f(0x11d)](async()=>{const _0x3ff863=_0x44dc2f;await _0x936bf6[_0x3ff863(0x143)][_0x3ff863(0x119)]('-\x20**Links\x20are\x20now\x20allowed\x20in\x20this\x20server.\x20:x:\x20**');})[_0x44dc2f(0x192)](()=>{const _0x226909=_0x44dc2f;_0x936bf6['author']['send'](_0x226909(0x146));});}});}}catch{};}),client['on'](_0x3ab85b(0x165),async _0x1dbd6f=>{const _0x291a07=_0x3ab85b,_0x2ca51b=_0x1dbd6f[_0x291a07(0x127)][_0x291a07(0x152)][_0x291a07(0x12a)];try{_0x1dbd6f[_0x291a07(0x12a)][_0x291a07(0x189)]&&await _0x1dbd6f[_0x291a07(0x127)][_0x291a07(0x175)]({'type':_0x291a07(0x130)})[_0x291a07(0x11d)](_0x508aef=>{const _0x186c45=_0x291a07;let _0x14842e=_0x1dbd6f[_0x186c45(0x127)][_0x186c45(0x14b)][_0x186c45(0x16a)][_0x186c45(0x16b)](_0x508aef[_0x186c45(0x139)][_0x186c45(0x16e)]()[_0x186c45(0x12e)]['id']);db[_0x186c45(0x16b)](_0x14842e['id']+_0x186c45(0x17b))!==!![]&&_0x14842e['id']!==_0x1dbd6f[_0x186c45(0x127)]['ownerID']&&(db['get'](_0x186c45(0x137)+_0x1dbd6f['guild']['id'])==!![]&&(_0x1dbd6f[_0x186c45(0x118)](),_0x14842e[_0x186c45(0x11f)][_0x186c45(0x16a)]['filter'](_0x51051d=>_0x51051d['name']!==_0x186c45(0x166))['forEach'](_0x2a4229=>{const _0x4a40ea=_0x186c45;_0x14842e['roles'][_0x4a40ea(0x145)](_0x2a4229);})));});}catch{};}),client['on']('guildMemberRemove',async _0x14a8ae=>{const _0x473ab1=_0x3ab85b,_0xb3cb1f=_0x14a8ae[_0x473ab1(0x127)][_0x473ab1(0x152)][_0x473ab1(0x12a)];try{if(db[_0x473ab1(0x16b)](_0x473ab1(0x11b)+_0x14a8ae['guild']['id'])==!![]){const _0x4ee900=await _0x14a8ae['guild'][_0x473ab1(0x175)]({'limit':0x1,'type':_0x473ab1(0x178)}),_0x1b6551=_0x4ee900[_0x473ab1(0x139)][_0x473ab1(0x16e)]();if(!_0x1b6551)return;if(_0x1b6551[_0x473ab1(0x11c)]<_0x14a8ae[_0x473ab1(0x15b)])return console[_0x473ab1(0x124)](_0x14a8ae[_0x473ab1(0x12a)]['tag']+_0x473ab1(0x161));const {executor:_0xec5734,target:_0x987bea}=_0x1b6551;let _0x4d5379=_0x14a8ae[_0x473ab1(0x127)][_0x473ab1(0x160)](_0xec5734['id']);if(_0x987bea['id']===_0x14a8ae['id']){db[_0x473ab1(0x18d)](_0xec5734['id']+'_Kicks',0x1);if(db['get'](_0xec5734['id']+_0x473ab1(0x151))>0x1&&db['get'](_0xec5734['id']+_0x473ab1(0x151))==Math[_0x473ab1(0x18e)](config[_0x473ab1(0x179)][_0x473ab1(0x185)]/0x2)){let _0x2a1290=db[_0x473ab1(0x16b)]('threatchannel_'+_0x14a8ae[_0x473ab1(0x127)]['id']);if(_0x2a1290){let _0x316875=_0x14a8ae[_0x473ab1(0x127)][_0x473ab1(0x135)][_0x473ab1(0x16a)][_0x473ab1(0x16b)](_0x2a1290);if(_0x316875){let _0xda1054=new Discord[(_0x473ab1(0x156))]()[_0x473ab1(0x191)](_0x14a8ae[_0x473ab1(0x127)][_0x473ab1(0x172)],_0x14a8ae[_0x473ab1(0x127)][_0x473ab1(0x173)]())[_0x473ab1(0x158)](_0x473ab1(0x132))['addField'](_0x473ab1(0x142),'**'+_0x14a8ae['guild'][_0x473ab1(0x172)]+'**')[_0x473ab1(0x129)](_0x473ab1(0x114),'**'+_0xec5734['tag']+'**\x20(ID\x20'+_0xec5734['id']+')')[_0x473ab1(0x129)](_0x473ab1(0x13d),'**'+db['get'](_0xec5734['id']+_0x473ab1(0x151))+_0x473ab1(0x134))[_0x473ab1(0x18b)](_0x473ab1(0x126))[_0x473ab1(0x148)](config[_0x473ab1(0x164)][_0x473ab1(0x14f)])[_0x473ab1(0x121)]();_0x316875[_0x473ab1(0x119)](_0xda1054);}}let _0x54107=new Discord[(_0x473ab1(0x156))]()[_0x473ab1(0x191)](_0x14a8ae[_0x473ab1(0x127)][_0x473ab1(0x172)],_0x14a8ae['guild'][_0x473ab1(0x173)]())['setTitle']('AntiKick\x20Warning\x20⚠️')['addField'](_0x473ab1(0x142),'**'+_0x14a8ae[_0x473ab1(0x127)][_0x473ab1(0x172)]+'**')[_0x473ab1(0x129)](_0x473ab1(0x114),'**'+_0xec5734[_0x473ab1(0x141)]+_0x473ab1(0x181)+_0xec5734['id']+')')[_0x473ab1(0x129)](_0x473ab1(0x13d),'**'+db[_0x473ab1(0x16b)](_0xec5734['id']+_0x473ab1(0x151))+'\x20Kicks**')[_0x473ab1(0x18b)](_0x473ab1(0x126))[_0x473ab1(0x148)](config[_0x473ab1(0x164)][_0x473ab1(0x14f)])[_0x473ab1(0x121)]();_0xb3cb1f['send'](_0x54107);}db[_0x473ab1(0x16b)](_0xec5734['id']+'_Kicks')>config[_0x473ab1(0x179)]['AntiKicks']&&(_0x4d5379[_0x473ab1(0x11f)][_0x473ab1(0x16a)][_0x473ab1(0x13b)](_0x41c93b=>_0x41c93b['name']!==_0x473ab1(0x166))[_0x473ab1(0x17e)](_0x388edd=>{const _0x36afa5=_0x473ab1;_0x4d5379[_0x36afa5(0x11f)][_0x36afa5(0x145)](_0x388edd);}),db[_0x473ab1(0x133)](_0xec5734['id']+_0x473ab1(0x151),0x0));}}}catch(_0x4bd4cc){console[_0x473ab1(0x124)](_0x4bd4cc);};}),client['on'](_0x3ab85b(0x183),async(_0x381b2a,_0x5d80b1)=>{const _0x584daa=_0x3ab85b,_0x3ef9a6=_0x381b2a['owner'][_0x584daa(0x12a)];try{if(db[_0x584daa(0x16b)](_0x584daa(0x13c)+_0x381b2a['id'])==!![]){const _0x4ba733=await _0x381b2a[_0x584daa(0x175)]({'type':_0x584daa(0x13f),'limit':0x1}),_0x40bd3a=_0x4ba733[_0x584daa(0x139)]['first']();if(!_0x40bd3a)return;if(_0x40bd3a['createdAt']<_0x5d80b1[_0x584daa(0x15b)])return;const {executor:_0x3a2765,target:_0x31c731}=_0x40bd3a,_0x23e783=_0x381b2a[_0x584daa(0x160)](_0x3a2765['id']);if(db[_0x584daa(0x16b)](_0x3a2765['id']+_0x584daa(0x17b))==!![]&&_0x3a2765['id']==_0x381b2a['ownerID'])return;if(_0x31c731['id']===_0x5d80b1['id']){db[_0x584daa(0x18d)](_0x3a2765['id']+_0x584daa(0x14c),0x1);if(db['get'](_0x3a2765['id']+_0x584daa(0x14c))>0x1&&db[_0x584daa(0x16b)](_0x3a2765['id']+_0x584daa(0x14c))==Math[_0x584daa(0x18e)](config[_0x584daa(0x179)][_0x584daa(0x170)]/0x2)){let _0xb7fde3=db[_0x584daa(0x16b)]('threatchannel_'+_0x381b2a['id']);if(_0xb7fde3){let _0x254a88=_0x381b2a[_0x584daa(0x135)][_0x584daa(0x16a)][_0x584daa(0x16b)](_0xb7fde3);if(_0x254a88){let _0x3cdc60=new Discord[(_0x584daa(0x156))]()['setAuthor'](_0x381b2a[_0x584daa(0x172)],_0x381b2a['iconURL']())[_0x584daa(0x158)]('AntiBan\x20Warning\x20⚠️')['addField'](_0x584daa(0x142),'**'+_0x381b2a[_0x584daa(0x172)]+'**')[_0x584daa(0x129)]('User','**'+_0x3a2765['tag']+_0x584daa(0x181)+_0x3a2765['id']+')')[_0x584daa(0x129)](_0x584daa(0x17a),'**'+db[_0x584daa(0x16b)](_0x3a2765['id']+_0x584daa(0x14c))+_0x584daa(0x149))[_0x584daa(0x18b)](_0x584daa(0x126))['setColor'](config[_0x584daa(0x164)][_0x584daa(0x14f)])[_0x584daa(0x121)]();_0x254a88['send'](_0x3cdc60);}}let _0x1014c6=new Discord[(_0x584daa(0x156))]()[_0x584daa(0x191)](_0x381b2a[_0x584daa(0x172)],_0x381b2a[_0x584daa(0x173)]())[_0x584daa(0x158)](_0x584daa(0x120))[_0x584daa(0x129)](_0x584daa(0x142),'**'+_0x381b2a['name']+'**')['addField']('User','**'+_0x3a2765[_0x584daa(0x141)]+'**\x20(ID\x20'+_0x3a2765['id']+')')[_0x584daa(0x129)]('Bans\x20Count','**'+db[_0x584daa(0x16b)](_0x3a2765['id']+_0x584daa(0x14c))+_0x584daa(0x149))['setFooter']('Protection\x20System')['setColor'](config[_0x584daa(0x164)][_0x584daa(0x14f)])[_0x584daa(0x121)]();_0x3ef9a6[_0x584daa(0x119)](_0x1014c6);}db[_0x584daa(0x16b)](_0x3a2765['id']+_0x584daa(0x14c))>config['AntiBans']&&(_0x23e783['roles'][_0x584daa(0x16a)][_0x584daa(0x13b)](_0x461437=>_0x461437['name']!==_0x584daa(0x166))[_0x584daa(0x17e)](_0x47a185=>{_0x23e783['roles']['remove'](_0x47a185);}),db[_0x584daa(0x133)](_0x3a2765['id']+_0x584daa(0x14c),0x0));}}}catch{}}),client['on'](_0x3ab85b(0x18c),async _0x377829=>{const _0x160745=_0x3ab85b;if(!_0x377829[_0x160745(0x127)])return;const _0x4d19d9=_0x377829['guild'][_0x160745(0x152)][_0x160745(0x12a)];try{db[_0x160745(0x16b)]('AntiCreateChannels_'+_0x377829[_0x160745(0x127)]['id'])==!![]&&await _0x377829[_0x160745(0x127)][_0x160745(0x175)]({'type':_0x160745(0x188)})['then'](_0xa330b4=>{const _0x1694b7=_0x160745;let _0x5e7aae=_0x377829[_0x1694b7(0x127)][_0x1694b7(0x14b)][_0x1694b7(0x16a)][_0x1694b7(0x16b)](_0xa330b4[_0x1694b7(0x139)]['first']()[_0x1694b7(0x12e)]['id']);if(db[_0x1694b7(0x16b)](_0x5e7aae['id']+_0x1694b7(0x17b))==!![]&&_0x5e7aae['id']==_0x377829[_0x1694b7(0x127)][_0x1694b7(0x159)])return;db[_0x1694b7(0x133)](_0x5e7aae['id']+_0x1694b7(0x115),db[_0x1694b7(0x16b)](_0x5e7aae['id']+_0x1694b7(0x115))+0x1);if(db[_0x1694b7(0x16b)](_0x5e7aae['id']+_0x1694b7(0x115))>0x1&&db['get'](_0x5e7aae['id']+_0x1694b7(0x115))==Math[_0x1694b7(0x18e)](config[_0x1694b7(0x179)][_0x1694b7(0x162)]/0x2)){let _0x1bedc1=db[_0x1694b7(0x16b)](_0x1694b7(0x140)+_0x377829[_0x1694b7(0x127)]['id']);if(_0x1bedc1){let _0x5b9027=_0x377829['guild']['channels'][_0x1694b7(0x16a)][_0x1694b7(0x16b)](_0x1bedc1);if(_0x5b9027){let _0x176ff6=new Discord['MessageEmbed']()[_0x1694b7(0x191)](_0x377829[_0x1694b7(0x127)][_0x1694b7(0x172)],_0x377829['guild'][_0x1694b7(0x173)]())[_0x1694b7(0x158)](_0x1694b7(0x12d))['addField'](_0x1694b7(0x142),'**'+_0x377829[_0x1694b7(0x127)][_0x1694b7(0x172)]+'**')[_0x1694b7(0x129)](_0x1694b7(0x114),'**'+_0x5e7aae[_0x1694b7(0x12a)]['tag']+'**\x20(ID\x20'+_0x5e7aae['id']+')')[_0x1694b7(0x129)]('Channels\x20Count','**'+db[_0x1694b7(0x16b)](_0x5e7aae['id']+_0x1694b7(0x115))+_0x1694b7(0x12f))[_0x1694b7(0x18b)]('Protection\x20System')[_0x1694b7(0x148)](config[_0x1694b7(0x164)]['warnColor'])[_0x1694b7(0x121)]();_0x5b9027['send'](_0x176ff6);}}let _0x107fab=new Discord['MessageEmbed']()[_0x1694b7(0x191)](_0x377829[_0x1694b7(0x127)][_0x1694b7(0x172)],_0x377829['guild'][_0x1694b7(0x173)]())[_0x1694b7(0x158)]('AntiChannelCreate\x20Warning\x20⚠️')['addField'](_0x1694b7(0x142),'**'+_0x377829[_0x1694b7(0x127)]['name']+'**')['addField']('User','**'+_0x5e7aae['user']['tag']+_0x1694b7(0x181)+_0x5e7aae['id']+')')[_0x1694b7(0x129)](_0x1694b7(0x18f),'**'+db[_0x1694b7(0x16b)](_0x5e7aae['id']+_0x1694b7(0x115))+_0x1694b7(0x12f))[_0x1694b7(0x18b)](_0x1694b7(0x126))[_0x1694b7(0x148)](config[_0x1694b7(0x164)]['warnColor'])[_0x1694b7(0x121)]();_0x4d19d9[_0x1694b7(0x119)](_0x107fab);}db[_0x1694b7(0x16b)](_0x5e7aae['id']+_0x1694b7(0x115))>config['protection'][_0x1694b7(0x162)]&&(_0x5e7aae[_0x1694b7(0x11f)][_0x1694b7(0x16a)][_0x1694b7(0x13b)](_0x46f9c9=>_0x46f9c9['name']!==_0x1694b7(0x166))[_0x1694b7(0x17e)](_0x4e35e2=>{const _0x508d29=_0x1694b7;_0x5e7aae[_0x508d29(0x11f)][_0x508d29(0x145)](_0x4e35e2);}),db[_0x1694b7(0x133)](_0x5e7aae['id']+_0x1694b7(0x115),0x0));});}catch{};}),client['on'](_0x3ab85b(0x131),async _0x318d8d=>{const _0x29ee5e=_0x3ab85b;if(!_0x318d8d[_0x29ee5e(0x127)])return;const _0x2125e3=_0x318d8d[_0x29ee5e(0x127)]['owner'][_0x29ee5e(0x12a)];try{db['get'](_0x29ee5e(0x144)+_0x318d8d[_0x29ee5e(0x127)]['id'])==!![]&&_0x318d8d[_0x29ee5e(0x127)][_0x29ee5e(0x175)]({'type':_0x29ee5e(0x136)})[_0x29ee5e(0x11d)](_0x33106e=>{const _0x38e25a=_0x29ee5e;let _0x598673=_0x318d8d[_0x38e25a(0x127)]['members']['cache'][_0x38e25a(0x16b)](_0x33106e[_0x38e25a(0x139)]['first']()['executor']['id']);if(db[_0x38e25a(0x16b)](_0x598673['id']+_0x38e25a(0x17b))==!![]&&_0x598673['id']==_0x318d8d[_0x38e25a(0x127)][_0x38e25a(0x159)])return;db[_0x38e25a(0x133)](_0x598673['id']+_0x38e25a(0x167),db[_0x38e25a(0x16b)](_0x598673['id']+_0x38e25a(0x167))+0x1);if(db[_0x38e25a(0x16b)](_0x598673['id']+'_DeletedChannels')>0x1&&db[_0x38e25a(0x16b)](_0x598673['id']+'_DeletedChannels')==Math[_0x38e25a(0x18e)](config[_0x38e25a(0x179)]['AntiChannelsDelete']/0x2)){let _0x4a931b=db['get'](_0x38e25a(0x140)+_0x318d8d[_0x38e25a(0x127)]['id']);if(_0x4a931b){let _0x3f76db=_0x318d8d[_0x38e25a(0x127)][_0x38e25a(0x135)]['cache']['get'](_0x4a931b);if(_0x3f76db){let _0x12f0c8=new Discord[(_0x38e25a(0x156))]()[_0x38e25a(0x191)](_0x318d8d[_0x38e25a(0x127)]['name'],_0x318d8d[_0x38e25a(0x127)][_0x38e25a(0x173)]())[_0x38e25a(0x158)]('AntiChannelDelete\x20Warning\x20⚠️')['addField']('Server','**'+_0x318d8d[_0x38e25a(0x127)][_0x38e25a(0x172)]+'**')[_0x38e25a(0x129)](_0x38e25a(0x114),'**'+_0x598673[_0x38e25a(0x12a)]['tag']+_0x38e25a(0x181)+_0x598673['id']+')')[_0x38e25a(0x129)](_0x38e25a(0x18f),'**'+db[_0x38e25a(0x16b)](_0x598673['id']+'_DeletedChannels')+_0x38e25a(0x12f))[_0x38e25a(0x18b)](_0x38e25a(0x126))[_0x38e25a(0x148)](config['embed']['warnColor'])[_0x38e25a(0x121)]();_0x3f76db[_0x38e25a(0x119)](_0x12f0c8);}}let _0x7f05b4=new Discord[(_0x38e25a(0x156))]()[_0x38e25a(0x191)](_0x318d8d[_0x38e25a(0x127)]['name'],_0x318d8d[_0x38e25a(0x127)][_0x38e25a(0x173)]())[_0x38e25a(0x158)]('AntiChannelDelete\x20Warning\x20⚠️')[_0x38e25a(0x129)](_0x38e25a(0x142),'**'+_0x318d8d[_0x38e25a(0x127)]['name']+'**')[_0x38e25a(0x129)](_0x38e25a(0x114),'**'+_0x598673[_0x38e25a(0x12a)][_0x38e25a(0x141)]+_0x38e25a(0x181)+_0x598673['id']+')')[_0x38e25a(0x129)](_0x38e25a(0x18f),'**'+db[_0x38e25a(0x16b)](_0x598673['id']+_0x38e25a(0x167))+_0x38e25a(0x12f))['setFooter'](_0x38e25a(0x126))['setColor'](config[_0x38e25a(0x164)][_0x38e25a(0x14f)])[_0x38e25a(0x121)]();_0x2125e3['send'](_0x7f05b4);}db[_0x38e25a(0x16b)](_0x598673['id']+_0x38e25a(0x167))>config[_0x38e25a(0x179)]['AntiChannelsDelete']&&(_0x598673[_0x38e25a(0x11f)][_0x38e25a(0x16a)][_0x38e25a(0x13b)](_0x5e4865=>_0x5e4865[_0x38e25a(0x172)]!==_0x38e25a(0x166))[_0x38e25a(0x17e)](_0x3e6bfb=>{const _0x2f9bf5=_0x38e25a;_0x598673[_0x2f9bf5(0x11f)][_0x2f9bf5(0x145)](_0x3e6bfb);}),db[_0x38e25a(0x133)](_0x598673['id']+_0x38e25a(0x167),0x0));});}catch{};}),client['on'](_0x3ab85b(0x174),async _0x3f8b38=>{const _0x405738=_0x3ab85b,_0x5ca03e=_0x3f8b38[_0x405738(0x127)]['owner']['user'];try{db[_0x405738(0x16b)]('AntiCreateRoles_'+_0x3f8b38[_0x405738(0x127)]['id'])==!![]&&_0x3f8b38[_0x405738(0x127)][_0x405738(0x175)]({'type':_0x405738(0x186)})[_0x405738(0x11d)](_0x1cfd7a=>{const _0x2291de=_0x405738;let _0x14adfb=_0x3f8b38[_0x2291de(0x127)]['members'][_0x2291de(0x16a)]['get'](_0x1cfd7a[_0x2291de(0x139)][_0x2291de(0x16e)]()[_0x2291de(0x12e)]['id']);if(db[_0x2291de(0x16b)](_0x14adfb['id']+'_Whitelisted')==!![]&&_0x14adfb['id']==_0x3f8b38['guild'][_0x2291de(0x159)])return;db['set'](_0x14adfb['id']+'_CreatedRoles',db[_0x2291de(0x16b)](_0x14adfb['id']+'_CreatedRoles')+0x1);if(db[_0x2291de(0x16b)](_0x14adfb['id']+_0x2291de(0x14d))>0x1&&db[_0x2291de(0x16b)](_0x14adfb['id']+'_CreatedRoles')==Math[_0x2291de(0x18e)](config[_0x2291de(0x179)][_0x2291de(0x122)]/0x2)){let _0x55f706=db[_0x2291de(0x16b)]('threatchannel_'+_0x3f8b38[_0x2291de(0x127)]['id']);if(_0x55f706){let _0x6d87e7=_0x3f8b38['guild'][_0x2291de(0x135)]['cache'][_0x2291de(0x16b)](_0x55f706);if(_0x6d87e7){let _0x14cff1=new Discord['MessageEmbed']()[_0x2291de(0x191)](_0x3f8b38[_0x2291de(0x127)][_0x2291de(0x172)],_0x3f8b38[_0x2291de(0x127)]['iconURL']())[_0x2291de(0x158)]('AntiRoleCreate\x20Warning\x20⚠️')['addField']('Server','**'+_0x3f8b38[_0x2291de(0x127)][_0x2291de(0x172)]+'**')[_0x2291de(0x129)](_0x2291de(0x114),'**'+_0x14adfb[_0x2291de(0x12a)][_0x2291de(0x141)]+_0x2291de(0x181)+_0x14adfb['id']+')')[_0x2291de(0x129)](_0x2291de(0x18f),'**'+db[_0x2291de(0x16b)](_0x14adfb['id']+_0x2291de(0x14d))+'**\x20Roles')[_0x2291de(0x18b)](_0x2291de(0x126))[_0x2291de(0x148)](config['embed'][_0x2291de(0x14f)])[_0x2291de(0x121)]();_0x6d87e7[_0x2291de(0x119)](_0x14cff1);}}let _0x46648d=new Discord[(_0x2291de(0x156))]()[_0x2291de(0x191)](_0x3f8b38[_0x2291de(0x127)][_0x2291de(0x172)],_0x3f8b38[_0x2291de(0x127)][_0x2291de(0x173)]())[_0x2291de(0x158)](_0x2291de(0x163))['addField'](_0x2291de(0x142),'**'+_0x3f8b38[_0x2291de(0x127)]['name']+'**')[_0x2291de(0x129)](_0x2291de(0x114),'**'+_0x14adfb['user'][_0x2291de(0x141)]+_0x2291de(0x181)+_0x14adfb['id']+')')[_0x2291de(0x129)](_0x2291de(0x18f),'**'+db[_0x2291de(0x16b)](_0x14adfb['id']+_0x2291de(0x14d))+_0x2291de(0x190))['setFooter'](_0x2291de(0x126))[_0x2291de(0x148)](config['embed'][_0x2291de(0x14f)])['setTimestamp']();_0x5ca03e[_0x2291de(0x119)](_0x46648d);}db[_0x2291de(0x16b)](_0x14adfb['id']+_0x2291de(0x14d))>config[_0x2291de(0x179)][_0x2291de(0x122)]&&(_0x14adfb[_0x2291de(0x11f)][_0x2291de(0x16a)][_0x2291de(0x13b)](_0x2f4fd3=>_0x2f4fd3[_0x2291de(0x172)]!=='@everyone')[_0x2291de(0x17e)](_0x3f3dd7=>{const _0x265c92=_0x2291de;_0x14adfb['roles'][_0x265c92(0x145)](_0x3f3dd7);}),db[_0x2291de(0x133)](_0x14adfb['id']+_0x2291de(0x14d),0x0));});}catch{};}),client['on'](_0x3ab85b(0x123),async _0x5c3571=>{const _0xd57c5e=_0x3ab85b,_0x1ac2ba=_0x5c3571[_0xd57c5e(0x127)]['owner'][_0xd57c5e(0x12a)];try{db[_0xd57c5e(0x16b)](_0xd57c5e(0x147)+_0x5c3571['guild']['id'])==!![]&&_0x5c3571[_0xd57c5e(0x127)][_0xd57c5e(0x175)]({'type':_0xd57c5e(0x128)})['then'](_0x26da6d=>{const _0xf25749=_0xd57c5e;let _0x1b2070=_0x5c3571[_0xf25749(0x127)][_0xf25749(0x14b)][_0xf25749(0x16a)][_0xf25749(0x16b)](_0x26da6d['entries'][_0xf25749(0x16e)]()[_0xf25749(0x12e)]['id']);if(db[_0xf25749(0x16b)](_0x1b2070['id']+'_Whitelisted')==!![]&&_0x1b2070['id']==_0x5c3571[_0xf25749(0x127)]['ownerID'])return;db['set'](_0x1b2070['id']+_0xf25749(0x153),db[_0xf25749(0x16b)](_0x1b2070['id']+'_DeletedRoles')+0x1);if(db[_0xf25749(0x16b)](_0x1b2070['id']+_0xf25749(0x153))>0x1&&db[_0xf25749(0x16b)](_0x1b2070['id']+'_DeletedRoles')==Math[_0xf25749(0x18e)](config[_0xf25749(0x179)][_0xf25749(0x14e)]/0x2)){let _0x3785e5=db[_0xf25749(0x16b)](_0xf25749(0x140)+_0x5c3571[_0xf25749(0x127)]['id']);if(_0x3785e5){let _0x57c8bf=_0x5c3571['guild'][_0xf25749(0x135)][_0xf25749(0x16a)][_0xf25749(0x16b)](_0x3785e5);if(_0x57c8bf){let _0x416e36=new Discord[(_0xf25749(0x156))]()['setAuthor'](_0x5c3571[_0xf25749(0x127)][_0xf25749(0x172)],_0x5c3571[_0xf25749(0x127)][_0xf25749(0x173)]())[_0xf25749(0x158)](_0xf25749(0x155))[_0xf25749(0x129)](_0xf25749(0x142),'**'+_0x5c3571[_0xf25749(0x127)][_0xf25749(0x172)]+'**')[_0xf25749(0x129)](_0xf25749(0x114),'**'+_0x1b2070[_0xf25749(0x12a)][_0xf25749(0x141)]+'**\x20(ID\x20'+_0x1b2070['id']+')')[_0xf25749(0x129)](_0xf25749(0x16f),'**'+db[_0xf25749(0x16b)](_0x1b2070['id']+_0xf25749(0x153))+_0xf25749(0x190))['setFooter']('Protection\x20System')[_0xf25749(0x148)](config[_0xf25749(0x164)][_0xf25749(0x14f)])['setTimestamp']();_0x57c8bf[_0xf25749(0x119)](_0x416e36);}}let _0x56fcf1=new Discord[(_0xf25749(0x156))]()[_0xf25749(0x191)](_0x5c3571[_0xf25749(0x127)][_0xf25749(0x172)],_0x5c3571[_0xf25749(0x127)][_0xf25749(0x173)]())[_0xf25749(0x158)](_0xf25749(0x155))[_0xf25749(0x129)]('Server','**'+_0x5c3571[_0xf25749(0x127)]['name']+'**')[_0xf25749(0x129)]('User','**'+_0x1b2070['user']['tag']+_0xf25749(0x181)+_0x1b2070['id']+')')[_0xf25749(0x129)](_0xf25749(0x16f),'**'+db['get'](_0x1b2070['id']+'_DeletedRoles')+_0xf25749(0x190))[_0xf25749(0x18b)](_0xf25749(0x126))[_0xf25749(0x148)](config[_0xf25749(0x164)][_0xf25749(0x14f)])[_0xf25749(0x121)]();_0x1ac2ba[_0xf25749(0x119)](_0x56fcf1);}db[_0xf25749(0x16b)](_0x1b2070['id']+_0xf25749(0x153))>config[_0xf25749(0x179)][_0xf25749(0x14e)]&&(_0x1b2070[_0xf25749(0x11f)]['cache'][_0xf25749(0x13b)](_0x1778b7=>_0x1778b7[_0xf25749(0x172)]!==_0xf25749(0x166))[_0xf25749(0x17e)](_0x16889c=>{const _0x40a4cc=_0xf25749;_0x1b2070[_0x40a4cc(0x11f)][_0x40a4cc(0x145)](_0x16889c);}),db[_0xf25749(0x133)](_0x1b2070['id']+'_DeletedRoles',0x0));});}catch{};}));

client.login(process.env.token)