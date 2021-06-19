// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//const hre = require("hardhat");

import { ethers, deployments, getNamedAccounts } from "hardhat";

async function mainz() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  await deployments.fixture(["Token"]);

  const { tokenOwner } = await getNamedAccounts();

  const Token = await ethers.getContractAt(
    "Token",
    "0x7C3e3169d3F50F7c71Ee9fB4fB9431e07cDe1620"
  );
  const test = await Token.totalSupply();

  console.log("Token supply:", test);
  console.log("Token owner", tokenOwner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
mainz()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
