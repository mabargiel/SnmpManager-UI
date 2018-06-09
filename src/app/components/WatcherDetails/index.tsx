import * as React from "react";
import { WatcherModel } from "app/models/WatcherModel";
import * as styles from './style.css';
import * as SignalR from '@aspnet/signalr';

export namespace WatcherDetails {
    export interface Props {
        selectedWatcher: WatcherModel | null;
    }

    export interface State {
        id: string,
        data: {[variables: string]: any};
    }
}

const connection = new SignalR.HubConnectionBuilder().withUrl('http://localhost:5001/watchers').build();

export class WatcherDetails extends React.Component<WatcherDetails.Props & React.HTMLAttributes<HTMLDivElement>, WatcherDetails.State> {

    constructor(props: WatcherDetails.Props) {
        super(props);
        
        this.state = {id: '', data: {['']: null}};
    }

    componentDidMount() {
        connection.on('WATCHER-DATA-RECEIVED', data => {
            if(this.props.selectedWatcher && this.props.selectedWatcher.id === data.id)
                this.setState({...this.state, data: {variables: data.data.variables}});
        });

        connection.start();
    }

    renderData() {
        if(!this.state.data || !this.state.data.variables)
            return (<div></div>);

        var variables = this.state.data.variables;
        let keys = Object.keys(variables);
        return keys.map((key: string) => (<p key={key}><strong>{key}</strong>: {variables[key]}</p>));
    }

    render() {
        if(!this.props.selectedWatcher)
            return (<h2>Watcher Details</h2>);

        return (
            <div className={styles.containerItemAlign}>
                <p>IpAddress: {this.props.selectedWatcher.ipAddress}</p>
                <p>Mib: {this.props.selectedWatcher.mib}</p>
                <p>UpdatesEvery: {this.props.selectedWatcher.updatesEvery}</p>
                <div className={styles.data}>
                    <h3>Data</h3>
                    {
                        this.renderData()
                    }
                </div>
            </div>
        )
    }
}