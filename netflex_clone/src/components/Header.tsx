import styled from "styled-components";

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
const Logo = styled.div`
  font-size: 30px;
  color: ${(props) => props.theme.red};
  text-transform: uppercase;
`;
const Menus = styled.ul`
  display: flex;
  margin-left: 20px;
`;
const Menu = styled.li`
  padding: 8px 15px;
`;
const SearchBtn = styled.svg`
  width: 25px;
  fill: ${(props) => props.theme.white.lighter};
`;

const Avatar = styled.img`
  width: 33px;
  border-radius: 10px;
`;

function Header() {
  return (
    <Nav>
      <Column>
        <Logo>netflex</Logo>
        <Menus>
          <Menu>홈</Menu>
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
