import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './component-item.css';

export default class ComponentItem extends React.Component {
    render() {
        return <div className={styles.container}>
            <img src={this.props.icon} />
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.amount}>{this.props.amount}</div>
        </div>;
    }
}

ComponentItem.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.any
};