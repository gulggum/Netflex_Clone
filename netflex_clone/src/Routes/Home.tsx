import { fetchMovies, IGetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { MakeImagePath } from "../utils";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { url } from "inspector";

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
  cursor: pointer;
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

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.darker};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  height: 100px;
  font-size: 10px;
`;

const ModalBox = styled(motion.div)`
  width: 40vw;
  height: 90vh;
  background-color: ${(props) => props.theme.black.darker};
  position: fixed;
  top: 10%;
  left: 30%;
  z-index: 2;
  border-radius: 5px;
  button {
    width: 40px;
    height: 40px;
    padding: 5px;
    background: none;
    border-radius: 20px;
    border: 1px solid ${(props) => props.theme.white.lighter};
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-right: 20px;
    cursor: pointer;
    svg {
      width: 15px;
      fill: ${(props) => props.theme.white.lighter};
    }
  }
`;

const ModalImage = styled.div<{ modalImg: string }>`
  width: 100%;
  height: 400px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.modalImg});

  background-position: center enter;
  background-size: cover;
`;

const ModalInfo = styled.div`
  padding: 0px 40px;
`;
const ModalTitle = styled.h3`
  font-size: 50px;
  position: relative;
  top: -60px;
`;
const ModalOverview = styled.p`
  font-size: 20px;
  line-height: 30px;
`;

const ModalBg = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 130vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
`;

//애니메이션 variant
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
    y: -100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: {
      type: "tween",
      delay: 0.8,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    transition: {
      type: "tween",
      delay: 0.8,
      pointerEvents: "auto",
    },
  },
};

const offset = 6;

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>("movies", fetchMovies);
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  //url과 일치여부 확인
  const navigate = useNavigate();
  const onClickedMatch = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const modalMovieMatch = useMatch("/movies/:movieId");
  console.log(modalMovieMatch);

  //modal창 닫기-> home으로 되돌리기
  const onOutModal = () => {
    navigate("/");
  };

  //클릭한 영화찾기 true && true
  const clickedMovie =
    modalMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === modalMovieMatch.params.movieId
    );
  console.log(clickedMovie);

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
                      layoutId={movie.id + ""}
                      bgImage={MakeImagePath(movie?.backdrop_path)}
                      key={movie.id}
                      variants={slideBoxVariants}
                      initial="basic"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={() => onClickedMatch(movie.id)}
                    >
                      {movie.title}

                      <Info variants={infoVariants}>
                        <h4>
                          {movie.title}({movie.release_date})
                        </h4>
                      </Info>
                    </SlideBox>
                  ))}
              </SlideWrapper>
              <button onClick={onSliderNext}>Next</button>
            </Slider>
          </AnimatePresence>
          <AnimatePresence>
            {modalMovieMatch ? (
              <>
                <ModalBox layoutId={modalMovieMatch.params.movieId}>
                  <button>
                    <svg
                      onClick={onOutModal}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  </button>
                  {clickedMovie && (
                    <>
                      <ModalImage
                        modalImg={MakeImagePath(
                          clickedMovie.backdrop_path,
                          "w500"
                        )}
                      ></ModalImage>
                      <ModalInfo>
                        <ModalTitle>{clickedMovie.title}</ModalTitle>
                        <ModalOverview>{clickedMovie.overview}</ModalOverview>
                      </ModalInfo>
                    </>
                  )}
                </ModalBox>
                <ModalBg onClick={onOutModal}></ModalBg>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
