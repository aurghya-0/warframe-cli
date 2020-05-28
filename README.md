@aurghyadip/warframe-cli
========================

Warframe CLI for the devs who love warframe and also players who would like to get an insight right from the terminal.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@aurghyadip/warframe-cli.svg)](https://npmjs.org/package/@aurghyadip/warframe-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@aurghyadip/warframe-cli.svg)](https://npmjs.org/package/@aurghyadip/warframe-cli)
[![License](https://img.shields.io/npm/l/@aurghyadip/warframe-cli.svg)](https://github.com/aurghya-0/warframe-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @aurghyadip/warframe-cli
$ wfcli COMMAND
running command...
$ wfcli (-v|--version|version)
@aurghyadip/warframe-cli/0.5.29 darwin-x64 node-v12.16.3
$ wfcli --help [COMMAND]
USAGE
  $ wfcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wfcli help [COMMAND]`](#wfcli-help-command)
* [`wfcli mod MOD-NAME`](#wfcli-mod-mod-name)
* [`wfcli warframe NAME`](#wfcli-warframe-name)

## `wfcli help [COMMAND]`

display help for wfcli

```
USAGE
  $ wfcli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.1/src/commands/help.ts)_

## `wfcli mod MOD-NAME`

Get details of a mod in warframe

```
USAGE
  $ wfcli mod MOD-NAME

ARGUMENTS
  MOD-NAME  Name of the mod you are searching

OPTIONS
  -d, --drops  Shows the drop locations for the mod(if any)
  -h, --help   Help for command
  -s, --stats  Shows the stats of the mod.
```

_See code: [src/commands/mod.js](https://github.com/aurghya-0/warframe-cli/blob/v0.5.29/src/commands/mod.js)_

## `wfcli warframe NAME`

Get details of an Warframe

```
USAGE
  $ wfcli warframe NAME

ARGUMENTS
  NAME  Warframe Name, required

OPTIONS
  -a, --abilities   Show abilities
  -c, --components  Show the components required to build, disables other commands
  -d, --details     Show stats
  -h, --help        Show help for this command
```

_See code: [src/commands/warframe.js](https://github.com/aurghya-0/warframe-cli/blob/v0.5.29/src/commands/warframe.js)_
<!-- commandsstop -->
