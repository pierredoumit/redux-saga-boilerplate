import { ActionTypes } from 'literals';

export const getUsersRepos = ( query: string ) => {
  return {
      type: ActionTypes.USERS_GET_REPOS_REQUEST,
      query: query
  };
};
