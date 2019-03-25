import axios from 'axios';
import assets from '../compound/assets';
import currencyCodes from '../utils/currencyCodes';

const cryptoCompareAxios = axios.create({
  headers: {
    'Authorization': process.env.CRYPTO_COMPARE_KEY
  }
});

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

exports.getAllAssetsData = async (req, res) =>  {
  const url = manyPricesUrl(tickersString, currencyCodesString);
  const prices = await cryptoCompareAxios.get(url)
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

exports.getPrices = async (req, res) => {
  const { tickers, currencies } = req.query;
  const url = manyPricesUrl(tickers, currencies);
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
  const url = priceUrl(ticker, currency);
  const price = await cryptoCompareAxios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data[currency];
    });
  
  res.send(String(price));
}

exports.getImages = async (req, res) => {
  const url = generalInfoUrl(tickersString);
  const infos = await cryptoCompareAxios.get(url)
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return handleError(resp) || resp.data;
    });
  
  let images = infos;
  if (images !== 400) {
    images = infos.Data.map(a => {
      return {
        lookup: a.CoinInfo.Name,
        imageUrl: imageUrlBase + a.CoinInfo.ImageUrl
      }
    });
  }

  res.send(images);
}
