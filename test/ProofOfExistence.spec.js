const PoE = artifacts.require("./ProofOfExistence.sol");
const crypto = require("crypto");
const chai = require("chai");

const id1 = 1;
const doc1 = "Some document";
const docHash1 = sha256AsHexString(doc1);

const id2 = 2;
const doc2 = "Some other document";
const docHash2 = sha256AsHexString(doc2);

function sha256AsHexString(doc) {
    return "0x" + crypto.createHash("sha256").update(doc, "utf8").digest("hex");
}

describe("Proof Of Existence", () => {
    contract("fresh contract: happy path", () => {
        it("should provide proof that a hash was submitted with a given ID", async () => {
            const poe = await PoE.deployed();
            await poe.notarizeHash(id1, docHash1);
            const valid = await poe.doesProofExist(id1, docHash1);

            chai.expect(valid).is.true;
        });
    });
    
    contract("fresh contract: happy path", () => {
        it("should accept multiple hashes if IDs are different", async () => {
            const poe = await PoE.deployed();
            await poe.notarizeHash(id1, docHash1);
            await poe.notarizeHash(id2, docHash2);
            const valid1 = await poe.doesProofExist(id1, docHash1);
            const valid2 = await poe.doesProofExist(id2, docHash2);
        
            chai.expect(valid1).is.true;
            chai.expect(valid2).is.true;
        });
    });

    contract("fresh contract: fail proof", () => {
        it("should fail proof if the submitted hash is different from the supplied one for the same ID", async () => {
            const poe = await PoE.deployed();
            await poe.notarizeHash(id1, docHash1);
            const valid = await poe.doesProofExist(id1, docHash2);

            chai.expect(valid).is.false;
        });

        it("should fail proof if no hash was submitted for an ID", async () => {
            const poe = await PoE.deployed();
            const valid = await poe.doesProofExist(id2, docHash1);

            chai.expect(valid).is.false;
        });
    });

    contract("fresh contract: no overwrite", () => {
        it("should reject a hash if one is already stored for the supplied id", async () => {
            const poe = await PoE.deployed();
            await poe.notarizeHash(id1, docHash1);
            chai.expect(poe.notarizeHash.bind(poe, id1, docHash1)).to.throw;
        });
    });

    contract("fresh contract: only owner", (accounts) => {
        // contract is created from accounts[0]
        it("should only allow contract creator to add hashes", async () => {
            const poe = await PoE.deployed();
            await poe.notarizeHash(id1, docHash1, {from: accounts[0]});
            chai.expect(poe.notarizeHash.bind(poe, id2, docHash2, {from: accounts[1]})).to.throw;
        });
    });

});
