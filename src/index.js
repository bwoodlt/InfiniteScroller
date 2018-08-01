import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import { prodImages } from "./Utils/index";
import { InfiniteScroll as Scroll } from "./components";
import "./styles.css";

const resultItem = prodImages(20, true);

function loadmoredata() {
  console.log("loading more data...");
}

function getItems() {
  let result = [];

  resultItem.map((item, index) => {
    return result.push(
      <div>
        <h3>{item.code}</h3>
        <img src={item.galleryImageMaps[0].medium.url} alt="" />
      </div>
    );
  });
  return result;
}

function App() {
  return (
    <div className="App">
      <p>A simple demonstration of an infinite scroll.</p>
      <Scroll.InfiniteScroll
        hasMore={resultItem.length !== 0}
        initialLoad={true}
        loadMoreData={loadmoredata()}
      >
        {getItems()}
      </Scroll.InfiniteScroll>
    </div>
  );
}

const store = configureStore();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
