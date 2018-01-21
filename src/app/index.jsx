import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import FilterBoxContainer from './containers/filter-box-container';
import FilteredBlocks from './containers/filtered-blocks';
import ProjectZone from './containers/project-zone';
import ProjectMode from './containers/project-mode';

import ResourceRequirements from './containers/resource-requirements';

import styles from './app.css';

import resourceCalc from './reducers';

class App extends React.Component {
    render() {
        return <div>
            <div className={styles.header}>
                <img className={styles.icon} alt="logo" src={`${ASSETS_DIR}/images/icon.png`} />
                <FilterBoxContainer />
            </div>
            <FilteredBlocks />
            <div>
                <div className={styles.calcZone}>
                    <div>
                        <div className={styles.projectMode}>
                            <ProjectMode />
                        </div>
                        <ProjectZone />
                    </div>
                    <ResourceRequirements />
                </div>
            </div>
        </div>;
    }
}

const store = createStore(resourceCalc/* ,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */);

render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('app'));