# Sample Hardhat Project

Para testar os contratos

1. Execute o servidor hardhat localmente com -> npx hardhat node

2. Em um segundo terminal: realizar o deploy caso seja feito alguma alteração nos contratos
    npx hardhat run scripts/deploy.js --network localhost

2. PARA o CertificateContract -> Em um segundo terminal, realize a importação do contrato para ser ser possível executar as funções dele.
    Desta forma:   
        const CertificateContract = await ethers.getContractFactory("CertificateContract");
        const certificateContract = await CertificateContract.deploy();

    Agora é possível acessar as funções do contrato através de, por exemplo:
        -> Criar um certificado
        await certificateContract.newCertificate("user1", "sign1", "cert1", "student1");

        -> Verificar se o certificado é valido
        const isValid = await certificateContract.validateCertificate("student1", "cert1");
        console.log("Certificado válido?", isValid);


-----------------------


3. Para o CertiToken -> 
const CertiToken = await ethers.getContractFactory("CertiToken");
const [owner] = await ethers.getSigners(); 
const certiToken = await CertiToken.deploy(owner.address);

const studentAddress = "0x2546BcD3c84621e976D8185a91A922aE77ECEc30";
const contractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"; //COLOCA O ADD DO CONTRATO ATUALIZADO

await certiToken.reward(studentAddress);


