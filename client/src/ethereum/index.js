import Web3 from 'web3';

export const web3 = new Web3(
  Web3.givenProvider || "ws://localhost:8546"
);

export const ethereum = window.ethereum;

export const connectProvider = async () => {
  const connected = ethereum.enable()
    .catch((reason) => {
      console.error(reason);
      return false;
    })
    .then(() => { return true; });
  return connected;
}

export const ethereumListener = (fun) => {
  ethereum.publicConfigStore.on('update', () => {
    fun();
  });
}

export const getAddress = () => {
  return ethereum.selectedAddress;
}

export const getNetworkId = () => {
  return ethereum.networkVersion;
}

export const getBlockTimestamp = () => {
  if (ethereum) {
    const blockHeader = web3.eth.getBlock("latest", (err, block) => {
      if (err) {
        console.error(err);
        return null;
      }
      return block;
    });
    return blockHeader;
  } else {
    console.warn("Ethereum provider was not detected")
    return null;
  }
}
