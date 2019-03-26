import axios from 'axios';

export default axios.create({
  headers: {
    'Authorization': process.env.CRYPTO_COMPARE_KEY
  }
});