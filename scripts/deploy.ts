import { ethers } from "@nomiclabs/buidler";

async function main() {
  const Binotti = await ethers.getContractFactory("Binotti");
  const binotti = await Binotti.deploy();

  await binotti.deployed();

  console.log("Binotti contract deployed to:", binotti.address);
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
