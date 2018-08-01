import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notifyUser } from '../../Utils';
import * as actions from './actions';
/**
 * Attaches to a child and provide a scroll feature
 * fetching new sets of products on refresh
 * @param {*} Component 
 */

export class InfiniteScroll extends Component {
        
    constructor() {
        super();
        this.state = {
            showLoader: false,
            lastScrollTop: 0,
            currentPage: 0,
        };
        this.scrollListener = this.scrollListener.bind(this);
        this.notifyUser = notifyUser.bind(this);
    }

    attachScrollListener() {
        const { isInitialLoad } = this.props;

        // use main height for the ref
        const scrollElement = this.scrollComponent.parentNode;

        // Attach scroll listener to the scrollable target
        scrollElement.addEventListener('scroll', this.scrollListener);

        if (isInitialLoad) {
            this.scrollListener();
        }
    }

    detachScrollListener() {
        const { height } = this.props;
        
        this.scrollableNode = this.scrollComponent;
        this.el = height ? this._infScroll : this.scrollableNode;
        this.el.removeEventListener('scroll', this.scrollListener);
    }
    

    isElementAtBottom(target, scrollThreshold) {
        const element = this.scrollComponent;
        const offset = element.scrollHeight - element.parentNode.scrollTop - element.parentNode.clientHeight;
        return offset < Number(scrollThreshold);
    }

    setDefaultLoader(loader) {
        this.defaultLoader = loader;
    }

    componentDidMount() {
        this.pageLoaded = this.props.pageStart;
        this.attachScrollListener();
    }


    componentWillUnmount() {
        this.detachScrollListener();
    }

    /**
     * The scroller listening for event
     */
    scrollListener() {
        let atBottom = false;
        const { threshold, loadMoreData, hasMore, handleScrollItems } = this.props;

        const target = this.scrollComponent;

        atBottom = this.isElementAtBottom(target, threshold);
        if (atBottom) {
            handleScrollItems(hasMore, loadMoreData);
            this.detachScrollListener();
        }
    }
    render() {
        const { children, hasMore, loader } = this.props;
        const childrenArray = [children];

        if (hasMore) {
            if (loader) {
                childrenArray.push(loader);
            }
            if (this.defaultLoader) {
                childrenArray.push(this.defaultLoader);
            }
        }

        return (
          <div {...this.props} ref={node => (this.scrollComponent = node)}>
            {childrenArray} 
          </div>
        );
    }
    };

InfiniteScroll.propTypes = {
    children: PropTypes.node.isRequired,
    hasMore: PropTypes.bool,
    element: PropTypes.node,
    isInitialLoad: PropTypes.bool,
    ref: PropTypes.func,
    loader: PropTypes.node,
    loadMoreData: PropTypes.func.isRequired,
    threshold: PropTypes.number,
};

InfiniteScroll.defaultProps = {
    element: 'div',
    hasMore: false,
    isInitialLoad: false,
    threshold: 250,
    pageStart: 0,
    ref: null,
    loader: null,
};

const mapStateToProps = (state) => {
    return {
        actionTriggered: state.scrollData.actionTriggered,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleScrollItems: (hasMore, loadMoreData) => dispatch(actions.handleScrollItems(hasMore, loadMoreData)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScroll);
