const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUpVMW5ndDJZUXhhOE1ldnhIY1h1L25WWTE5cWJXUWhjYUpSL0x6dnZWcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkdaUkJ0ME9lclA0a3NWTTJ3c2hDTzVqYUJIQ0VudU9LWi80bkdEN0docz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTTJFQmxKckZLKzltcG5ETVQrcFgvOTFJYlR5a3N2bmNEei8rekFGN1h3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDZU00V2dzbVU4VWhOUzVCMTFDeEJWMXBZYWdITW9wcWJJVmlncVRTdHh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZBamtwWWVneHhnVGhVVTZyMGM0Ri96alUrOC9ROHpkL3RseXVHSGhQM2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlQU1FKdlBOeXg4ZnlDMHlzQkR2MEhKT2svNG1KdzdyV0pwSVRpdnQwRFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0ptVVBzWExLN0RCTE9ZaFF4ditLNnBtd0M2dE5YRE5zOEk4MUd6eDhWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDRUTGpwcFZ2Ry9vcWNaZFBBRFlZYXZMRk9sTGRwN1c4WDY3L204TkszWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1DNW9QeG5nVEVJbHViMWxDTFc4c1phRi9XOTZadllIQkNEZEllVk5Uc3YrMy9kK1JtNWVQRWZOVExVUEVCT01yOWFKZG01Y0p4ekRhUlpWQUZaYmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiJJbHQ2NHErOXNZaXY3QzJoUDA5SXpQS2lOam1XTk05VytuNXhPVXpvMTAwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5QWpxU01GRFFOTzJpOVhvQnVPdnhnIiwicGhvbmVJZCI6IjIwMTI2ODViLTI0NDItNDkxYi1hMWNiLWVlZjJlZDViYzI0NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHN2t6RFNDbWd1VEN2Wm84UjRPY2lzS21oQlE9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxoeXRYc0FPN3I5TlU0RlJUc0t1N2JVU3JIRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ083QzdNa0NFSVg2bUxVR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlhjNFRyM3htMWJ6Mkc0T2N2ZG5FRmk1WnRuQTc3eGxiMnZDRzJaKzNNeDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlRTVjhoUzI0RlMxbGN6eVR5MW4rUlZMblNXb0FCVEJyVklyQW5qVGprUUpBS2ErTjl6RXpwMjZHRXRySVo4Q2Z3RmppSHZVYm8wMkljaHYyV2ZvMkJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJycEdtRmkvb0tza1IyMmJBT3N4UmJsV1VuaHpNeUtGa3hvUnloMnIxc1IwSDY5dnZZazh3MTg3QnFEdG4zRHR1Y0FYUGdYeE5URnk0ZXJVNElOWXlpUT09In0sIm1lIjp7ImlkIjoiMjM0ODE2MDI0NzM0MToxMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJGYXZvdXJtaGkifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE2MDI0NzM0MToxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWM09FNjk4WnRXODlodURuTDNaeEJZdVdiWndPKzhaVzlyd2h0bWZ0ek1lIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTcwNjMzfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Favour",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348160247341", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
