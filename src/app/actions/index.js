export const setFilter = filter => ({
    type: 'SET_FILTER',
    filter
});

export const addBlockToProject = block => ({
    type: 'ADD_BLOCK_TO_PROJECT',
    block
});

export const removeBlockFromProject = block => ({
    type: 'REMOVE_BLOCK_FROM_PROJECT',
    block
});

export const clearProjectZone = () => ({
    type: 'CLEAR_PROJECT_ZONE',
});

export const setProjectMode = mode => ({
    type: 'SET_PROJECT_MODE',
    mode
});