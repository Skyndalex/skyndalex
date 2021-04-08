const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
  switch (args[0]) {
      case 'technic':
          let technicRequests = client.channels.cache.get("827522860489637908")

          const embed = new Discord.MessageEmbed()
              .setDescription(args.slice(1).join(" "))
              .addField("Zgłosił", message.author.tag)
              .addField("ID zgłaszającego", message.author.id)
              .setColor("GREEN")
          technicRequests.send(embed)

          const sentRequestTechnic = new Discord.MessageEmbed()
              .setDescription("Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **pomoc techniczna**")
              .setColor("GREEN")
          message.channel.send(sentRequestTechnic)
          break;
      case 'opinions':
          let opinionsRequests = client.channels.cache.get("829816326188564510")

          const embed2 = new Discord.MessageEmbed()
              .setDescription(args.slice(1).join(" "))
              .addField("Opinię wysłał", message.author.tag)
              .addField("ID użytkownika", message.author.id)
              .setColor("GREEN")
          opinionsRequests.send(embed2)

          const sentRequestOpinions = new Discord.MessageEmbed()
              .setDescription("Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **opinions**")
              .setColor("GREEN")
          message.channel.send(sentRequestOpinions)
          break;
      case 'bugs':
          let bugsRequest = client.channels.cache.get("829817201321443368")

          const embed3 = new Discord.MessageEmbed()
              .setDescription(args.slice(1).join(" "))
              .addField("Zgłosił", message.author.tag)
              .addField("ID zgłaszającego", message.author.id)
              .setColor("GREEN")
          bugsRequest.send(embed3)

          const sentRequestBugs = new Discord.MessageEmbed()
              .setDescription("Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **bugs**")
              .setColor("GREEN")
          message.channel.send(sentRequestBugs)
          break;
      case 'default':
      default:
          const embedDefault = new Discord.MessageEmbed()
              .setTitle("Zaawansowana pomoc")
              .setDescription("[Dokumentacja](https://docs.krivebot.xyz) nie starczy? Potrzebujesz więcej pomocy z botem? Trafiłeś w idealne miejsce!")
              .addField("Pomoc techniczna", "\`request technic [treść]\`")
              .addField("Opinie", "\`request opinions [opinia]\`")
              .addField("Błędy", "\`request bugs [błąd]\`")
              .setFooter(client.footer)
              .setColor("GREEN")
          message.channel.send(embedDefault)
          break;
  }
}
exports.help = {
    name: "request",
    description: "Wyślij zgłoszenie do odpowiedniego działu",
    category: "bot",
}