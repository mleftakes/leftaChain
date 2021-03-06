const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "07/23/2018", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let mikeChain = new Blockchain();
mikeChain.addBlock(new Block(1, "07/23/2018", { amount: 4 }));
mikeChain.addBlock(new Block(2, "07/23/2018", { amount: 10 }));
mikeChain.addBlock(new Block(2, "07/23/2018", { amount: 25 }));
mikeChain.addBlock(new Block(2, "07/23/2018", { amount: 54 }));
mikeChain.addBlock(new Block(2, "07/23/2018", { amount: 340 }));
mikeChain.addBlock(new Block(2, "07/23/2018", { amount: 310 }));
mikeChain.addBlock(new Block(2, "07/23/2018", { amount: 2210 }));

console.log("Is blockchian valid? " + mikeChain.isChainValid());

console.log(JSON.stringify(mikeChain, null, 4));
