import axios from 'axios';

import assetsMain from '../services/compound/assets';
import assetsRinkeby from '../services/compound/assets.rinkeby';

const getAssets = (nid) => {
  switch (nid) {
    case "1" || 1:
      return assetsMain;
    
    case "4" || 4:
      return assetsRinkeby;
    
    default:
      return null;
  }
}

const etherscanBalanceUrl = (networkId, assetAddr, acctAddr) => {
  let rinkeby = "";
  if (networkId === 4) {
    rinkeby = "-rinkeby";
  }
  return `https://api${rinkeby}.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${assetAddr}&address=${acctAddr}&tag=latest&apikey=${process.env.ETHERSCAN_KEY}`
};

export const getBalance = async (req, res) => {
  const { account, ticker } = req.params;
  const { networkId } = req.query;

  if (!ticker || !account) {
    res.status(400).send("Invalid parameters");
    return;
  }
  if (!networkId) {
    res.status(400).send("Must provide networkId in query");
    return;
  }

  const assets = getAssets(networkId);
  if (!assets) {
    res.status(400).send("Invalid networkId");
    return;
  }
  const asset = assets.filter(a => a.ticker === ticker);
  if (!asset[0]) {
    res.status(400).send("Invalid ticker");
    return;
  }

  const url = etherscanBalanceUrl(networkId, asset[0].address, account);

  const balance = await axios.get(url)
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    })
    .then((resp) => {
      return resp.data;
    });
  
  if (balance.status !== 0) {
    res.send(balance.result);
  } else {
    res.status(400).send(balance.result);
  }
  return;
}
