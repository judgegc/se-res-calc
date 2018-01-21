import linker from './../data-linker';

const blocks = linker();

export default (state = Object.keys(blocks).map(name => ({ ...blocks[name], name: name })), action) => state;