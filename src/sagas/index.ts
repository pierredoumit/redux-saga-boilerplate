import { all, fork } from 'redux-saga/effects';

import github from './github';
import user from './user';
import github_user from './github_user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(github), fork(user), fork(github_user)]);
}
