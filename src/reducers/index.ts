import app, { appState } from './app';
import github, { githubState } from './github';
import user, { userState } from './user';
import github_user, { githubUserState } from './github_user';

export const initialState = {
  app: appState,
  github: githubState,
  user: userState,
  github_user: githubUserState
};

export default {
  ...app,
  ...github,
  ...user,
  ...github_user
};
