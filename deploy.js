const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const accountMnemonic = 'twist omit west bind cloth now round web hurry tomorrow swallow hedgehog';
const networkURL = 'https://rinkeby.infura.io/v3/7a18cd68f3ea4ad083eff69e644771d3';

const provider = new HDWalletProvider(
    accountMnemonic,
    networkURL
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const fromAcc = accounts[0];

    console.log(`Attempting to deploy from account: ${fromAcc}`);
    
    const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!']})
    .send({ gas: '1000000', from: fromAcc})

    console.log(`Contract deployed to: ${result.options.address}`)

    provider.engine.stop();
};

deploy();