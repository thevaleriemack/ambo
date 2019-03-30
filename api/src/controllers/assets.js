import axios from 'axios';
import axiosCryptoCompare from '../services/cryptoCompare/HTTPClient';
import assetsMain from '../services/compound/assets';
import assetsRinkeby from '../services/compound/assets.rinkeby';
import currencyCodes from '../utils/currencyCodes';

const tickersArray = assetsMain.map(a => a.lookup);
const tickersString = tickersArray.toString();
const currencyCodesString = currencyCodes.toString();

/**
 * Crypto Compare API endpoints
 */

const cryptoCompareDataUrlBase = 'https://min-api.cryptocompare.com/data';
const priceUrl = (ticker, currency) => (
  `${cryptoCompareDataUrlBase}/price?fsym=${ticker}&tsyms=${currency}`
);
const manyPricesUrl = (tickers, currencies) => (
  `${cryptoCompareDataUrlBase}/pricemulti?fsyms=${tickers}&tsyms=${currencies}`
);
const generalInfoUrl = (tickers) => (
  `${cryptoCompareDataUrlBase}/coin/generalinfo?fsyms=${tickers}&tsym=USD`
);
const cryptoCompareImageUrlBase = 'https://www.cryptocompare.com';

/**
 * Etherscan API endpoints
 */

const etherscanAbiUrl = (assetAddr) => (
  `https://api.etherscan.io/api?module=contract&action=getabi&address=${assetAddr}&apikey=${process.env.ETHERSCAN_KEY}`
);

/**
 * Helpers
 */

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

const handleError = (resp) => {
  if (resp.data.Response === 'Error') {
    console.error(resp.data.Message);
    return null;
  }
}

const axiosCryptoCompareGetData = async (url) => {
  const out = await axiosCryptoCompare.get(url)
    .catch((err) => {
      console.error(err);
      return null;
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  return out;
}

/**
 * Exports
 */

export const getAllAssetsData = async (req, res) =>  {
  const { networkId } = req.query;
  if (!networkId) {
    res.status(400).send("Must provide networkId in query");
    return;
  }

  const assets = getAssets(networkId);
  if (!assets) {
    res.status(400).send("Invalid networkId");
    return;
  }

  const url = manyPricesUrl(tickersString, currencyCodesString);
  const prices = await axiosCryptoCompareGetData(url);
  if (!prices) {
    res.status(400).send("Could not retrieve prices");
    return;
  }
  
  const assetsData = assets.map((a, i) => {
    return { ...a, prices: prices[a.lookup] };
  });

  res.send(assetsData);
  return;
}

export const getAbi = async (req, res) => {
  const { ticker } = req.params;
  const { networkId } = req.query;

  if (!ticker) {
    res.status(400).send("Invalid ticker parameter");
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

  const url = etherscanAbiUrl(asset[0].address);

  const abi = await axios.get(url)
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    })
    .then((resp) => {
      return resp.data;
    });
  
  if (abi.status !== 0) {
    res.send(abi.result);
  } else {
    res.status(400).send(abi.result);
  }
  return;
}

export const getPrices = async (req, res) => {
  const { tickers, currencies } = req.query;
  if (!tickers) {
    res.status(400).send("Must provide tickers in query");
    return;
  }
  if (!currencies) {
    res.status(400).send("Must provide currencies in query");
    return;
  }

  const url = manyPricesUrl(tickers, currencies);
  const prices = await axiosCryptoCompareGetData(url);
  if (!prices) {
    res.status(400).send("Could not retrieve prices");
    return;
  }
  
  res.send(prices);
  return;
}

export const getPrice = async (req, res) => {
  const { ticker, currency } = req.params;
  if (!ticker) {
    res.status(400).send("Must provide ticker parameter");
    return;
  }
  if (!currency) {
    res.status(400).send("Must provide currency parameter");
    return;
  }

  const url = priceUrl(ticker, currency);
  const price = await axiosCryptoCompareGetData(url);
  if (!price) {
    res.status(400).send("Could not retrieve prices");
    return;
  }

  res.send(price);
  return;
}

export const getImages = async (req, res) => {
  const url = generalInfoUrl(tickersString);
  const infos = await axiosCryptoCompareGetData(url);
  if (!infos) {
    res.status(400).send("Could not retrieve information");
    return;
  }
  
  let images = {}
  infos.Data.map(a => {
    images[a.CoinInfo.Name] = (
      cryptoCompareImageUrlBase + a.CoinInfo.ImageUrl
    );
  });
  
  res.send(images);
  return;
}
