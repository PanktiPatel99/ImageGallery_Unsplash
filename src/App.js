import React from "react";
import "./App.css";

// import Images from "./Components/Images";
import ImageResult from "./Components/ImageResult";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Image Gallery</header>
      {/* <Images /> */}
      <ImageResult />
    </div>
  );
};

export default App;
