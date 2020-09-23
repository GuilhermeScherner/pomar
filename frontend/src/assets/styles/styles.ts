import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: 
  "header"
  "nav"
  "content"
  "content"
  "content"
  "content";

  Header {
    grid-area: header;
    height: 100%
  }
  NavBar{
    grid-area: nav;
    height: 100%

  }
  .content{
    grid-area: content;
    height: 100%;
    padding: 20px;

  }
  
  @media (min-width: 500px) {
    grid-template-columns: 1fr 3fr;
    grid-template-areas: 
      "header  header"
      "nav     nav"
      "content content";
  }

  @media (min-width: 700px) {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr 6fr;
    grid-template-areas: 
      "header header  header"
      "nav content  content";

   }
`
