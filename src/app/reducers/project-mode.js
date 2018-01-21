export default (state = 'small', action) => {
    switch (action.type) {
        case 'SET_PROJECT_MODE':
            return action.mode;
        default:
            return state;
    }
};