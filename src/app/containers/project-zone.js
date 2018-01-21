import React from 'react';
import { connect } from 'react-redux';

import { removeBlockFromProject, clearProjectZone } from './../actions';

import ProjectZone from './../components/project-zone';

const zoneDimension = state => {
    const defaultDim = { columns: 4, rows: 4 };
    if (state.projectBlocks.length > defaultDim.columns * defaultDim.rows) {
        const sr = Math.sqrt(state.projectBlocks.length);
        const fl = Math.floor(sr);
        if (fl === sr) {
            return { columns: fl, rows: fl };
        }
        return { columns: fl + 1, rows: fl + Math.round(sr - fl) };
    }

    return defaultDim;
};

export default connect(state => ({ blocks: state.projectBlocks, ...zoneDimension(state) }),
    { onItemClick: bName => removeBlockFromProject(bName), onClear: () => clearProjectZone() })(ProjectZone);