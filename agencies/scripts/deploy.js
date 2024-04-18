const hre = require("hardhat");

async function main() {
  const Wastelisting = await hre.ethers.getContractFactory("wastelisting"); //fetching bytecode and ABI
  const wastelisting = await Wastelisting.deploy(); //creating an instance of our smart contract

  await wastelisting.deployed();//deploying your smart contract

  console.log("Deployed contract address:",`${wastelisting.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0xeB34b4372bDA34df67B16189Aa1dca75E821663A