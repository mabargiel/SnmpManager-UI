import * as React from "react";
import * as styles from './style.css';
import * as displayIcon from '../../../assets/icons/display.svg';

export namespace Agent {
    export interface Props {
        ipAddress: string,
        supportedVersion: string
    }
}

export default class Agent extends React.Component<Agent.Props> {
    render() {
        return (
            <li><img className={styles.liIcon} src={displayIcon} /> {this.props.ipAddress} <span>{this.props.supportedVersion}</span></li>
        )
    }
}