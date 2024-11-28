import { fetchMovies, IGetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { MakeImagePath } from "../utils";
import styled from "styled-components";
const Wrapper = styled.div``;
const Banner = styled.div<{ bgImage: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
    url(${(props) => props.bgImage});
  background-size: cover;
`;
const Title = styled.h1`
  font-size: 70px;
  padding: 0px 80px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 20px;
  padding: 0px 82px;
  width: 50%;
  line-height: 30px;
`;

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>("movies", fetchMovies);
  console.log(isLoading, data);
  return (
    <Wrapper>
      {isLoading ? (
        "Loding..."
      ) : (
        <Banner bgImage={MakeImagePath(data?.results[0].backdrop_path || "")}>
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </Banner>
      )}
    </Wrapper>
  );
}

export default Home;
