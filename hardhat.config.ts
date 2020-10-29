import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    const address = await account.getAddress();
    const tx = await account.getTransactionCount();
    const balance = await account.getBalance();
    console.log(
      `${address} | ${tx} transactions | ${bre.ethers.utils.formatEther(
        balance
      )} ETH`
    );
  }
});

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  solidity: {
    version: "0.7.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};

export default config;
