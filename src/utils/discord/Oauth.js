exports.run = (client) => {
    const express = require('express');

    const app = express();

    app.get('/', (request, response) => {
        return response.sendFile('index.html', { root: "./utils/discord" });
    });
    app.listen(4444, () => console.log(`App listening at http://localhost:4444`));
}