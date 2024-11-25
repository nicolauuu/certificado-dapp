const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateContract - newCertificate Function", function () {
  let CertificateContract;
  let certificateContract;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Obter os endereços e preparar o contrato
    [owner, addr1] = await ethers.getSigners();
    CertificateContract = await ethers.getContractFactory("CertificateContract");
    certificateContract = await CertificateContract.deploy();
    await certificateContract.deployed();

    // Adicionar um writter válido antes de testar a emissão de certificados
    await certificateContract.newWritter("sign1", "user1");
  });

  it("Deve emitir um certificado com sucesso", async function () {
    const writterSign = "sign1";
    const userId = "user1";
    const certificate = "cert1";
    const studentId = "student1";

    const tx = await certificateContract.newCertificate(writterSign, userId, certificate, studentId);
    await tx.wait();

    const storedStudentId = await certificateContract.certificates(certificate);
    expect(storedStudentId).to.equal(studentId); // Verificar se o certificado foi registrado corretamente
  });

  it("Não deve emitir certificado para writter não autorizado", async function () {
    const writterSign = "invalidSign";
    const userId = "user1";
    const certificate = "cert1";
    const studentId = "student1";

    await expect(
      certificateContract.newCertificate(writterSign, userId, certificate, studentId)
    ).to.be.revertedWith("No authorized sign"); // Verificar a mensagem de erro
  });

  it("Não deve emitir certificado se userId do writter não corresponder", async function () {
    const writterSign = "sign1";
    const userId = "wrongUser";
    const certificate = "cert1";
    const studentId = "student1";

    await expect(
      certificateContract.newCertificate(writterSign, userId, certificate, studentId)
    ).to.be.revertedWith("No authorized sign"); // Verificar a mensagem de erro
  });

  it("Deve atualizar corretamente o tamanho da lista de certificados", async function () {
    const writterSign = "sign1";
    const userId = "user1";
    const certificate = "cert1";
    const studentId = "student1";

    const initialSize = await certificateContract.certificatesSize();
    expect(initialSize).to.equal(0); // Tamanho inicial deve ser zero

    await certificateContract.newCertificate(writterSign, userId, certificate, studentId);
    const updatedSize = await certificateContract.certificatesSize();

    expect(updatedSize).to.equal(1); // Tamanho deve ser incrementado após emitir o certificado
  });
});
