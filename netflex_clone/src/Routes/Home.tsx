import { fetchMovies, IGetMoviesResult } from "../api";
import { useQuery } from "react-query";

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>("movies", fetchMovies);
  console.log(data);
  return <div>{isLoading ? "Loding..." : null}</div>;
}

export default Home;
