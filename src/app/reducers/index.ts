import { combineReducers } from 'redux';
import { RootState } from './state';
import { routerReducer, RouterState } from 'react-router-redux';
import { agentsReducer } from 'app/reducers/agents';
import { watchersReducer } from 'app/reducers/watchers';

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  agentList: agentsReducer as any,
  watcherList: watchersReducer as any,
  router: routerReducer as any
});
