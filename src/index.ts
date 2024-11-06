import { Client, IntentsBitField, InteractionType, REST, Routes, SlashCommandBuilder } from "discord.js";
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
        message.reply({ content: "Pong!" });
    }
});

client.on("interactionCreate", (action) => {
    if (action.type !== InteractionType.ApplicationCommand) {
        return;
    }

    if (action.commandName === "ping") {
        action.reply({ content: "Pong!" });
    }
 });

client.on("ready", () => {
    console.log(`Bot rennt.`);

    if (process.env.UPDATE_SLASH_COMMANDS === "true") {
        const rest = new REST({ version: '10' })
            .setToken(process.env.TOKEN!!);

        const commands = [
            new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Ping Pong command")
                .toJSON()
        ];

        /*
            {
                "name": string,
                "description": string,
                "options": array[ { "name": string, "description": string, "type": "user"|"number"|"string"|"channel", "required": boolean } ]
            }

            bsp: ban [username]
        */

        rest.put(Routes.applicationCommands(client.user!.id), { body: commands }).then(e => {
            console.log(`Slash commands updated.`);
        });
    }
});

client.login(process.env.TOKEN);