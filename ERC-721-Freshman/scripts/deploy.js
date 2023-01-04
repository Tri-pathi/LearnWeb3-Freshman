// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers} = require("hardhat");

async function main() {
  const nftContractFactory=await ethers.getContractFactory("NFTee");
  const nftContract=await nftContractFactory.deploy();
  await nftContract.deployed();

  console.log(`ERC721 NFT Contract address is ${nftContract.address}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



//deployed contract address in goerli=0x518d0154B56498dF73FDd6190BB1a1220ce07e1A