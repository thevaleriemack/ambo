import * as types from './types.js';

export function setAllAssets(assets) {
  return { type: types.SET_ALL_ASSETS_SUCCESS, payload: assets }
}

export function setAllAssetsFailure() {
  return { type: types.SET_ALL_ASSETS_FAILURE }
}

export function setAssetImages(images) {
  return { type: types.SET_ASSET_IMAGES_SUCCESS, payload: images }
}

export function setAssetImagesFailure() {
  return { type: types.SET_ASSET_IMAGES_FAILURE }
}
