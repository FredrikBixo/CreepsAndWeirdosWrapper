// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const DadaCollectible = await ethers.getContractFactory("DadaCollectible");
  const dadaToken = await DadaCollectible.deploy();
  await dadaToken.deployed();

  const DadaCollectibleWrapper = await ethers.getContractFactory("DadaCollectibleWrapper");
  const dadaWrapper = await DadaCollectibleWrapper.deploy(dadaToken.address);
  await dadaWrapper.deployed();

  //console.log("DadaCollectible address:", dadaToken.address);
  console.log("DadaCollectibleWrapper address:", dadaWrapper.address);

  await dadaToken.newCollectible(1,"hey",100,0,1,"hey", 1, "100");
  await dadaToken.alt_buyCollectible(1,1);
  await dadaToken.offerCollectibleForSaleToAddress(1,1,0,dadaWrapper.address);
  await dadaWrapper.wrap(1,1);


  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(dadaToken, dadaWrapper);
}

function saveFrontendFiles(token, wrapper) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  fs.writeFileSync(
    contractsDir + "/wrapper-contract-address.json",
    JSON.stringify({ Token: wrapper.address }, undefined, 2)
  );

  const WrapperTokenArtifact = artifacts.readArtifactSync("DadaCollectibleWrapper");
  fs.writeFileSync(
    contractsDir + "/DadaCollectibleWrapper.json",
    JSON.stringify(WrapperTokenArtifact, null, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("DadaCollectible");

  fs.writeFileSync(
    contractsDir + "/DadaCollectible.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
