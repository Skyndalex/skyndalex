exports.load = (gateway, discord) => {
    gateway.command({
        category: 'economy',
        name: 'work',
        description: 'Zbierasz monety',
        usage: 'work',
        aliases: ["pracuj", "robota"],

        run: (client, msg) => {
            client.events.error(client, "beta", msg);
        }
    })

    gateway.command({
        category: 'economy',
        name: 'cash',
        description: 'Sprawdza twój stan konta',
        usage: 'cash [użytkownik]',
        aliases: ["bal", "monety"],

        run: (client, msg) => {
            client.events.error(client, "beta", msg);
        }
    })

    gateway.command({
        category: 'economy',
        name: 'daily-reward',
        description: 'Codzienna nagroda',
        usage: 'daily-reward',
        aliases: [],

        run: (client, msg) => {
            client.events.error(client, "beta", msg)
        }
    })

    gateway.command({
        category: 'economy',
        name: 'rob',
        description: 'Możesz okradnąć użytkownika',
        usage: 'rob (użytkownik',
        aliases: ["okradnij"],

        run: (client, msg) => {
            client.events.error(client, "beta", msg)
        }
    })

    gateway.command({
        category: 'economy',
        name: 'blackjack',
        description: 'Gra w blackjack',
        usage: 'blackjack [ilość monet]',
        aliases: ["bj"],

        run: (client, msg) => {
            client.events.error(client, "beta", msg)
        }
    })
    gateway.command({
        category: 'economy',
        name: 'roulette',
        description: 'Ruletka',
        usage: 'roulette [ilość monet] [black/red/13-24]',
        aliases: ["rr"],

        run: (client, msg) => {
            client.events.error(client, "beta", msg)

        }
    })

}