import { AgentModel } from './../models/AgentModel';
import { RouterState } from 'react-router-redux';

export interface RootState {
  router: RouterState;
  agentList: RootState.AgentListState; 
}

export namespace RootState {
  export type AgentListState = {
    agents: AgentModel[],
    loading: boolean,
    error: string | null
  }
}
