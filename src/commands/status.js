const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const inquirer = require("inquirer");
const axios = require("axios");
const Table = require("cli-table3");
const chalk = require("chalk");

class StatusCommand extends Command {
  async run() {
    const { flags } = this.parse(StatusCommand);
    let query = flags.query;
    if (!flags.query) {
      let responses = await inquirer.prompt([
        {
          name: "query",
          message: "Select what you want to know.",
          type: "list",
          choices: [{ name: "baro" }, { name: "cycle" }, { name: "sortie" }],
        },
      ]);
      query = responses.query;
    }
    cli.action.start("Loading data");
    const res = await axios.get("https://api.warframestat.us/pc");
    let worldStateData = res.data;
    let table = new Table();
    // Day/Night Cycle
    if (query === "cycle") {
      let { earthCycle, cetusCycle, vallisCycle } = worldStateData;
      table.push(
        [
          { content: "Earth Cycle", colSpan: 2, hAlign: "center" },
          { content: "Cetus Cycle", colSpan: 2, hAlign: "center" },
          { content: "Vallis Cycle", colSpan: 2, hAlign: "center" },
        ],
        [
          { content: "Status", hAlign: "right" },
          { content: earthCycle.state.toUpperCase(), hAlign: "left" },
          { content: "Status", hAlign: "right" },
          { content: cetusCycle.state.toUpperCase(), hAlign: "left" },
          { content: "Status", hAlign: "right" },
          { content: vallisCycle.state.toUpperCase(), hAlign: "left" },
        ],
        [
          { content: "Time Left", hAlign: "right" },
          { content: earthCycle.timeLeft, hAlign: "left" },
          { content: "Time Left", hAlign: "right" },
          { content: cetusCycle.timeLeft, hAlign: "left" },
          { content: "Time Left", hAlign: "right" },
          { content: vallisCycle.timeLeft, hAlign: "left" },
        ]
      );
      cli.action.stop();
      this.log(table.toString());
    } else if (query === "baro") {
      const { voidTrader } = worldStateData;
      if (!voidTrader.active) {
        table.push(
          [{ content: "Baro Information", colSpan: 2, hAlign: "center" }],
          { Status: "Not Active" },
          { "Coming In": voidTrader.startString }
        );
        cli.action.stop();
        this.log(table.toString());
      } else {
        //TODO: Wait till BARO arrives and get the ineventory structure from the api
        console.log(voidTrader.inventory);
      }
    } else if (query === "sortie") {
      const { sortie } = worldStateData;
      if (!sortie.active) {
        this.log("No sortie is currently active");
      } else {
        const { variants } = sortie;
        variants.forEach((variant, index) => {
          table.push(
            [{ content: `Sortie ${index + 1}`, colSpan: 2, hAlign: "center" }],
            [{ content: "Modifier" }, { content: variant.modifier }],
            [{ content: "Mission Type" }, { content: variant.missionType }],
            [{ content: "Node" }, { content: variant.node }]
          );
        });
        table.push([
          {
            content: chalk.redBright(sortie.boss),
            colSpan: 2,
            hAlign: "center",
          },
        ]);
        cli.action.stop();
        this.log(table.toString());
      }
    }
  }
}

StatusCommand.description = `This command shows the status of the Warframe WorldState`;

StatusCommand.flags = {
  query: flags.string({
    char: "q",
    description: "option to get the details for",
    options: ["baro", "cycle", "sortie"],
  }),
  help: flags.help({ char: "h", description: "Get help for this command" }),
};

module.exports = StatusCommand;
