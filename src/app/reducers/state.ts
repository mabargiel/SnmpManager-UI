import { WatcherModel } from './../models/WatcherModel';
import { AgentModel } from './../models/AgentModel';
import { RouterState } from 'react-router-redux';

export interface RootState {
  router: RouterState;
  agentList: RootState.AgentsState; 
  watcherList: RootState.WatchersState;
}

export namespace RootState {
  export type AgentsState = {
    agents: AgentModel[],
    fetching: boolean,
    error: string | null
  };
  
  export type WatchersState = {
    watchers: WatcherModel[],
    fetching: boolean,
    error: string | null
  }
}
