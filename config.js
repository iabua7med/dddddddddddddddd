module.exports = {
  setting: {
    //اعدادات البوت
    Prefix: "!",
    Token: null,
  },
  protection: {
    //الحد الاقصى لكل حماية
    AntiChannelsDelete: 4,
    AntiChannelsCreate: 6,
    AntiKicks: 4,
    AntiBans: 4,
    AntiBots: 4,
    AntiRolesDelete: 4,
    AntiRolesCreate: 6,
    SpamWarning: 4,
    AntiSpam: 6,
    AntiLinks: 8,
    Links: ["discord", "discord.gg", "https"]//الروابط الممنوعة
  },
  ready: {
    //الحالة ونوع الحالة
    Activity: "IM READY",
    Activity_TYPE: "WATCHING",// PLAYING , STREMING , WATCHING
  },
  embed: {
    //لون امبيد التحذيرات
    warnColor: "#8f00f5",
  },
  react:{
    //ضع ايدي الرياكشن بكل مكان مخحصص
    ON: "<:ON:838395420853010452>",// رياكشن المفعل
    OFF: "<:OFF:838395404659064873>",// رياكشن المطفي
    HAMMER: "<:thorhammer:838399147534188604>",// رياكشن المطرقة
  },

}