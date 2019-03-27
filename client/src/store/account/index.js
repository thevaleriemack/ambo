export const SET_CONNECTED_SUCCESS = 'SET_CONNECTED_SUCCESS';

export function setUserConnected(bool) {
  return dispatch => {
    dispatch(() => (
      { type: SET_CONNECTED_SUCCESS, payload: bool }
    ));
  }
}
