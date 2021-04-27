const Discord = require("discord.js");
const cooldown = new Set;

exports.run = async (client, message, args) => {
    let requestModerators = [
        "682572949219180547", // cyber
        "829789505237024778", // inkatail
        "494017032283619329", // rkubapl
        "779643124578254858", // lexer
    ]
    if (cooldown.has(message.author.id)) {
        client.error(message, "Poczekaj 5 minut zanim ponownie wyślesz request!")
    } else {
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
      case 'suggest':
          const suggestChannel = client.channels.cache.get("836363614699913227")

          const embed4 = new Discord.MessageEmbed()
              .setDescription(args.slice(1).join(" "))
              .addField("Zgłosił", message.author.tag)
              .addField("ID zgłaszającego", message.author.id)
              .setColor("GREEN")
          suggestChannel.send(embed4)

          const sentRequestSuggest = new Discord.MessageEmbed()
              .setDescription("Wysłano propozycję!")
              .setColor("GREEN")
          message.channel.send(sentRequestSuggest)
          break;
      default:
          const embedDefault = new Discord.MessageEmbed()
              .setTitle("Zaawansowana pomoc")
              .setDescription("[Dokumentacja](https://docs.krivebot.xyz) nie starczy? Potrzebujesz więcej pomocy z botem? Trafiłeś w idealne miejsce!")
              .addField("Pomoc techniczna", "\`request technic [treść]\`")
              .addField("Opinie", "\`request opinions [opinia]\`")
              .addField("Błędy", "\`request bugs [błąd]\`")
              .setFooter(client.requestFooter)
              .setColor("GREEN")
          message.channel.send(embedDefault)
          break;
          }
     }
  await cooldown.add(message.author.id)

    setTimeout(async() => {
       await cooldown.delete(message.author.id);
    }, 300000);
}
exports.help = {
    name: "request",
    description: "Wyślij zgłoszenie do odpowiedniego działu",
    category: "bot",
}