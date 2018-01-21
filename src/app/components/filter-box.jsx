import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './filter-box.css';

export default class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.resetIfEsc = this.resetIfEsc.bind(this);
    }
    reset() {
        this.props.onChangeEvent('');
    }

    resetIfEsc(e) {
        const ESC_CODE = 27;
        if (e.target.value && e.keyCode === ESC_CODE) {
            this.props.onChangeEvent('');
        }
    }

    render() {
        return <div className={styles.container}>
            <input aria-label="search" autoComplete="off" spellCheck="false" required type="text" className={styles.searchBox} value={this.props.value} onKeyDown={this.resetIfEsc} onChange={(e) => this.props.onChangeEvent(e.target.value)} />
            <button className={styles.resetButton} onClick={this.reset}>X</button>
        </div>;
    }
}

FilterBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeEvent: PropTypes.func.isRequired
};