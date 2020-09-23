import styled from 'styled-components';

export const Card = styled.div`
    height: 235px;
    width: 235px;
    border: 1px solid black;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    transition: 0.3s;
    cursor: pointer;
    padding: 5px;
    h3{
        text-align: center;
    }
    p{
        margin-left: 20px;
    }
    .info{
        margin-top: 5px;
        margin-bottom: 40px;
        text-align: start;
    }
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
    }

    input{
        width: 70px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid black;
    }
    span{
      margin-right: 5px;
    }
    textarea{
      height: 65px;
      width: 220px;
      resize: none;
    }

    .buttons{
        padding-top: 5px;
        display: flex;
        justify-content: space-around;
        
    }
    `;

export const ContainerModal = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 300px;
    button{
        width: 50px;
        background:none;
        cursor: pointer;
        float: right;
    }
    label{
        padding-left: 16px;
        width:125px;
        text-transform: uppercase;
        display:inline-block
    }

    form{
        &>div{
            margin: 20px;
        }

        textarea{
            height: 100px;
            width: 190px;
            resize: none;
        }
    }
`

export const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    }
  };