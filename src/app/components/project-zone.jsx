import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import StackableBlockItem from './stackable-block-item';

import styles from './project-zone.css';

export default class ProjectZone extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCells() {
        const totalCells = this.props.columns * this.props.rows;
        const empties = totalCells - this.props.blocks.length;
        const cells = [
            ...this.props.blocks.map(b => <StackableBlockItem key={b.block.name} item={b.block} enabled={true} amount={b.count} onClick={this.props.onItemClick.bind(this, b.block.name)} />),
            ...[...Array(empties).keys()].map(i => <div className={styles.empty} key={`empty_${i + totalCells - empties}`}></div>)];

        const inventory = [];

        for (let row = 0; row < this.props.rows; ++row) {
            inventory.push(<div key={`row_${row}`} className={styles.row}>
                {cells.slice(row * this.props.columns, row * this.props.columns + this.props.columns)}
            </div>);
        }
        /* this.props.blocks.forEach((b, i) => {
            cells.push(<StackableBlockItem key={b.block.name} item={b.block} enabled={true} amount={b.count} onClick={this.props.onItemClick.bind(this, b.block.name)} />);
            if ((i + 1) % this.props.columns === 0) {
                cells.push(<my-break key={`${b.block.name}_break`} />);
            }
        });

        for (let id = totalCells - empties; id < totalCells; ++id) {
            cells.push(<div className={styles.empty} key={`empty_${id}`}></div>);
            if ((id + 1) % this.props.columns === 0) {
                cells.push(<my-break key={`empty_break_${id}`} />);
            }
        } */
        return inventory;
    }

    render() {
        return <div className={styles.container}>
            <div>
                {this.renderCells()}
            </div>
            <div className={styles.clearButtonHolder}>
                <button className={styles.clearButton} onClick={this.props.onClear}>Clear</button>
            </div>
        </div>;
    }
}

ProjectZone.propTypes = {
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    blocks: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
};