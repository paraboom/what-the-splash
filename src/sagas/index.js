import { all } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';
import statsSage from './statsSaga';

function* rootSaga() {
  yield all([
    imagesSaga(),
    statsSage(),
  ])
}

export default rootSaga;