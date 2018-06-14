import * as React from "react";
import { WatcherModel } from "app/models/WatcherModel";
import * as SignalR from '@aspnet/signalr';
import * as styles from './style.css';
import axios from 'axios'; 
import { SnmpValueModel } from "app/models/SnmpValueModel";
import { SnmpValueType } from "app/models/SnmpValueType";
import { SparklinesLine, Sparklines, SparklinesSpots } from "react-sparklines";

export namespace Watcher {
    export interface Props {
        params: WatcherModel;
    }

    export interface State {
        data: {[variables: string]: SnmpValueModel}
        history: {[variables: string]: any[]}
    }
}

export enum WatcherType {
    Chart,
    Plain
}

const connection = new SignalR.HubConnectionBuilder().withUrl('http://localhost:5001/watchers').build();

export default class Watcher extends React.Component<Watcher.Props, Watcher.State> {

    constructor(props: Watcher.Props) {
        super(props);
        
        this.renderVariables = this.renderVariables.bind(this);
        this.state = {
            data: {},
            history: {}
        }
    }

    componentDidMount() {
        if(!this.props.params)
            return;

        connection.on("WATCHER-DATA-RECEIVED", (data: any) => {
            if(data.id != this.props.params.id)
                return;

            let map = data.data.variables;
            let keys = Object.keys(data.data.variables);
            let updatedHistory = {...this.state.history};
            
            keys.forEach(key => {
                let valueToPush = map[key];
                if(updatedHistory[key])
                    updatedHistory[key].push(valueToPush.data)
                else updatedHistory[key] = [valueToPush];

                if(updatedHistory[key].length > 20) {
                    updatedHistory[key] = updatedHistory[key].splice(1, 20);
                }
            });

            this.setState({
                data: data.data.variables, 
                history: updatedHistory
            });
        });

        connection.start();

        axios.delete(`http://localhost:5001/api/watcherConnections/${this.props.params.id}`) 
                .then(() => axios.post(`http://localhost:5001/api/watcherConnections/${this.props.params.id}`) 
                            .then(() => console.log(`WATCHER ${this.props.params.id} CONNECTED`))); 
    }

    componentWillUnmount() {
        axios.delete(`http://localhost:5001/api/watcherConnections/${this.props.params.id}`) 
                .then(() => console.log(`WATCHER ${this.props.params.id} DICONNECTED`)); 
    }

    renderVariables() {
        if(!this.state.data)
            return <div></div>;

        let keys = Object.keys(this.state.data);

        return keys.map(key => {
            let value = this.state.data[key];
            let jsx : JSX.Element= <div></div>;

            switch (value.type) {
                case SnmpValueType.Integer32:
                console.log(this.state.history[key])
                    jsx = (
                        <Sparklines data={this.state.history[key]} limit={20}>
                            <SparklinesLine color="#1c8cdc" />
                            <SparklinesSpots />
                        </Sparklines>
                    );
                    break;
                default:
                    jsx = (
                        <div className={styles.variables}>
                            <span>{this.state.data[key].type}</span>
                            <span>{this.state.data[key].value}</span>
                        </div>
                    )
                    break;
            }
            
            return React.cloneElement(jsx, {key: key});
        });
    }

    render() {
        return (
            <div>
                <div className={styles.description}>
                    <span>Ip Address: {this.props.params.ipAddress}</span>
                    <span>Method: {this.props.params.method}</span>
                    <span>Mib: {this.props.params.mib}</span>
                    <span>UpdatesEvery: {this.props.params.updatesEvery}</span>
                </div>

                {this.renderVariables()}
            </div>
        )
    }
}