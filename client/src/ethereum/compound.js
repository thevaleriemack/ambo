import { web3 } from './index';

import moneyMarket from './contracts/MoneyMarket';

const contractAbi = moneyMarket.abi;

const contractAddress = moneyMarket.networks[1].address;
const contractAddressRinkeby = moneyMarket.networks[4].address;

const MoneyMarket = (web3) ? new web3.eth.Contract(
  contractAbi,
  contractAddress
) : null;
const MoneyMarketRinkeby = (web3) ? new web3.eth.Contract(
  contractAbi,
  contractAddressRinkeby
) : null;

const getContractInstance = (nid) => {
  switch (nid) {
    case "1" || 1:
      return MoneyMarket;
    
    case "4" || 4:
      return MoneyMarketRinkeby;
    
    default:
      return null;
  }
}

export const lend = async (networkId, from, assetAddr, amt) => {
  const Contract = getContractInstance(networkId);
  
  if (Contract !== null) {
    const result = await Contract.methods.supply(assetAddr, amt)
      .send({ from })
      .on('transactionHash', (txHash) => {
        console.log(`https://etherscan.io/tx/${txHash}`);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
    return result;
  } else {
    console.error("No valid contract");
    return false;
  }
}

export const borrow = (networkId, from, assetAddr, amt) => {
  const Contract = getContractInstance(networkId);

  if (Contract !== null) {
    Contract.methods.borrow(assetAddr, amt)
      .send({ from })
      .on('transactionHash', (txHash) => {
        console.log(`https://etherscan.io/tx/${txHash}`);
      });
  } else {
    console.error("No valid contract");
    // error
  }
}
