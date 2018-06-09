import * as React from "react";
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './style.css';
import * as classNames from "classnames";
import { WatcherModel } from "app/models/WatcherModel";
import { AddWatcherModal } from "app/components/AddWatcherModal";
import { AgentModel } from "app/models";
import { connect } from "react-redux";
import { RootState } from "app/reducers";
import { Dispatch, bindActionCreators } from "redux";
import { WatcherActions } from "app/actions";
import { omit } from "app/utils";
import { WatcherTable } from "app/components/WatcherTable";
import { WatcherDetails } from "app/components/WatcherDetails";

export namespace WatchersView {
    export interface Props {
        agents: AgentModel[];
        watchers: WatcherModel[];
        actions:  WatcherActions;
    }

    export interface State {
        modalIsOpen: boolean;
        selectedWatcher: WatcherModel | null;
    }
}

@connect(
    (state: RootState): Pick<WatchersView.Props, 'agents' | 'watchers'> => {
      return { agents: state.agentList.agents, watchers: state.watcherList.watchers };
    },
    (dispatch: Dispatch): Pick<WatchersView.Props, 'actions'> => ({
      actions: bindActionCreators(omit(WatcherActions, 'Type'), dispatch)
    })
)
export default class WatchersView extends React.Component<WatchersView.Props & React.HTMLAttributes<HTMLDivElement>, WatchersView.State> {

    constructor(props: WatchersView.Props) {
        super(props);
        
        this.openModal = this.openModal.bind(this);
        this.handleSubmitWatcher = this.handleSubmitWatcher.bind(this);
        this.handleWatcherSelect = this.handleWatcherSelect.bind(this);

        this.state = {modalIsOpen: false, selectedWatcher: null};
    }

    componentDidMount() {
        this.props.actions.fetchWatchers();
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }

    handleSubmitWatcher(event: any, state: AddWatcherModal.State) {
        event.preventDefault();
        this.props.actions.addWatcher(state);
        if (this.state.modalIsOpen) {
          this.setState({ modalIsOpen: false });
        }
    }
    
    handleWatcherSelect(event: any, item: WatcherModel) {
        this.setState({...this.state, selectedWatcher: item});
    }

    render() {
        return (
            <div className={styles.watchersContainer}>
                <div className={styles.topPanel}>
                    <button type="button" className={classNames(bootstrap.btn, bootstrap.btnPrimary)} onClick={this.openModal}>Add Watcher...</button>
                </div>
                <AddWatcherModal 
                    isOpen={this.state.modalIsOpen} agents={this.props.agents} 
                    onSubmit={this.handleSubmitWatcher}/>
                <div className={styles.container}>
                    <WatcherTable 
                        className={styles.containerItemAlign}
                        items={this.props.watchers} 
                        onItemSelected={this.handleWatcherSelect}/>
                    <WatcherDetails 
                        className={styles.containerItemAlign} 
                        selectedWatcher={this.state.selectedWatcher} />
                </div>
            </div>
        )
    }
}