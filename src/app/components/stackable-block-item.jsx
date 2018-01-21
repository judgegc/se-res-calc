import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './stackable-block-item.css';

import BlockItem from './block-item';

export default class StackableBlockItem extends React.Component {
    render() {
        return <div className={styles.container} onClick={this.props.onClick}>
            <BlockItem item={this.props.item} enabled={this.props.enabled} />
            <span className={styles.amount}>{this.props.amount}</span>
        </div>;
    }
}

StackableBlockItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string,
        components: PropTypes.object
    }).isRequired,
    enabled: PropTypes.bool.isRequired,
    amount: PropTypes.number.isRequired,
    onClick: PropTypes.func
};