// https://compound.finance/developers#market-history-api
import axios from '../services/compound/HTTPClient';

export const accountData = async (req, res) => {
  const { address } = req.params;
  
  await axios.post('/risk/v1/get_account_value', {
    account_address: address
  })
  .catch((err) => {
    res.status(400).send(err);
  })
  .then((resp) => {
    if (resp.data.error !== null) {
      res.status(400).send(resp.data.error.message);
    } else {
      const d = resp.data;
      const lendAmount = d.account_value.total_supply_value_in_eth.value;
      const borrowAmount = d.account_value.total_borrow_value_in_eth.value;
      const units = 'ether';
      res.send({lendAmount, borrowAmount, units});
    }
  });
}

export const marketData = async (req, res) => {
  const { asset } = req.params;
  const { minBlockTime, maxBlockTime, buckets } = req.query;
  await axios.get('/market_history/v1/graph', {
    params: {
      asset,
      min_block_timestamp: minBlockTime,
      max_block_timestamp: maxBlockTime,
      num_buckets: buckets
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
  .then((resp) => {
    if (resp.data.error.message == '') {
      res.send(resp.data);
    } else {
      res.status(400).send(resp.data.error.message);
    }
  });
}
