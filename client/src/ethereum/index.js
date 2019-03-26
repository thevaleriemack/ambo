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
