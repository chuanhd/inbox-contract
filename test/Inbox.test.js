const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let contract;
const initialMessage = 'Hi there!';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those account to deploy the contract
    contract = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: [initialMessage]})
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(contract.options.address);
    });

    it('has a default message', async () => {
        const message = await contract.methods.message().call();
        assert.equal(message, initialMessage);
    });

    it('can change the message', async () => {
       await contract.methods.setMessage('bye').send({ from: accounts[0] });
       const message = await contract.methods.message().call();
        assert.equal(message, 'bye');
    });
});