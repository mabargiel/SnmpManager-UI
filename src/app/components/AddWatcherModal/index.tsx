import * as React from "react";
import * as Modal from 'react-modal';
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './style.css';
import * as classNames from "classnames";
import { AgentModel } from "app/models";

export namespace AddWatcherModal {
    export interface Props {
        isOpen: boolean;
        agents: AgentModel[];
        onSubmit: (event: any, form: State) => void;
    }

    export interface State {
        ipAddress: string,
        mib: string,
        updatesEvery: number | null
    }
}

Modal.setAppElement('#root');

export class AddWatcherModal extends React.Component<AddWatcherModal.Props, AddWatcherModal.State> {

    constructor(props: AddWatcherModal.Props) {
        super(props);
        
        this.onIpAddressChange = this.onIpAddressChange.bind(this);
        this.onMibChange = this.onMibChange.bind(this);
        this.onUpdatesEveryChange = this.onUpdatesEveryChange.bind(this);
        this.onModalClosed = this.onModalClosed.bind(this);

        this.state = {
            ipAddress: '', 
            mib: '', 
            updatesEvery: null
        };
    }

    onIpAddressChange(event: any) {
        this.setState({...this.state, ipAddress: event.target.value});
    }
    
    onMibChange(event: any) {
        this.setState({...this.state, mib: event.target.value});
    }

    onUpdatesEveryChange(event: any) {
        this.setState({...this.state, updatesEvery: event.target.updatesEvery});
    }
    
    onModalClosed() {
        this.setState({});
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} contentLabel="Modal" className={styles.modal}>
                <h2>Create New Sonar</h2>
                <form onSubmit={e => {
                    this.props.onSubmit(e, this.state);
                    this.onModalClosed();
                }}>
                <div className={bootstrap.formGroup}>
                    <label htmlFor="selectAgent">Agent</label>
                    <select className={bootstrap.formControl} id="selectAgent">
                        {this.props.agents.map(agent => (<option key={agent.ipAddress}>{agent.ipAddress}</option>))}
                    </select>
                </div>
                <div className={bootstrap.formGroup}>
                    <label htmlFor="mibInput">MIB</label>
                    <input 
                        type="text" 
                        className={bootstrap.formControl} 
                        id="mibInput" 
                        placeholder="MIB"
                        value={this.state.mib}
                        onChange={this.onMibChange} />
                </div>
                <div className={bootstrap.formGroup}>
                    <label htmlFor="mibInput">Updates every</label>
                    <input 
                        type="text" 
                        className={bootstrap.formControl} 
                        id="updatesEveryInput" 
                        placeholder="Updates Every"
                        value={this.state.updatesEvery || ''}
                        onChange={this.onUpdatesEveryChange} />
                </div>
                <button type="submit" className={classNames(bootstrap.btn, bootstrap.btnPrimary)}>
                    Create
                </button>
                </form>
            </Modal>
        )
    }
}