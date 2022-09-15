import React, { useState } from "react";
import "./Images.css";
import axios from "axios";
import data from "./MOCK_DATA.json";

const Images = () => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setImage(e.target.value);
  };

  const handleSearch = (searchTerm) => {
    setImage(searchTerm);
    console.log("Search :", searchTerm);
  };

  const handleSubmit = (searchImage) => {
    axios
      .get(
        "https://api.unsplash.com/search/photos?page=1&per_page=20&query=" +
          searchImage +
          "&client_id=cEFNMmIHU_lGv-d9Ss_ZG0OQXYX8m2tMXyQU2Gxj0_Q"
      )
      .then((resp) => {
        console.log(resp);
        setResult(resp.data.results);
        console.log(result);
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  return (
    <div className="Images">
      <div className="search-container">
        <div className="input">
          <input
            onChange={handleChange}
            type="text"
            name="image"
            value={image}
            placeholder="Search for images"
          />
          <button onClick={() => handleSubmit(image)} type="submit">
            Search
          </button>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = image.toLowerCase();
              const imageTitle = item.title.toLowerCase();

              return (
                searchTerm &&
                imageTitle.startsWith(searchTerm) &&
                imageTitle !== searchTerm
              );
            })
            .map((item) => (
              <div
                onClick={() => handleSearch(item.title)}
                className="dropdown-row"
                key={item.title}
              >
                {item.title}
              </div>
            ))}
        </div>
      </div>

      <div className="result">
        {result.map((image, i) => (
          <>
            <div key={i} className="card">
              <img src={image.urls.small} alt="" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Images;
