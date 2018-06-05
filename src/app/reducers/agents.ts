import { AgentModel } from 'app/models';
import { AgentActions } from 'app/actions/agents';
import { RootState } from "app/reducers";
import { handleActions } from "redux-actions";
import * as _ from 'lodash';

const initialState: RootState.AgentListState = {
    agents: [],
    loading: true,
    error: null
}

export const agentListReducer = handleActions<RootState.AgentListState, AgentModel | AgentModel[]>(
    {
        [AgentActions.Type.FETCH_AGENTS]: (state, action) => {
            return {
                ...state, loading: true
            };
        },

        [AgentActions.Type.FETCH_AGENTS_SUCCESS] : (state, action) => {
            console.log(action.payload);
            if(action.payload) {
                return {
                    ...state, 
                    loading: false, 
                    agents: action.payload as AgentModel[]
                };
            }
            return state;
        },

        [AgentActions.Type.FETCH_AGENTS_FAILURE]: (state, action) => {
            if(action.payload) {
                return {
                    agents: [], 
                    loading: false, 
                    error: 'Could not load agent list. Try again later'
                };
            }
            return state;
        },

        [AgentActions.Type.ADD_AGENT]: (state, action) => {
            console.log(action.payload);
            if(action.payload) {
                const agentModel = action.payload as AgentModel;
                const ipAddressAlreadyExist = _.some(state.agents, (agent: AgentModel) => agent.ipAddress == agentModel.ipAddress);

                if(!ipAddressAlreadyExist)
                {
                    return {
                        ...state, 
                        agents: [...state.agents, agentModel]
                    }
                }
            }
            return state;
        },

        [AgentActions.Type.REMOVE_AGENT]: (state, action) => {
            console.log(action.payload);
            if(action.payload) {
                const agentModel = action.payload as AgentModel;
                return {
                    ...state, 
                    agents: _.filter(state.agents, (agent: AgentModel) => agent.ipAddress != agentModel.ipAddress)
                }
            }
            return state;
        }
    },
    initialState
);