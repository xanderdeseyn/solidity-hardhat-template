import { task, usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config";

usePlugin("@nomiclabs/buidler-waffle");
usePlugin("buidler-typechain");

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

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
const config: BuidlerConfig = {
  defaultNetwork: "localhost",
  // This is a sample solc configuration that specifies which version of solc to use
  solc: {
    version: "0.7.3",
  },
};

export default config;
