import { Client, IntentsBitField } from "discord.js";
import "dotenv/config";

const client = new Client({
    intents: [
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.Guilds
    ]
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "!ping") {
        message.reply("Pong!");
    }
});

client.on("ready", () => {
    console.log(`Bot rennt.`);
});

client.login(process.env.TOKEN);