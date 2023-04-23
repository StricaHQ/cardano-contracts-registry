<p align="center">
  <a href="https://strica.io/" target="_blank">
    <img src="https://docs.strica.io/images/logo.png" width="200">
  </a>
</p>

# Cardano Contracts Registry

This is an off-chain registry to maintain labels, audits, and metadata for the dApps on Cardano. Please create or update your dApp project file to update the information on the Cardanoscan Explorer.

- [How to create a new entry?](#how-to-create-a-new-entry-)
  + [1. Fork and clone this repo](#1-fork-and-clone-this-repo)
  + [2. create a new file under `projects` folder for your project](#2-create-a-new-file-under--projects--folder-for-your-project)
  + [3. Add the meta details](#3-add-the-meta-details)
  + [4. Add contracts details](#4-add-contracts-details)
  + [5. Validate your changes](#5-validate-your-changes)
  + [6. Create a pull request](#6-create-a-pull-request)
  + [7. Send us the pull request link!](#7-send-us-the-pull-request-link-)
- [Specification Guide](#specification-guide)
  + [dApp](#dapp)
  + [Contract](#contract)
  + [Audit](#audit)
  + [Examples](#examples)

## How to create a new entry?

### 1. Fork and clone this repo

[Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this repo and clone a local copy

### 2. create a new file under `projects` folder for your project

- eg. if your project name is, The Perfect Dex
- create a file named, thePerfectDex.json

### 3. Add the meta details

`thePerfectDex.json`

```json
{
  "projectName": "The Perfect Dex",
  "labelPrefix": "Perfect Dex",
  "website": "https://theperfectdex.com",
  "twitter": "theperfectdex",
  "discord": "https://discord.com/theperfectdex",
  "category": "DEX", // DEX, DEFI, REALFI, MARKETPLACE, NFT, GAMING, TOKEN, ORACLE
  "description": "Low fees, fully decentralized Cardano dex"
}
```

### 4. Add contracts details

`thePerfectDex.json`

```json
{
  "projectName": "The Perfect Dex",
  "labelPrefix": "Perfect Dex",
  "website": "https://theperfectdex.com",
  "twitter": "theperfectdex",
  "discord": "https://discord.com/theperfectdex",
  "category": "DEX",
  "description": "Low fees, fully decentralized Cardano dex",

  // add contracts as per below spec
  "contracts": [
    {
      "name": "Order Contract",
      "version": 1,
      "language": "PLUTUS", // PLUTUS, NATIVESCRIPT
      "languageVersion": 1,
      "scriptHash": "db32e243255f840792f922346c197c8e03f429c32fff30db18a627e9",
      "github": "https://github.com/awesomedex/order-contract",
      "description": "Description of this contract",
      "audit": [
        {
          "provider": "Secure Z",
          "report": "https://securez.com/thePerfectDexReport",
          "date": "DD-MM-YYYY"
        }
      ]
    },
    {
      "name": "Harvest Contract",
      "version": 2,
      "language": "PLUTUS",
      "languageVersion": 1,
      "scriptHash": "db32e243255f840792f922346c197c8e03f429c32fff30db18a627e9",
      "github": "https://github.com/awesomedex/order-contract",
      "description": "Description of this contract"
    }
  ]
}
```

### 5. Validate your changes
Please execute `npm run validate` to verify your changes, this will ensure that your changes follow the spec defined in the [Specification Guide](#specification-guide).
### 6. Create a pull request

Commit your changes, and create a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork)

### 7. Send us the pull request link!

To help us verify the authenticity of the pull request please send us the pull request link via a dm from your official twitter at @cardanoscan.io or send us an email on contact@cardanoscan.io from your official email address.

---

## Specification Guide

The `labelPrefix` and `contracts.name` field is used in conjunction to form a label. See below for field limits and examples,

### dApp
---

| Field       | Max Char Limit |          |
| :---------- | :------------- | :------- |
| projectName | 30             | Required |
| labelPrefix | 16             | Required |
| website     | 35             | Optional |
| twitter     | 16             | Optional |
| discord     | 40             | Optional |
| description | 140            | Optional |

---

### Contract
| Field | Max Char Limit | |
|:------|:---------------|:---------|
| name | 45 | Required |
| version | numeric | Required |
| languageVersion | numeric | Required |
| scriptHash| 56 | Required |
| github | 80 | Optional |
| description | 140 | Optional |
| audit | | Optional |

You can visit [Cardanoscan Address Inspector](https://cardanoscan.io/addressInspector) to extract `scriptHash` (paymentCredential) from an address. 

---
### Audit
| Field | Max Char Limit | |
|:------|:---------------|:---------|
| provider | 20 | Required |
| report | 120 | Required |
| date | DD-MM-YYYY | Required |

---

### Examples

```json
{
  "labelPrefix": "Perfect Dex",
  "contract": {
    "name": "Order Contract"
  }
}
```

The resulting label is -> `Perfect Dex Order Contract`

If your contract does not have a specific name, you can use a generic name eg. `contract`. The explorer will show version number along with labels

```json
{
  "labelPrefix": "Perfect Dex",
  "contract": {
    "name": "Contract"
  }
}
```
The resulting label is -> `Perfect Dex Contract`

---