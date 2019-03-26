import axios from '../services/cryptoCompare/HTTPClient';
import assets from '../services/compound/assets';
import currencyCodes from '../utils/currencyCodes';

const tickersArray = assets.map(a => a.lookup);
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
  
  const assetsData = assets.map(a => {
    return { ...a, prices: prices[a.lookup] }
  });

  res.send(assetsData);
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
  
  res.send(String(price));
}

export const getImages = async (req, res) => {
  const url = generalInfoUrl(tickersString);
  const infos = await axios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  
  let images = infos;
  if (images !== 400) {
    images = {}
    infos.Data.map(a => {
      images[a.CoinInfo.Name] = imageUrlBase + a.CoinInfo.ImageUrl
    });
  }

  res.send(images);
}
