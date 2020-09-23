import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  :root{
    font-size: 60%;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background-color: #FEFEFE;
  }


  body, input, span, button{
    outline: none;
    font: 400 1.6rem Rubik;
    color: var(--color-text);
  }

#root{
  height: 100vh;

}

  .App{
    height: 100%;
  }


  @media(min-width: 700px){
    :root{
      font-size: 62.5%;
    }

  }
`;