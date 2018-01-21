import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './block-palette.css';

import BlockItem from './block-item';
import FilteredBlocks from './../containers/filtered-blocks';

export default class BlockPalette extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.container}>
            {this.props.blocks.map(b => <BlockItem key={b.name} enabled={b.enabled} item={b} onClick={this.props.onItemClick.bind(this, b)} />)}
        </div>;
    }
}

BlockPalette.propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string
    })).isRequired,
    onItemClick: PropTypes.func.isRequired
};