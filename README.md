# Proof Of Existence Ethereum Smart Contract

## Why
Prove that a document existed at some point.

## What
This smart contract stores hash values keyed by a numeric ID on the Ethereum blockchain. Only the contract creator (owner) is allowed to add hashes but anyone can verify a hash.

## Prerequisites
Understanding Ethereum and Smart Contracts:
- http://www.lawandblockchain.eu/what-is-ethereum/
- https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369

Basic understanding of Solidity: 
- https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html

Experience with Javascript

## Getting Started
1. Install node/npm
1. `npm install -g truffle`
2. Check out this repo and `cd` into it
2. `npm install`
2. `truffle develop` starts an in-memory Ethereum blockchain (uses [test-rpc](https://github.com/ethereumjs/testrpc) under the hood) with "immediate mining" ideal for testing and opens a console
3. `test` automatically compiles [ProofOfExistence.sol](contracts/ProofOfExistence.sol), migrates in to your local test chain, and executes [ProofOfExistence.spec.js test](test/ProofOfExistence.spec.js)

## What's Missing
Documentation and configuration to deploy the contract to Ethereum testnets or live.

## Help And Further Reading
- [Truffle Docs](http://truffleframework.com/docs)
- https://blog.zeppelin.solutions/the-hitchhikers-guide-to-smart-contracts-in-ethereum-848f08001f05
- [truffle-contract](https://github.com/trufflesuite/truffle-contract) is a handy contract abstraction that makes 
interacting with a contract more convenient than using web3 directly
- [Infura](https://infura.io/) is a hosted Ethereum node cluster so you don't have to run your own client/node when deploying to Ethereum's test or live networks.
[How to configure truffle to use Infura](http://truffleframework.com/tutorials/using-infura-custom-provider)
- [Security considerations when coding Smart Contracts with Solidity](https://blog.zeppelin.solutions/onward-with-ethereum-smart-contract-security-97a827e47702)
