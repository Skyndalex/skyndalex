# Starting

```
cd src
node index.js
```
## Linux
```
cd src 
node index.js
or 
sudo apt install pm2

starting: pm2 start index.js
restarting: pm2 restart index.js
stopping: pm2 stop index.js
```
# config.json Example 

```json
{
  "token": "YourTokenFromDiscord.dev",
  "clientId": "YourBotIdFromDiscord.dev",
  "rethinkdb": {
    "port": 28015,
    "database": "krivebot",
    "host": "localhost"
  },
  "activities": [
    "Bot version: {version}",
    "View site: https://krivebot.xyz",
    "Community: https://krivebot.xyz/discord",
    "Statuspage: https://status.krivebot.xyz",
    "Docs: https://docs.krivebot.xyz"
  ],
  "api": {
    "enable": true,
    "clientSecret": "YourClientSecretFromDiscord.dev",
    "port": 6969,
    "callbackUrl": "http://localhost:8080/callback"
  }
}
```