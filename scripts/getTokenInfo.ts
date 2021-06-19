// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//const hre = require("hardhat");

import { ethers, deployments, getNamedAccounts } from "hardhat";

const decimals = 18;

const toWholeCoins: (number) => bigint = (num: number) => {
  return BigInt(num * 10 ** decimals);
};

const fromWholeCoins: (number) => number = (num: number) => {
  return num / 10 ** decimals;
};

async function mainz() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const Binance = "0x287f5877CBE9eABC5B48024c4ab1E43D8b156C86";
  const Test = "0x19706EE4fC287787109471c2d4655096B56375cd";
  const TokenSmartContract = "0xEFD6399D26e88689e798c4E178814f08969D2Ba2";

  await deployments.fixture(["Token"]);

  const Token = await ethers.getContractAt("Token", TokenSmartContract);

  const name = await Token.name();
  const symbol = await Token.symbol();
  const totalSupply = await Token.totalSupply();
  const balance = await Token.balanceOf(Binance);
  const balance2 = await Token.balanceOf(Test);

  console.log("Token:", `${name} (${symbol})`);
  console.log("Token supply:", totalSupply);
  console.log("Balance Binance", fromWholeCoins(balance));
  console.log("Balance Test", fromWholeCoins(balance2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
mainz()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
