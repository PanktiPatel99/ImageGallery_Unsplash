import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageResult.css";

const ImageResult = () => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setImage(e.target.value);
  };
  console.log(image);

  const handleSearch = (searchTerm) => {
    setImage(searchTerm);
    console.log("Search :", searchTerm);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/collections?page=1&per_page=20&query=${image}&client_id=cEFNMmIHU_lGv-d9Ss_ZG0OQXYX8m2tMXyQU2Gxj0_Q`
      )
      .then((resp) => {
        // console.log(resp);
        setResult(resp.data.results);
        // console.log(result);
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  }, [image]);
  console.log(result);

  return (
    <div className="ImageResult">
      <div className="search-container">
        <div className="input">
          <input
            onChange={handleChange}
            type="text"
            name="image"
            value={image}
            placeholder="Search for images"
          />
        </div>
        <div className="dropdown">
          {result
            .filter((item) => {
              const searchTerm = image.toLowerCase();
              const imageTitle = item.title.toLowerCase();

              return (
                searchTerm &&
                imageTitle.startsWith(searchTerm) &&
                imageTitle !== searchTerm
              );
            })
            .slice(0, 10)
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

      <div className="result-box">
        {result.length !== 0 ? (
          <div className="result">
            {result.title !== "undefined" &&
              result.map((image, i) => {
                return (
                  <div className="card" key={i}>
                    <img src={image.cover_photo.urls.small} alt="" />
                  </div>
                );
              })}
          </div>
        ) : (
          <div>
            <h2>No Result Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResult;
