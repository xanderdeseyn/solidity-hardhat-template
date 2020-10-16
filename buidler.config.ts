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

// Go to https://buidler.dev/config/ to learn more
const config: BuidlerConfig = {
  defaultNetwork: "localhost",
  solc: {
    version: "0.7.3",
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
};

export default config;
