const { Command, flags } = require("@oclif/command");
const Items = require("warframe-items");
const Table = require("cli-table3");
const chalk = require("chalk");

class WarframeCommand extends Command {
  static args = [
    {
      name: "name",
      required: true,
      description: "Warframe Name, required",
    },
  ];
  async run() {
    const warframes = new Items({ category: ["Warframes"] });
    const table = new Table();
    const { args, flags } = this.parse(WarframeCommand);
    const warframe = warframes.find((wf) => {
      return wf.name.toLowerCase() === args["name"].toLowerCase();
    });
    if (warframe) {
      if (flags.details) {
        table.push(
          ["Health", warframe.health],
          ["Shield", warframe.shield],
          ["Armor", warframe.armor],
          ["Energy", warframe.power],
          ["Mastery Required", warframe.masteryReq],
          ["Sprint Speed", warframe.sprint],
          ["Aura Polarity", warframe.aura.toUpperCase()],
          ["Polarities", warframe.polarities.join(", ").toUpperCase()],
          ["Build Cost", warframe.buildPrice + " credits"],
          ["Build Time", `${warframe.buildTime / (60 * 60)} Hours`]
        );
      }
      if (flags.components) {
        if (warframe.hasOwnProperty("components")) {
          warframe.components.forEach((component, _index) => {
            let componentString = `${chalk.bgRedBright.whiteBright(
              component.name
            )}\n${component.description}`;
            this.log(componentString);
            if (component.hasOwnProperty("drops")) {
              this.log(chalk.yellow("DROPS FROM :"));
              let drops = new Table();
              drops.push(["Drop Location", "Drop Rarity", "Drop Chance(%)"]);
              component.drops.forEach((drop) => {
                let chance = drop.chance * 100;
                drops.push([
                  drop.location,
                  drop.rarity,
                  chance.toFixed(2).toString(),
                ]);
              });
              this.log(`${drops.toString()}\n`);
            }
          });
        }
      } else {
        this.log(chalk.bgMagentaBright(warframe.name));
        this.log(chalk.bgMagentaBright(warframe.description));
        this.log(table.toString());
        if (flags.abilities && warframe.hasOwnProperty("abilities")) {
          this.log(chalk.bgRedBright.whiteBright("ABILITIES"));
          warframe.abilities.forEach((ability, _index) => {
            let abilityString = `${ability.name}\n${ability.description}\n`;
            this.log(abilityString);
          });
        }
      }
    }
  }
}

WarframeCommand.description = `Get details of an Warframe`;

WarframeCommand.flags = {
  help: flags.help({ char: "h", description: "Show help for this command" }),
  details: flags.boolean({
    char: "d",
    default: true,
    description: "Show stats",
  }),
  abilities: flags.boolean({
    char: "a",
    default: false,
    description: "Show abilities",
  }),
  components: flags.boolean({
    char: "c",
    default: false,
    description:
      "Show the components required to build, disables other commands",
  }),
};

module.exports = WarframeCommand;
