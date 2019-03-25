import axios from 'axios';
import assets from '../compound/assets';

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
    return resp.data.Message;
  }
}

/**
 * Exports
 */

exports.getAll = (req, res) =>  {
  res.send(assets);
}

exports.getPrices = async (req, res) => {
  let currencies = "USD";
  const tickersArray = assets.map(a => a.ticker);
  let tickers = tickersArray.toString();

  if (req.query !== undefined) {
    currencies = req.query.currencies || currencies;
    tickers = req.query.tickers || tickers;
  }

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
