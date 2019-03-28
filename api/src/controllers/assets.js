import axios from 'axios';
import axiosCompound from '../services/compound/HTTPClient';
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

const handleError = (resp) => {
  if (resp.data.Response === 'Error') {
    console.error(resp.data.Message)
    return 400;
  }
}

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

const axiosCryptoCompareGetData = async (url) => {
  const out = await axiosCryptoCompare.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  return out;
}

/**
 * Exports
 */

export const getRate = async (assetAddr, blockTimestamp) => {
  const out = await axiosCompound.get('/market_history/v1/graph', {
    params: {
      asset: assetAddr,
      min_block_timestamp: blockTimestamp,
      max_block_timestamp: blockTimestamp,
      num_buckets: 1
    }
  })
  .catch((err) => {
    console.error("here error");
    return null;
  })
  .then((resp) => {
    return resp.data;
  });
  return out;
}

export const getAllAssetsData = async (req, res) =>  {
  // Get prices for the assets
  const url = manyPricesUrl(tickersString, currencyCodesString);
  const prices = await axiosCryptoCompareGetData(url);
  
  const { networkId, blockTimestamp } = req.query;
  const assets = getAssets(networkId);
  
  if (prices === 400) {
    res.sendStatus(400);
  } else {
    // Merge prices with asset data
    const assetsData = assets.map(a => {
      const rate = getRate(a.address, blockTimestamp);
      const d = {
        ...a,
        prices: prices[a.lookup],
        lendRate: rate.supply_rates,
        borrowRate: rate.borrow_rates
      }

      return d;

    });

    console.log(assetsData);
    res.send(assetsData);
  }
}

export const getAbi = async (req, res) => {
  const { ticker } = req.params;
  const { networkId } = req.query;

  if (!ticker) {
    res.status(400).send("Invalid ticker param");
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

  const url = manyPricesUrl(tickers, currencies);
  const prices = await axiosCryptoCompareGetData(url);
  
  res.send(prices);
}

export const getPrice = async (req, res) => {
  const { ticker, currency } = req.params;

  const url = priceUrl(ticker, currency);
  const price = await axiosCryptoCompareGetData(url);
  
  if (price === 400) {
    res.sendStatus(400);
  } else {
    res.send(price);
  }
}

export const getImages = async (req, res) => {
  const url = generalInfoUrl(tickersString);
  const infos = await axiosCryptoCompareGetData(url);
  
  if (infos !== 400) {
    let images = {}
    infos.Data.map(a => {
      images[a.CoinInfo.Name] = cryptoCompareImageUrlBase + a.CoinInfo.ImageUrl
    });
    res.send(images);
  } else {
    res.sendStatus(400);
  }
}
