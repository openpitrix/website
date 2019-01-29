import styled from 'styled-components'

export const Style = styled.div`
  width: 100%;
  height: 286px;
  background-color:#343945;
  text-align: center;
  
 .title {
    padding: 72px 0 54px;
    font-size: 40px;
    font-weight: 500;
    color: #fff;
  }
  
 .search {
    position: relative;
    margin: 0 auto;
    width: 780px;
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
