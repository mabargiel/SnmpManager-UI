import * as React from 'react';
import { AgentModel } from 'app/models';
import * as styles from './style.css';
import Agent from 'app/components/Agent';

export namespace AgentList {
    export interface Props {
        agents: AgentModel[];
    }
}

export default class AgentList extends React.Component<AgentList.Props> {
    render() {
        return (
            <div className={styles.agentList}>
                <div className={styles.agentListHeader}>
                    <h3>Active Agents</h3>
                </div>
                <ul className={styles.noBullet}>
                    {
                        this.props.agents.map((agent: AgentModel) => 
                            <Agent key={agent.ipAddress} ipAddress={agent.ipAddress} supportedVersion={agent.supportedVersion}></Agent>
                        )
                    }
                </ul>
            </div>
        )
    }
}