import { combineReducers } from 'redux';

import filter from './filter';
import blocks from './blocks';
import projectBlocks from './project-blocks';
import projectMode from './project-mode';

const resourceCalc = combineReducers({
    filter,
    blocks,
    projectBlocks,
    projectMode
});

export default resourceCalc;