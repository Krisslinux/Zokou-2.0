const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE1FWndzWGU4M2VWdVJLNDZ0NDhyQUZDUVd3YlZTM1p0TFFUUWJtNXUzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEVFc3VUc3dHMlA3SVIvbHhaWXdQdXAzN2g2M1BJZkJkd2FWK3BnK3BBMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRTVqUjRJSWVncHdCK3ZPQUx1Y21rQ1hZOE5JOHZLWlBEamVrZno4eDAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5blFnbjBBdGZKT2RxbXRrQ2VxQ29hR1FVMHNsR1dKMUdnWERHcmRxejN3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktOMzd6dHBSSys0d3dHZDhNZWJ3NGttZ0N2RTJEOGtLM3FHT0IyM0xibVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikpjd3Ira0JSVk1KaHgwcGJNQzhhZ1I3YVdmRDJxODJUeVdIc0V0ZE5Bd3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09Pcm9PL3V5K2cxZW5TbjROQ3pxbHhZRnVMa1NCWitXb3FITDc1bjltdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWxTVmwvL1ZJRWQrSE1QZWR4dmtDdXVFZDdjRmZQeEFicWZNbXBlK0N4QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktMalpHbXlBQmpMYlV3dkJSUFR0WEkxalNpUmUrYnp2MXlTZnY1TjJMMkJQWVR1SlEzeW0ybTRza0dQNTZrVVhJSVQrUXdjc053RUpqcXdaZFNxK2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJkWlg3L09wdFJUMzZuSlFVU1JBSlFLczYxaTIrQys0YmJ3b2E5VjR1bnZRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWX014NFd0dVNOMk1TcVctblVpZjdnIiwicGhvbmVJZCI6ImVkOGQzMzY4LWQ2ODMtNDU5My05NWE4LWY5YmE1YmI2NDRjMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRUIxTEpJVnJhYjdQN2lBOFhVb1d1YXRwaW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEZXa0ZsTDhvamhTMTEzUXJUU0pNQ1FRMG1NPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRGRUFGTVg1IiwibGFzdFByb3BIYXNoIjoiMldVam1aIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJtZSI6eyJpZCI6IjIzNDkxNjA4NzgzNjg6MzVAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNjMzMjQ1Mjg4MjAzOTc6MzVAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLbnMvUHNCRUtuMXdiVUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNTlRzRkxtTytUbmJZRXU2QnBhK05aYTN0aTI1cmZDMFk3NngvQWZBalhrPSIsImFjY291bnRTaWduYXR1cmUiOiJtbWtmKzB1LzhPbTZvbUw5bGJHV0J5eVlvWXZmMS9EMGdhVWo5U3RjV2wyVytRTWhRdWhSTkpBMkg4UGhRcGh6NE9yOHpBR2hMNythTzE3RDNBZEpBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiM0pTZG5xVG9xVFZqQjlreVg5T1BlUWk3K21QM0U1Q2hCb1pidGp5eUs0VmhKSUJrVUc2Um5vVWZnUmtneW54c0lTNXRmVk93SHF5VlQ4SitNdWhGanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTYwODc4MzY4OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlREVTdCUzVqdms1MjJCTHVnYVd2aldXdDdZdHVhM3d0R08rc2Z3SHdJMTUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI4NDE3NzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQXhvIn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
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
