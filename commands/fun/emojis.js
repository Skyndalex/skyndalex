exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")
    let text = args.splice('').join(' ')
    if (text.length > 1000) return client.sender(message, "Błąd!", "Bot nie może wysłać wiadomości dłuższej niż 1k (1000) znaków", "", "RED", "", "")
    let replaced = text
        .replace(/a/gi, '🇦 ') // lubie
        .replace(/ą/gi, '🇦 ') // spaghetti
        .replace(/b/gi, '🇧 ') // dlatego
        .replace(/c/gi, '🇨 ') // ten kod
        .replace(/ć/gi, '🇨 ') // taki jest
        .replace(/d/gi, '🇩 ') // bo tak
        .replace(/e/gi, '🇪 ') // tak serio 
        .replace(/ę/gi, '🇪 ') // to nie wiem po co napieprzam tyle komentarzy bo mogę wszystko wsadzić w jeden
        .replace(/f/gi, '🇫 ')
        .replace(/g/gi, '🇬 ')
        .replace(/h/gi, '🇭 ')
        .replace(/i/gi, '🇮 ')
        .replace(/j/gi, '🇯 ')
        .replace(/k/gi, '🇰 ')
        .replace(/l/gi, '🇱 ')
        .replace(/ł/gi, '🇱 ')
        .replace(/m/gi, '🇲 ')
        .replace(/n/gi, '🇳 ')
        .replace(/ń/gi, '🇳 ')
        .replace(/o/gi, '🇴 ')
        .replace(/ó/gi, '🇴 ')
        .replace(/p/gi, '🇵 ')
        .replace(/q/gi, '🇶 ')
        .replace(/r/gi, '🇷 ')
        .replace(/s/gi, '🇸 ')
        .replace(/ś/gi, '🇸 ')
        .replace(/t/gi, '🇹 ')
        .replace(/u/gi, '🇺 ')
        .replace(/v/gi, '🇻 ')
        .replace(/w/gi, '🇼 ')
        .replace(/x/gi, '🇽 ')
        .replace(/y/gi, '🇾 ')
        .replace(/z/gi, '🇿 ')
        .replace(/ż/gi, '🇿 ')
        .replace(/ź/gi, '🇿 ')
        .replace(/1/g, '1️⃣ ')
        .replace(/2/g, '2️⃣ ')
        .replace(/3/g, '3️⃣ ')
        .replace(/4/g, '4️⃣ ')
        .replace(/5/g, '5️⃣ ')
        .replace(/6/g, '6️⃣ ')
        .replace(/7/g, '7️⃣ ')
        .replace(/8/g, '8️⃣ ')
        .replace(/9/g, '9️⃣ ')
        .replace(/0/g, '0️⃣ ')
    message.channel.send({content: replaced})
}
exports.help = {
    name: "emojis",
    description: "Przerabia wiadomość w emotki",
    perms: "server.send_messages.emojis",
    category: "fun"
}