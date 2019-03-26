import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.compound.finance/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'compound-api-key': process.env.COMPOUND_KEY
  }
});
