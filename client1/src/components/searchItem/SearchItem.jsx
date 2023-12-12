import { Link } from "react-router-dom";
import "./searchItem.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
const SearchItem = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  // console.log(location.state);
  console.log("Item:", item);
  return (
    <div className="searchItem">
       <img src= {item.photos.length == 0 ? "":item.photos[0]} height= {200} width={200} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          
          

          <button
  className="siCheckButton"
  onClick={() => {
    navigate(`/hotels/${item._id}`, { state: { destination, dates, options } });
  }}
>
  See availability
</button>
            
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
