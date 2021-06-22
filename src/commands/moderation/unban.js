exports.run = async (client, message, args) => {
    //TODO: tempban
    //TODO: unban


    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nie masz permisji! \`BAN_MEMBERS\`")
  
    let userID = args[0]
    if(!userID) return message.channel.send("Nie znaleziono użytkownika.")

    message.guild.fetchBans().then(bans => {
        let member = bans.get(userID);
        if (!member) message.channel.send("Nie znaleziono użytkownika.")

        message.guild.unban(member, `Odbanowano przez ${message.author.tag}`)
    })
}
exports.help = {
    name: "ban",
    aliases: ["zbanuj"],
    category: "moderation",
}