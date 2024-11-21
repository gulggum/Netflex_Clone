import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  padding: 18px 80px;
  position: fixed;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  &:last-child {
    gap: 20px;
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
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
`;
const SearchBtn = styled.svg`
  width: 25px;
  fill: ${(props) => props.theme.white.lighter};
  cursor: pointer;
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
            홈<Dot></Dot>
          </Menu>
          <Menu>시리즈</Menu>
          <Menu>영화</Menu>
          <Menu>NEW!요즘 대세 콘텐츠</Menu>
          <Menu>내가 찜한 리스트</Menu>
          <Menu>언어별로 찾아보기</Menu>
        </Menus>
      </Column>
      <Column>
        <SearchBtn xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </SearchBtn>
        <Avatar src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/lhyto1234-1718000814.jpg"></Avatar>
      </Column>
    </Nav>
  );
}

export default Header;
