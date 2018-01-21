import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './segmented-buttons.css';

export default class SegmentedButtons extends React.Component {
    onChange(name) {
        if (this.props.buttons.some(b => b.name === name && b.enabled)) {
            this.props.onChange(name);
        }
    }

    renderButtons() {
        return this.props.buttons.map(b => <div key={b.name} >
            <input type="radio" name={this.props.name} id={b.name} checked={this.props.selected === b.name} onChange={this.onChange.bind(this, b.name)} />
            <label htmlFor={b.name} className={classNames({ [styles.disabled]: !b.enabled })} >{b.title}</label>
        </div>);
    }

    render() {
        return <div className={styles.container}>
            {this.renderButtons()}
        </div>;
    }
}

SegmentedButtons.propTypes = {
    name: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, name: PropTypes.string, enabled: PropTypes.bool })).isRequired,
    onChange: PropTypes.func.isRequired
};