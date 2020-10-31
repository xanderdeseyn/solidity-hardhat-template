const { expect } = require("chai");
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { Binotti } from "../types/Binotti";

describe("Binotti", function () {
  it("Should be able to mint and get balance", async function () {
    const provider = new ethers.providers.JsonRpcProvider();
    const signer1 = provider.getSigner(0);
    const signer2 = provider.getSigner(1);

    const address1 = await signer1.getAddress();
    const address2 = await signer2.getAddress();

    const BinottiFactory = await ethers.getContractFactory("Binotti");
    const binotti = (await BinottiFactory.deploy()) as Binotti;

    binotti.connect(signer1);

    await binotti.deployed();
    expect(await binotti.name()).to.equal("Binotti");
    expect(await binotti.symbol()).to.equal("BINO");

    await binotti.setName("Bino");
    expect(await binotti.name()).to.equal("Bino");

    await binotti.setSymbol("BNO");
    expect(await binotti.symbol()).to.equal("BNO");

    await binotti.fallback({ value: 10000 });
    expect(await binotti.getBalance()).to.equal(10000 * 1000);

    const binotti2 = binotti.connect(signer2);
    expect(binotti2.setSymbol("BINO")).to.be.reverted;

    await binotti2.fallback({ value: 500 });
    expect(await binotti2.getBalance()).to.equal(500 * 1000);
    expect(await binotti.balanceOf(address2)).to.equal(500 * 1000);

    await binotti2.transfer(address1, 250 * 1000);
    expect(await binotti2.balanceOf(address2)).to.equal(250 * 1000);
    expect(await binotti2.balanceOf(address1)).to.equal(10250 * 1000);
  });
});
