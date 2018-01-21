import React from 'react';
import { connect } from 'react-redux';
import { compareTwoStrings } from 'string-similarity';

import { addBlockToProject } from './../actions';

import BlockPalette from './../components/block-palette';

const divideBySize = (blocks, size) => {
    const available = [];
    const remaining = [];

    blocks.forEach(b => {
        if (b.components[size]) {
            available.push(b);
        } else {
            remaining.push(b);
        }
    });
    return [[...available], [...remaining]];
};

const sortBlocks = (blocks, filter) => {
    if (!filter) {
        return blocks.sort((l, r) => l.title < r.title ? -1 : r.title < l.title ? 1 : 0);
    }
    const similarities = blocks.map(b => ({ block: b, sim: compareTwoStrings(filter, b.title) }));
    return similarities.sort((l, r) => r.sim - l.sim).map(x => x.block);
};

const getFilteredBlocks = (blocks, filter, mode) => {
    const [available, remaining] = divideBySize(blocks, mode);
    return [...sortBlocks(available, filter).map(b => ({ ...b, enabled: true })), ...sortBlocks(remaining, filter).map(b => ({ ...b, enabled: false }))];
};

export default connect(state => ({ blocks: getFilteredBlocks(state.blocks, state.filter, state.projectMode), filter: state.filter }),
    { onItemClick: b => addBlockToProject(b) })(BlockPalette);