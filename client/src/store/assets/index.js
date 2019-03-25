import * as actions from './actions';
import axios from '../axiosConfig';

export function getAllAssets() {
  return async dispatch => {

    const assets = await axios.get('/assets')
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
