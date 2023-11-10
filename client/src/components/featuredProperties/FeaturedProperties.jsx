import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  // Check if 'data' is an array before attempting to map over it
  const isValidDataArray = Array.isArray(data);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : error ? ( // Check if there is an error and display a message
        <p>Error loading featured properties.</p>
      ) : isValidDataArray ? ( // If 'data' is an array, render the list
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      ) : ( // If 'data' is not an array, render a suitable fallback or message
        <p>No featured properties available.</p>
      )}
    </div>
  );
};

export default FeaturedProperties;
