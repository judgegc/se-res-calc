import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import ComponentList from './component-list';

import styles from './resource-requirements.css';

export default class ResourceRequirements extends React.Component {
    render() {
        if (this.props.components.length) {
            return <div className={styles.container}>
                <ComponentList key="components" title={'Components'} items={this.props.components} />
                <ComponentList key="materials" title={'Materials'} items={this.props.materials} />
                <ComponentList key="ores" title={'Ores'} items={this.props.ores} />
            </div>;
        }
        return <div>
            <div className={styles.placeholder}>Click on block to add</div>
        </div>;
    }
}

ResourceRequirements.propTypes = {
    components: PropTypes.array.isRequired,
    materials: PropTypes.array.isRequired,
    ores: PropTypes.array.isRequired
};