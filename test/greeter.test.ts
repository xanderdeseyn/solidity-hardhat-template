const { expect } = require("chai");
import bre from "@nomiclabs/buidler";
import { Greeter } from "../types/Greeter";

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async function() {
    const GreeterFactory = await bre.ethers.getContractFactory("Greeter");
    const greeter = (await GreeterFactory.deploy("Hello, world!")) as Greeter;

    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
