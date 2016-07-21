const initialState = {};

export default function userstate(state = initialState, action) {

    switch (action.type) {

        case 'NOT_IMPLEMENTED':
            // TODO
            return state;

        default:
            return state;
    }
}