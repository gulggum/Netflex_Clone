import { fetchMovies, IGetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { MakeImagePath } from "../utils";
import styled from "styled-components";
import { AnimatePresence, delay, motion } from "framer-motion";
import { useState } from "react";

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

const Slider = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -100px;
  button {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    font-size: 20px;
    border: none;
    cursor: pointer;
    z-index: 1;
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const SlideWrapper = styled(motion.div)`
  padding: 0px 82px;
  width: 100%;
  display: flex;
  gap: 8px;
  position: absolute;
`;
const SlideBox = styled(motion.div)<{ bgImage: string }>`
  width: 300px;
  height: 180px;
  background-color: white;
  color: black;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center ceter;
  border-radius: 5px;
  text-align: center;
  line-height: 180px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.white.lighter};
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const sliderVariant = {
  start: (back: boolean) => ({
    x: back ? -window.outerWidth : window.outerWidth,
  }),
  end: { x: 0 },
  exit: (back: Boolean) => ({
    x: back ? window.outerWidth : -window.outerWidth,
  }),
};

const slideBoxVariants = {
  basic: { scale: 1 },
  hover: {
    scale: 1.5,
    cursor: "pointer",
    y: -100,
    transition: {
      type: "between",
    },
  },
};

const offset = 6;

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>("movies", fetchMovies);
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const onSliderPrev = () => {
    if (data) {
      if (leaving) return; //현재 애니메이션이 진행 중이면 클릭 무시
      onExitComplete(); //애니메이션이 진행중임을 설정
      setBack(true);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
    }
  };
  const onSliderNext = () => {
    if (data) {
      if (leaving) return;
      onExitComplete();
      setBack(false);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev + 1) % maxIndex); //index값은 0,1,2,3에서 순환 6개씩나오는 한 page가 1 index}
    }
  };
  const onExitComplete = () => setLeaving(false); //애니메이션 완료후 leaving 상태를 false설정

  console.log(isLoading, data);
  return (
    <Wrapper>
      {isLoading ? (
        "Loding..."
      ) : (
        <>
          <Banner bgImage={MakeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <AnimatePresence initial={false} onExitComplete={onExitComplete}>
            <Slider>
              <button onClick={onSliderPrev}>Prev</button>
              <SlideWrapper
                key={index}
                custom={back}
                variants={sliderVariant}
                initial="start"
                animate="end"
                exit="exit"
                transition={{ type: "tween", stiffness: 100, duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <SlideBox
                      bgImage={MakeImagePath(movie?.backdrop_path)}
                      key={movie.id}
                      variants={slideBoxVariants}
                      initial="basic"
                      whileHover="hover"
                    >
                      {movie.title}
                    </SlideBox>
                  ))}
              </SlideWrapper>
              <button onClick={onSliderNext}>Next</button>
            </Slider>
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
