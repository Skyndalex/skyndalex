const Discord = require("discord.js");
const cooldown = new Set;

exports.run = async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
        client.sender(message, "403: Forbidden", "Poczekaj 5 minut zanim ponownie wyślesz request!", "Spam ticketami grozi blokadą na korzystanie z bota!", "RED", "", "")
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
          client.sender(message, "", "Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **pomoc techniczna**", "", "GREEN", "", "")
          break;
      case 'opinions':
          let opinionsRequests = client.channels.cache.get("829816326188564510")

          const embed2 = new Discord.MessageEmbed()
              .setDescription(args.slice(1).join(" "))
              .addField("Opinię wysłał", message.author.tag)
              .addField("ID użytkownika", message.author.id)
              .setColor("GREEN")
          opinionsRequests.send(embed2)

          client.sender(message, "", "Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **opinions**", "", "GREEN", "", "")

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

          client.sender(message, "", "Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **bugs**", "", "GREEN", "", "")

          break;
      case 'suggest':
          const suggestChannel = client.channels.cache.get("836363614699913227")

          const embed4 = new Discord.MessageEmbed()
              .setDescription(args.slice(1).join(" "))
              .addField("Zgłosił", message.author.tag)
              .addField("ID zgłaszającego", message.author.id)
              .setColor("GREEN")
          suggestChannel.send(embed4)

          client.sender(message, "", "Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **suggest**", "", "GREEN", "", "")

          break;
      case 'beta':
          const betaChannel = client.channels.cache.get("846121325444857906")

          const embed5 = new Discord.MessageEmbed()
              .setDescription(args.slice(1).join(" "))
              .addField("Zgłosił", message.author.tag)
              .addField("ID zgłaszającego", message.author.id)
              .setColor("GREEN")
          betaChannel.send(embed5)

          client.sender(message, "", "Wysłano zgłoszenie do ekipy bota. Prosimy posiadać odblokowane DM, abyśmy mogli odpowiedzieć.\nWysłano do działu: **beta**", "", "GREEN", "", "")

          break;
      default:
          client.sender(message, "Zaawansowana pomoc", "[Dokumentacja](https://docs.krivebot.xyz) nie starczy? Potrzebujesz więcej pomocy z botem? Trafiłeś w idealne miejsce!", "UWAGA: Cooldown obejmuje całą komendę! Używaj jej ostrożnie", "GREEN", [
              {
                  name: "Pomoc techniczna",
                  value: "\`reuest technic [treść]\`"
              },
              {
                  name: "Opinie",
                  value: "\`request opinions [opinia]\`"
              },
              {
                  name: "Błędy",
                  value: "\`request bugs [bug]\`"
              },
              {
                  name: "Rekrutacja na beta-testerów",
                  value: "\`request beta [treść]\`"
              }
          ])
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