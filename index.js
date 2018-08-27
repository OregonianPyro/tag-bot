const { Client } = require('discord.js');
const Enmap = require('enmap');
const klaw = require('klaw');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
require('dotenv').config();

class Bot extends Client {
    constructor(options) {
        super(options);
        this.commands = new Map();
        this.aliases = new Map();
        this.emotes = {
            check: '✅',
            x: '❌',
            warn: '⚠'
        };
        this.chalk = require('chalk');
        this.moment = require('moment');
        this.settings = new Enmap({ name: 'settings' });
        this.tags = new Enmap({ name: 'tags' });
    };
    loadCommand(commandPath, commandName) {
        try {
            if (commandName === 'command.js') return;
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            console.log(`Loaded Command: ${props.help.name} | Aliases: [${props.conf.aliases.join(', ')}]`);
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            if (commandName === 'command.js') return;
            return (`Unable to load command ${commandName}: ${e.message}`);
        };
    };
    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` is not recognized by the bot.`;

        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    };
};

const client = new Bot({ disabledEveryone: true });
const init = async () => {
    klaw("./commands").on("data", (item) => {
        const cmdFile = path.parse(item.path);
        if (!cmdFile.ext || cmdFile.ext !== ".js") return;
        const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
        if (response) console.error(response);
    });
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(`Loaded the event ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
};

init();

client.login(process.env.TOKEN);
process.on('unhandledRejection', error => {
    console.error(`Uncaught Promise Error: \n${error.stack}`);
});