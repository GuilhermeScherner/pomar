import styled from 'styled-components';


export const Nav = styled.nav`
  background: #49A768;
  display: flex;
  flex-direction: column;

  a{
    width: 100%;
    text-decoration: none;
    outline: none;
  }
`;

export const ButtonOptions = styled.button`
  background: ${props => props.color};
  width: 100%;
  border: none;
  height: 40px;
  cursor: pointer;
  color: black;
  &:hover{
    background: #267445;
  }
`
