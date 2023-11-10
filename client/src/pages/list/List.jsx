import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  // Check if 'data' is an array before attempting to map over it
  const isValidDataArray = Array.isArray(data);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {/* ... other code ... */}
          <div className="listResult">
            {loading ? (
              "loading"
            ) : error ? (
              <p>Error fetching data.</p>
            ) : isValidDataArray ? (
              data.map((item) => <SearchItem item={item} key={item._id} />)
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
