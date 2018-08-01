import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { SCROLL_START, SCROLL_SUCCESS, SCOLL_FAIL } from './constants';

const initialState = {
    actionTriggered: false,
    pageLoaded: 1,
};

/**
 * For handling activities and state 
 * changes.
 */
const scrollReducer = handleActions({

    [SCROLL_START]: (state) => {
        return update(state, {
            actionTriggered: { $set: false },

        });
    },
    
    [SCROLL_SUCCESS]: (state, { payload: { actionTriggered, pageLoaded } }) => {
        return update(state, {
            actionTriggered: { $set: actionTriggered },
            pageLoaded: { $set: pageLoaded }
        });
    },

    [SCOLL_FAIL]: (state) => {
        return update(state, {
            actionTriggered: { $set: false },
        });
    },
},
 initialState,
);

export default scrollReducer;
