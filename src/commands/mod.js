const { Command, flags } = require("@oclif/command");
const Items = require("warframe-items");
const Table = require("cli-table3");
const chalk = require("chalk");
const columns = require("cli-columns");

class ModCommand extends Command {
  static args = [
    {
      name: "mod-name",
      required: true,
      description: "Name of the mod you are searching",
    },
  ];

  mods = new Items({ category: ["Mods"] });
  async run() {
    const { args, flags } = this.parse(ModCommand);
    const table = new Table();
    const mod = this.mods.find((mod) => {
      return mod.name === args["mod-name"];
    });
    if (mod) {
      table.push(
        [{ content: chalk.yellow(mod.name), colSpan: 2, hAlign: "center" }],
        { "Mod Polarity": mod.polarity },
        { "Mod Rarity": mod.rarity },
        { "Base Drain": mod.baseDrain },
        { "Max Rank": mod.fusionLimit },
        { "Max Drain": mod.baseDrain + mod.fusionLimit },
        { "Mod Type": mod.type }
      );
      this.log(table.toString());

      if (flags.drops) {
        if (mod.hasOwnProperty("drops")) {
          this.log(chalk.red("DROPS FROM :"));
          let drops = [];
          mod.drops.forEach((drop) => {
            let chance = drop.chance * 100;
            drops.push(
              drop.location +
                " - " +
                drop.rarity +
                "(" +
                chance.toFixed(2).toString() +
                "%)"
            );
          });
          this.log(columns(drops));
        }
      }

      if (flags.stats) {
        if (mod.hasOwnProperty("levelStats")) {
          let levels = new Table();
          levels.push([
            { content: chalk.redBright("Stats"), colSpan: 2, hAlign: "center" },
          ]);
          mod.levelStats.forEach((key, index) => {
            levels.push([
              { content: `Level ${index}` },
              { content: key["stats"].join(",") },
            ]);
          });
          this.log(levels.toString());
        }
      }
    } else {
      this.log(chalk.bgRedBright.whiteBright("MOD NOT FOUND"));
    }
  }
}

ModCommand.description = `Get details of a mod in warframe`;

ModCommand.flags = {
  help: flags.help({ char: "h", description: "Help for command" }),
  stats: flags.boolean({
    char: "s",
    description: "Shows the stats of the mod.",
  }),
  drops: flags.boolean({
    char: "d",
    description: "Shows the drop locations for the mod(if any)",
  }),
};

module.exports = ModCommand;
