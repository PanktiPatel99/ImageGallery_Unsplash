import React, { useState } from "react";
import "./Images.css";
import axios from "axios";

const Images = () => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = () => {
    console.log(image);

    axios
      .get(
        "https://api.unsplash.com/search/photos?page=1&per_page=20&query=" +
          image +
          "&client_id=cEFNMmIHU_lGv-d9Ss_ZG0OQXYX8m2tMXyQU2Gxj0_Q"
      )
      .then((resp) => {
        console.log(resp);
        setResult(resp.data.results);
        console.log(result);
      });
  };

  return (
    <div className="Images">
      <div className="input">
        <input
          onChange={handleChange}
          type="text"
          name="image"
          placeholder="Search for images"
        />
        <button onClick={handleSubmit} type="submit">
          Search
        </button>
      </div>

      <div className="result">
        {result.map((image, i) => (
          <>
            <div key={i} className="card">
              <img src={image.urls.thumb} alt="" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Images;
