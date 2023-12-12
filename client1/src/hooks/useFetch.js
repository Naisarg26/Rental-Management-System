import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (api_extension) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8080/server1'+api_extension);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [api_extension]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/server1'+api_extension);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
