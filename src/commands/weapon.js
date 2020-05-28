const { Command, flags } = require("@oclif/command");
const Items = require("warframe-items");
const Table = require("cli-table3");
const chalk = require("chalk");

class WeaponCommand extends Command {
  static args = [
    {
      name: "name",
      required: true,
      description: "Name of the weapon",
    },
  ];
  async run() {
    const { args, flags } = this.parse(WeaponCommand);
    const weapons = new Items({ category: [flags.type] });
    const weapon = weapons.find((w) => {
      return w.name.toLowerCase() === args["name"].toLowerCase();
    });
    let table = new Table();
    /**
     * Common props
     * name
     * secondsPerShot
     * totalDamage
     * damagePerSecond
     * description
     * criticalChance
     * criticalMultiplier
     * procChance
     * buildPrice
     * buildTime
     */

    table.push(
      [
        {
          content: chalk.yellowBright(weapon.name),
          colSpan: 2,
          hAlign: "center",
        },
      ],
      ["Time Per Attack", weapon.secondsPerShot.toFixed(2) + "s"],
      ["Total Damage", weapon.totalDamage],
      [
        "Crit Chance",
        `${(weapon.criticalChance * 100).toFixed(2).toString()}%`,
      ],
      ["Crit Multi", weapon.criticalMultiplier]
    );

    if (flags.type === "Primary") {
      /**
       * secondsPerShot
       * magazineSize
       * noise
       * reloadTime
       * Unique props
       * fireRate
       * accuracy
       */
    } else if (flags.type === "Secondary") {
    } else if (flags.type === "Meleee") {
    }
    this.log(table.toString());
  }
}

WeaponCommand.description = `Get details of various weapons`;

WeaponCommand.flags = {
  help: flags.help({ char: "h", description: "Know more about the command" }),
  type: flags.string({
    char: "t",
    description:
      "Specify the type of the weapon [Melee='m', Primary='p', Secondary='s']",
    options: ["m", "p", "s"],
    required: true,
    parse: (input) => {
      switch (input) {
        case "m":
          return "Melee";
        case "s":
          return "Secondary";
        case "p":
          return "Primary";
      }
    },
  }),
};

module.exports = WeaponCommand;
