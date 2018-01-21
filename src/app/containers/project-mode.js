import React from 'react';
import { connect } from 'react-redux';

import { setProjectMode } from './../actions';

import SegmentedButtons from './../components/segmented-buttons';

const buttonsBuilder = state => {
    const buttons = [
        { title: 'Small', name: 'small', enabled: true },
        { title: 'Large', name: 'large', enabled: true }];
    if (state.projectBlocks.length) {
        return buttons.map(b => b.name === state.projectMode ? b : { ...b, enabled: false });
    }

    return buttons;
};

export default connect(state => ({ name: 'projectMode', selected: state.projectMode, buttons: buttonsBuilder(state) }),
    { onChange: mode => setProjectMode(mode) })(SegmentedButtons);