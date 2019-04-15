import axios from '../services/compound/HTTPClient';
import Units from 'ethereumjs-units';

export const accountData = async (req, res) => {
  const { address } = req.params;
  const { units } = req.query;

  if (!address) {
    res.status(400).send("Must provide address parameter");
    return;
  }
  if (!units) {
    res.status(400).send("Must provide units in query");
    return;
  }

  await axios.post('/risk/v1/get_account_value', {
    account_address: address
  })
    .catch((err) => {
      res.status(400).send(err);
      return;
    })
    .then((resp) => {
      if (resp.data.error !== null) {
        res.status(400).send(resp.data.error.message);
        return;
      } else {
        const d = resp.data;
        const lendAmount = Units.convert(
          d.account_value.total_supply_value_in_eth.value, "wei", units
        );
        const borrowAmount = Units.convert(
          d.account_value.total_borrow_value_in_eth.value, "wei", units
        );
        res.send({ lendAmount, borrowAmount, units });
      }
    });
  return;
}

export const marketData = async (req, res) => {
  const { assetAddress } = req.params;
  const { minBlockTime, maxBlockTime, buckets } = req.query;
  
  if (!assetAddress) {
    res.status(400).send("Must provide assetAddress parameter");
    return;
  }
  if (!minBlockTime) {
    res.status(400).send("Must provide minBlockTime in query");
    return;
  }
  if (!maxBlockTime) {
    res.status(400).send("Must provide maxBlockTime in query");
    return;
  }
  if (!buckets) {
    res.status(400).send("Must provide buckets in query");
    return;
  }

  await axios.get('/market_history/v1/graph', {
    params: {
      asset: assetAddress,
      min_block_timestamp: minBlockTime,
      max_block_timestamp: maxBlockTime,
      num_buckets: buckets
    }
  })
    .then((resp) => {
      if (resp.data.error.message !== "") {
        res.status(400).send(resp.data.error.message);
      } else {
        res.send(resp.data);
      }
    })
    .catch((err) => {
      res.status(400).send(err.response.statusText);
      return;
    })
    ;
  return;
}
