import { ActionTypes, STATUS } from 'literals';
import { createReducer } from 'modules/helpers';
import { parseError } from 'modules/client';

import { UsersListGitHub, Topic } from 'types';

export const topic: Topic = {
  cached: false,
  data: [],
  message: '',
  status: STATUS.IDLE,
  updatedAt: 0,
};

export const githubUserState: UsersListGitHub = {
  topics: {},
  query: '',
};


const userReposStart = ( state:UsersListGitHub,  payload:any ) => {
  const {query} = payload;
  state.query = query;

  state.topics[query] = state.topics[query] || { ...topic };
  state.topics[query].message = '';
  state.topics[query].status = STATUS.RUNNING;
};

const userReposSuccess = ( state:UsersListGitHub, { meta, payload }:any  ) => {
  const { cached, query, updatedAt } = meta || {};

  state.topics[query] = state.topics[query] || { ...topic };
  state.topics[query].cached = cached;
  state.topics[query].data = payload;
  state.topics[query].status = STATUS.SUCCESS;
  state.topics[query].updatedAt = updatedAt;
};

const userReposFail = ( state:UsersListGitHub,  { meta, payload }:any  ) => {
  const { query } = meta || {};

  state.topics[query] = state.topics[query] || { ...topic };
  state.topics[query].message = parseError(payload);
  state.topics[query].status = STATUS.ERROR;
  state.topics[query].updatedAt = 0;
};

export default {
  github_user: createReducer<UsersListGitHub>(
    {
      [ActionTypes.USERS_GET_REPOS_REQUEST]: (draft, payload ) => {
        userReposStart(draft, payload)
      },
      [ActionTypes.USERS_GET_REPOS_SUCCESS]: (draft, { meta, payload }) => {
        userReposSuccess(draft, { meta, payload })
      },
      [ActionTypes.USERS_GET_REPOS_FAILURE]: (draft, { meta, payload }) => {
        userReposFail(draft, { meta, payload })
      },
    },
    githubUserState,
  ),
};