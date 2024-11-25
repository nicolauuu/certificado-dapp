async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Deploy do CertificateContract
    const CertificateContract = await ethers.getContractFactory("CertificateContract");
    const contract = await CertificateContract.deploy();
    console.log("CertificateContract deployed to:", contract.target);

    // Deploy do CertiToken
    const CertiToken = await ethers.getContractFactory("CertiToken");
    const initialOwner = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    const certiToken = await CertiToken.deploy(initialOwner);
    console.log("CertiToken deployed to:", certiToken.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });