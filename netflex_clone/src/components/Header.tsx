import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useMatch } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  padding: 15px 80px;
  position: fixed;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  &:last-child {
    gap: 20px;
    position: relative;
  }
`;
const Logo = styled(motion.div)`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.red};
  text-transform: uppercase;
  cursor: pointer;
`;
const Menus = styled.ul`
  display: flex;
  margin-left: 20px;
`;
const Menu = styled.li`
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dot = styled(motion.div)`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: ${(props) => props.theme.red};
  margin-top: 10px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
`;
const SearchBtn = styled(motion.svg)`
  width: 25px;
  fill: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const SearchInput = styled(motion.input)`
  transform-origin: right center;
  background: none;
  border: 1px solid ${(props) => props.theme.white.lighter};
  padding: 8px;
  margin-left: 5px;
`;

const Avatar = styled.img`
  width: 33px;
  border-radius: 10px;
  cursor: pointer;
`;

const logoVariant = {
  start: { color: " #E51013" },
  middle: { color: "#fff" },
  active: {
    color: "#E51013",

    transition: {
      repeat: Infinity,
    },
  },
};

function Header() {
  //헤더에 검색버튼 클릭시 input 열기구현
  const [searchBox, setSearchBox] = useState(false);
  const onClick = () => {
    setSearchBox((prev) => !prev);
  };

  //메뉴버튼 클릭시 Dot으로 표기 => useMatch 사용
  const homeMatch = useMatch("/");
  const seriesMatch = useMatch("series");
  const movieMatch = useMatch("movie");
  const hotContentsMatch = useMatch("hotContents");
  const myLikeMatch = useMatch("myLike");
  const langMatch = useMatch("lang");

  return (
    <Nav>
      <Column>
        <Logo
          variants={logoVariant}
          initial="start"
          animate="middle"
          whileHover="active"
        >
          netflex
        </Logo>
        <Menus>
          <Menu>
            <Link to={"/"}>홈</Link>
            {homeMatch && <Dot layoutId="hey" />}
          </Menu>
          <Menu>
            <Link to={"/series"}>시리즈</Link>
            {seriesMatch && <Dot layoutId="hey" />}
          </Menu>
          <Menu>
            <Link to={"/movie"}>영화</Link>
            {movieMatch && <Dot layoutId="hey" />}
          </Menu>
          <Menu>
            <Link to={"/hotContents"}>NEW!요즘 대세 콘텐츠</Link>
            {hotContentsMatch && <Dot layoutId="hey" />}
          </Menu>
          <Menu>
            <Link to={"/myLike"}>내가 찜한 리스트</Link>
            {myLikeMatch && <Dot layoutId="hey" />}
          </Menu>
          <Menu>
            <Link to={"/lang"}>언어별로 찾아보기</Link>
            {langMatch && <Dot layoutId="hey" />}
          </Menu>
        </Menus>
      </Column>
      <Column>
        <Search>
          <SearchBtn
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </SearchBtn>
          {searchBox ? (
            <SearchInput placeholder="제목,사람,장르"></SearchInput>
          ) : null}
        </Search>
        <Avatar src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/lhyto1234-1718000814.jpg"></Avatar>
      </Column>
    </Nav>
  );
}

export default Header;
