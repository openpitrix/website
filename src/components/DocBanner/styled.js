import styled from 'styled-components'

export const Style = styled.div`
  width: 100%;
  height: 412px;
  background-image: radial-gradient(circle at 46% 0, #8454cd, #343945);
  
 .title {
    padding: 186px 0 24px 202px;
    font-size: 40px;
    font-weight: 500;
    color: #fff;
    margin: 0;
  }
  
 .search {
    position: relative;
    margin-left: 202px;
    width: 460px;
    height: 48px;
  
   input {
      box-sizing: border-box;
      width: 100%;
      padding: 12px 12px 12px 60px;
      line-height: 24px;
      font-size: 16px;
      border-radius: 24px;
      background-color: #d5dae5;;
      border: 0 none;
      box-shadow: none;
      outline:none;
      cursor: pointer;
      
      &:hover, &:focus{
        background-color: #fff;
      }
   }
 }
`
