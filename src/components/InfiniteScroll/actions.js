import _ from 'lodash';
import { SCROLL_START, SCROLL_SUCCESS, SCOLL_FAIL } from './constants';
/**
 * For handling scroller items
 * @param {*} hasMore 
 * @param {*} loadMore 
 * @param {*} atBottom 
 * @param {*} pageLoaded 
 */
export const handleScrollItems = (hasMore, loadMoreData) => async(dispatch, getState) => {

    const { scrollData: { actionTriggered, pageLoaded } } = getState();

    try {
        if (actionTriggered) {
            return;
        }
        if (hasMore) {
            let currentPage = pageLoaded;
            dispatch({ 
                type: SCROLL_SUCCESS, 
                payload: { actionTriggered: true } 
            });

            if (typeof loadMoreData === 'function') {
                await loadMoreData(pageLoaded);
                dispatch({
                    type: SCROLL_SUCCESS,
                    payload: { actionTriggered : false, pageLoaded: currentPage += 1 }
                });
            }
        } 
       
    } catch (error) {
        dispatch({ 
            type: MF_SCOLL_FAIL, 
            payload: { actionTriggered: false }
        });
    }

};

export default handleScrollItems;

