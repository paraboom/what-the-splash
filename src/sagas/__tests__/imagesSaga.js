import { runSaga } from 'redux-saga';
import * as api from '../../api';
import { setError, setImages } from '../../actions';
import { getPage, handleImagesLoad } from '../imagesSaga';

test('selector gives the page', () => {
  const nextPage = 1;
  const state = { nextPage };
  const res = getPage(state);
  expect(res).toBe(nextPage);
});

test('should load images and handle them in case of success', async () => {
  const dispatchedActions = [];
  const mockImages = ['oneImg', 'twoImg', 'threeImg'];
  api.fetchImages = jest.fn(() => Promise.resolve(mockImages))

  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: action => dispatchedActions.push(action),
  };

  await runSaga(fakeStore, handleImagesLoad).toPromise();

  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setImages(mockImages));
});

test('should handle errors in case of fail', async () => {
  const dispatchedActions = [];
  const error = new Error('Something wrong')
  api.fetchImages = jest.fn(() => Promise.reject(error))

  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: action => dispatchedActions.push(action),
  };

  await runSaga(fakeStore, handleImagesLoad).toPromise();

  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setError(error.toString()));
});
