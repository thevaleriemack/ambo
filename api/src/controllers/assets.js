import axios from 'axios';
import assets from '../compound/assets';
import currencyCodes from '../utils/currencyCodes';

const cryptoCompareAxios = axios.create({
  headers: {
    'Authorization': process.env.CRYPTO_COMPARE_KEY
  }
});

const priceURL = (ticker, currency) => (
  `https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${currency}`
);

const manyPricesURL = (tickers, currencies) => (
  `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers}&tsyms=${currencies}`
);

const handleError = (resp) => {
  if (resp.data.Response === 'Error') {
    console.error(resp.data.Message)
    return 400;
  }
}

/**
 * Exports
 */

exports.getAllAssetsData = async (req, res) =>  {
  const tickersArray = assets.map(a => a.lookup);
  const tickers = tickersArray.toString();
  const currencies = currencyCodes.toString();

  const url = manyPricesURL(tickers, currencies);
  const prices = await cryptoCompareAxios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  
  const assetsData = assets.map(asset => {
    return {...asset, prices: prices[asset.lookup] }
  });

  res.send(assetsData);
}

exports.getPrices = async (req, res) => {
  const tickers = req.query.tickers;
  const currencies = req.query.currencies;

  const url = manyPricesURL(tickers, currencies);
  const prices = await cryptoCompareAxios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  
  res.send(prices);
}

exports.getPrice = async (req, res) => {
  const { ticker, currency } = req.params;
  const url = priceURL(ticker, currency);
  const price = await cryptoCompareAxios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data[currency];
    });
  
  res.send(String(price));
}
