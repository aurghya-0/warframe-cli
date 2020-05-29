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
    table.push(
      [
        {
          content: chalk.yellowBright(weapon.name),
          colSpan: 2,
          hAlign: "center",
        },
      ],
      ["Mastery Requirement", weapon.masteryReq],
      ["Time Per Attack", weapon.secondsPerShot.toFixed(2) + "s"],
      ["Total Damage", weapon.totalDamage],
      ["DPS", weapon.damagePerSecond],
      [
        "Crit Chance",
        `${(weapon.criticalChance * 100).toFixed(2).toString()}%`,
      ],
      ["Crit Multi", weapon.criticalMultiplier],
      ["Status Chance", `${(weapon.procChance * 100).toFixed(2)}%`],
      ["Build Price", weapon.buildPrice + " credits"],
      ["Build Time", `${weapon.buildTime / (60 * 60)} Hours`]
    );

    if (flags.type === "Primary") {
      table.push(
        [
          {
            content: chalk.bgBlueBright.whiteBright("Primary Weapon Details"),
            colSpan: 2,
            hAlign: "center",
          },
        ],
        ["Magazine Size", weapon.magazineSize],
        ["Noise", weapon.noise],
        ["Trigger", weapon.trigger],
        ["Multishot", weapon.multishot],
        ["Reload Time", weapon.reloadTime],
        ["Magazine Size", weapon.magazineSize]
      );
    } else if (flags.type === "Secondary") {
      table.push(
        [
          {
            content: chalk.bgMagentaBright.whiteBright(
              "Secondary Weapon Details"
            ),
            colSpan: 2,
            hAlign: "center",
          },
        ],
        ["Magazine Size", weapon.magazineSize],
        ["Noise", weapon.noise],
        ["Trigger", weapon.trigger],
        ["Multishot", weapon.multishot],
        ["Reload Time", weapon.reloadTime],
        ["Magazine Size", weapon.magazineSize]
      );
    } else if (flags.type === "Melee") {
      // "range": 2.5,
      // "slamAttack": 447,
      // "slamRadialDamage": 149,
      // "slamRadius": 7,
      // "slideAttack": 149,
      // "heavyAttackDamage": 745,
      // "heavySlamAttack": 596,
      // "heavySlamRadialDamage": 596,
      // "heavySlamRadius": 8,
      table.push(
        [
          {
            content: chalk.bgRedBright.whiteBright("Melee Weapon Details"),
            colSpan: 2,
            hAlign: "center",
          },
        ],
        ["Slam Attack Damage", weapon.slamAttack],
        ["Range", weapon.range.toFixed(2) + " mtrs"],
        ["Slam Radius", weapon.slamRadius + " mtrs"],
        ["Slide Attack Damage", weapon.slideAttack],
        ["Heavy Attack Damage", weapon.heavyAttackDamage],
        ["Heavy Slam Damage", weapon.heavySlamAttack],
        ["Heavy Slam Radius", weapon.heavySlamRadius.toFixed(2) + " mtrs"]
      );
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
