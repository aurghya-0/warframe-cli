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
@aurghyadip/warframe-cli/0.1.0 darwin-x64 node-v12.16.3
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
* [`wfcli warframe`](#wfcli-warframe)

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
  -n, --name=name  name to print
```

_See code: [src/commands/mod.js](https://github.com/aurghya-0/warframe-cli/blob/v0.1.0/src/commands/mod.js)_

## `wfcli warframe`

Describe the command here

```
USAGE
  $ wfcli warframe

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/warframe.js](https://github.com/aurghya-0/warframe-cli/blob/v0.1.0/src/commands/warframe.js)_
<!-- commandsstop -->
