import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ReactTooltip from 'react-tooltip';
import ComponentList from './component-list';
import ComponentItem from './component-item';

import styles from './block-item.css';

export default class BlockItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false };
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    mouseOver() {
        this.setState({ hover: true });
    }

    mouseOut() {
        this.setState({ hover: false });
    }

    onClick() {
        if (this.props.enabled && this.props.onClick) {
            this.props.onClick();
        }
    }

    componentsObjToArray(components) {
        const result = [];
        Object.keys(components).forEach(n => {
            const component = components[n];
            result.push({ ...component, name: n });
        });
        return result;
    }
    components(type) {
        const components = this.props.item.components[type];
        if (components) {
            return <ComponentList key={type} title={type} items={this.componentsObjToArray(components)} />;
        }
        return [];
    }

    renderTooltip() {
        if (!this.state.hover) {
            return null;
        }

        return <ReactTooltip delayShow={70} className={classNames(styles.components, { [styles.disabled]: !this.props.enabled })} id={this.props.item.name} place="bottom" type="dark" effect="solid" >
            <div className={styles.tooltipTitle}>{this.props.item.title}</div>
            {this.components('small')}
            {this.components('large')}
        </ReactTooltip>;
    }

    render() {
        return <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.onClick}>
            <img alt={this.props.item.title} data-tip data-for={this.props.item.name} src={this.props.item.icon} className={classNames(styles.item, { [styles.disabled]: !this.props.enabled })} draggable="false" />
            {this.renderTooltip()}
        </div>;
    }
}

BlockItem.propTypes = {
    enabled: PropTypes.bool,
    item: PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string,
        components: PropTypes.object
    }).isRequired,
    onClick: PropTypes.func
};