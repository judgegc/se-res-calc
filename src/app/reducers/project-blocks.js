export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_BLOCK_TO_PROJECT':
            const found = state.find(b => action.block.name === b.block.name);
            if (found) {
                ++found.count;
                return [...state];
            }

            return [...state, { block: action.block, count: 1 }];
        case 'REMOVE_BLOCK_FROM_PROJECT':
            const foundIdx = state.findIndex(b => action.block === b.block.name);
            if (foundIdx === -1) {
                return state;
            }

            if (state[foundIdx].count === 1) {
                return [...state.slice(0, foundIdx), ...state.slice(foundIdx + 1)];
            }

            return state.map((b, i) => i === foundIdx ? { block: b.block, count: b.count - 1 } : b);
        case 'CLEAR_PROJECT_ZONE':
            return [];
        default:
            return state;
    }
};