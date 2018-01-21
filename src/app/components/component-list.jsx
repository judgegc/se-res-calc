import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import ComponentItem from './component-item';

import styles from './component-list.css';

export default class ComponentList extends React.Component {
    amountFilter(val) {
        return Number.isInteger(val) ? val : val.toFixed(2);
    }
    render() {
        return <div>
            <div className={styles.title}>{this.props.title}</div>
            {this.props.items.map(i => <ComponentItem key={i.name} icon={i.component.icon} title={i.component.title} amount={this.amountFilter(i.amount)} />)}
        </div>;
    }
}

ComponentList.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};