import axios from '../services/cryptoCompare/HTTPClient';
import assetsMain from '../services/compound/assets';
import assetsRinkeby from '../services/compound/assets.rinkeby';
import currencyCodes from '../utils/currencyCodes';

const tickersArray = assetsMain.map(a => a.lookup);
const tickersString = tickersArray.toString();
const currencyCodesString = currencyCodes.toString();

const priceUrl = (ticker, currency) => (
  `https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${currency}`
);

const manyPricesUrl = (tickers, currencies) => (
  `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers}&tsyms=${currencies}`
);

const generalInfoUrl = (tickers) => (
  `https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${tickers}&tsym=USD`
);

const imageUrlBase = 'https://www.cryptocompare.com';

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

/**
 * Exports
 */

export const getAllAssetsData = async (req, res) =>  {
  const url = manyPricesUrl(tickersString, currencyCodesString);
  const prices = await axios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  
  const { networkId } = req.query;
  const assets = getAssets(networkId);
  
  if (prices === 400) {
    res.sendStatus(400);
  } else {
    const assetsData = assets.map(a => {
      return { ...a, prices: prices[a.lookup] }
    });
    res.send(assetsData);
  }
}

export const getPrices = async (req, res) => {
  const { tickers, currencies } = req.query;
  const url = manyPricesUrl(tickers, currencies);
  const prices = await axios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  
  res.send(prices);
}

export const getPrice = async (req, res) => {
  const { ticker, currency } = req.params;
  const url = priceUrl(ticker, currency);
  const price = await axios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data[currency];
    });
  
  if (price === 400) {
    res.sendStatus(400);
  } else {
    res.send(String(price));
  }
}

export const getImages = async (req, res) => {
  const url = generalInfoUrl(tickersString);
  const infos = await axios.get(url)
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  
  if (infos !== 400) {
    let images = {}
    infos.Data.map(a => {
      images[a.CoinInfo.Name] = imageUrlBase + a.CoinInfo.ImageUrl
    });
    res.send(images);
  } else {
    res.sendStatus(400);
  }
}
