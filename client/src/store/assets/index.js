import * as actions from './actions';
import axios from '../../axiosConfig';
import { web3 } from '../../ethereum';

export function getAllAssets(networkId=1) {
  return async dispatch => {

    const blockTimestamp = await web3.eth.getBlock("latest").timestamp;

    const assets = await axios.get('/assets', {
      params: {
        networkId,
        blockTimestamp
      }
    })
      .catch((err) => {
        console.error("Redux-Axios", err);
        return null;
      })
      .then((res) => {
        return res.data;
      });

    if (assets === null) {
      dispatch(actions.setAllAssetsFailure());
    } else {
      dispatch(actions.setAllAssets(assets));
    }
  }
}

export function getAssetImages() {
  return async dispatch => {

    const images = await axios.get('/assets/images')
      .catch((err) => {
        console.error("Redux-Axios", err);
        return null;
      })
      .then((res) => {
        return res.data;
      });

    if (images === null) {
      dispatch(actions.setAssetImagesFailure());
    } else {
      dispatch(actions.setAssetImages(images));
    }
  }
}
