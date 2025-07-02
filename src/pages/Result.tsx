import { useParams } from "react-router-dom";
import ResultComp from "../components/ResultComp";
import { useEffect, useState } from "react";
import fetchData from "../api/fetchData";

const Result = () => {
  const { id } = useParams();

  const [results, setResults] = useState<any>([]);

  const fetchSearchResults = async () => {
    const response = await fetchData.fetchSearchResults(id);
    setResults(response);
    console.log(results)
  };

  useEffect(() => {
    fetchSearchResults();
  }, [id]);
  return (
    <div>
      {results?.results?.length > 0 ? <ResultComp /> : <div>No results found</div>}
    </div>
  );
};

export default Result;
