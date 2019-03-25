import * as actions from './actions';
import axios from '../axiosConfig';

const getAssets = async () => {
  const assets = await axios.get('/assets')
    .catch((err) => {
      console.error("Redux-Axios", err);
      return null;
    })
    .then((res) => {
      return res.data;
    });
  return assets;
}

export function getAllAssets() {
  return async dispatch => {
    const assets = await getAssets();
    if (assets == null) {
      dispatch(actions.setAllAssetsFailure());
    } else {
      dispatch(actions.setAllAssets(assets));
    }
  }
}
