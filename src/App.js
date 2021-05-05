import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ImageList from "./components/ImageList";
import logo from "./logo.png";

const App = () => {
  const [images, setImages] = useState([]);
  const ApiKye = process.env.REACT_APP_PIXABAY_APIKEY;
  const onSearchSubmit = async (term) => {
    try {
      const params = {
        key: ApiKye,
        q: term,
      };
      const response = await axios.get("https://pixabay.com/api/", { params });
      setImages(response.data.hits);
      if (response.data.total === 0) {
        alert("お探しの画像はありません");
      }
    } catch {
      alert("写真の取得に失敗しました");
    }
  };
  return (
    <>
      <div className="ui container" style={{ marginTop: "20px" }}>
        <img src={logo} alt="pixabay-logo" className="pixabay-logo" />
        <SearchBar onSubmit={onSearchSubmit}></SearchBar>
        <ImageList images={images} />
      </div>
    </>
  );
};

export default App;
