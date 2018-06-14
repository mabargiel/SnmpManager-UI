import * as React from "react";
import * as Modal from 'react-modal';
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './style.css';
import * as classNames from "classnames";
import { AgentModel } from "app/models";
import { SnmpMethod } from "app/models/SnmpMethod";

export namespace AddWatcherModal {
    export interface Props {
        isOpen: boolean;
        agents: AgentModel[];
        onSubmit: (event: any, form: State) => void;
        onCancel: (event: any) => void;
    }

    export interface State {
        ipAddress: string,
        mib: string,
        method: SnmpMethod,
        updatesEvery: number
    }
}

const initialState: AddWatcherModal.State = {
    ipAddress: '', 
    mib: '', 
    method: SnmpMethod.Get,
    updatesEvery: 1000
}

Modal.setAppElement('#root');

export class AddWatcherModal extends React.Component<AddWatcherModal.Props, AddWatcherModal.State> {

    constructor(props: AddWatcherModal.Props) {
        super(props);
        
        this.onIpAddressChanged = this.onIpAddressChanged.bind(this);
        this.onMethodChanged = this.onMethodChanged.bind(this);
        this.onMibChanged = this.onMibChanged.bind(this);
        this.onUpdatesEveryChanged = this.onUpdatesEveryChanged.bind(this);
        this.onModalClosed = this.onModalClosed.bind(this);

        this.state = initialState;
    }

    onIpAddressChanged(event: any) {
        this.setState({...this.state, ipAddress: event.target.value});
    }

    onMethodChanged(event: any) {
        this.setState({...this.state, method: event.target.value});
    }
    
    onMibChanged(event: any) {
        this.setState({...this.state, mib: event.target.value});
    }

    onUpdatesEveryChanged(event: any) {
        this.setState({...this.state, updatesEvery: event.target.value});
    }
    
    onModalClosed() {
        
        this.setState({
            ipAddress: '',
            mib: '',
            method: SnmpMethod.Get,
            updatesEvery: 1000
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} contentLabel="Modal" className={styles.modal}>
                <h2>Create New Sonar</h2>
                <form>
                    <div className={bootstrap.formGroup}>
                        <label htmlFor="selectAgent">Agent</label>
                        <select 
                            className={bootstrap.formControl} 
                            id="selectAgent" 
                            onChange={this.onIpAddressChanged} 
                            value={this.state.ipAddress}>
                                <option key="default">Select agent...</option>
                                {this.props.agents.map(agent => (<option key={agent.ipAddress}>{agent.ipAddress}</option>))}
                        </select>
                    </div>
                    <div className={bootstrap.formGroup}>
                        <label htmlFor="selectMethod">Method</label>
                        <select 
                            className={bootstrap.formControl} 
                            id="selectMethod" 
                            onChange={this.onMethodChanged} 
                            value={this.state.method}>
                                <option key="default">Select method...</option>
                                <option key={SnmpMethod.Get}>GET</option>
                                <option key={SnmpMethod.Walk}>WALK</option>
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
                            onChange={this.onMibChanged} />
                    </div>
                    <div className={bootstrap.formGroup}>
                        <label htmlFor="mibInput">Updates every</label>
                        <input 
                            type="text" 
                            className={bootstrap.formControl} 
                            id="updatesEveryInput" 
                            placeholder="Updates Every"
                            onChange={this.onUpdatesEveryChanged} />
                    </div>
                    <div className={bootstrap.modalFooter}>
                        <button className={classNames(bootstrap.btn, bootstrap.btnSecondary)} onClick={() => {
                            this.props.onCancel;
                            this.onModalClosed();
                        }}>Close</button>
                        <button type="submit" className={classNames(bootstrap.btn, bootstrap.btnPrimary)} onClick={e => {
                            this.props.onSubmit(e, this.state);
                            this.onModalClosed();
                        }}>Create</button>
                    </div>
                    
                </form>
            </Modal>
        )
    }
}