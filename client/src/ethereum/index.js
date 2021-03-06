import Web3 from 'web3';

export const web3 = (Web3.givenProvider) ? new Web3(Web3.givenProvider) : null;

export const ethereum = window.ethereum;

// TODO: switch statement for networks we support

export const connectProvider = async () => {
  // Only allow connection to networks that we support
  if ((ethereum.networkVersion === "1")
      || (ethereum.networkVersion === "4")) {
    const connected = ethereum.enable()
      .catch((reason) => {
        console.error(reason);
        return false;
      })
      .then(() => {
        // Force an update to the listener
        ethereum.emit("update");
        return true;
      });
    return connected;
  } else {
    return false;
  }
}

export const ethereumListener = (fun) => {
  ethereum.on('update', () => {
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
