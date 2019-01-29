import styled from 'styled-components'

export const Style = styled.div`
  width: 100%;
  height: 72px;
  background-color:#343945;
  
  .wrapper {
    box-sizing: border-box;
    width: 1200px;
    padding: 24px;
    margin: 0 auto;
    
    .logo {
      float: left;
      display: inline-block;
      svg {
       height: 24px;
        width: 178px;
      }
    }
  
   .copyright {
      float: right;
      display: inline-block;
      line-height: 24px;
      font-size: 14px;
      color: #fff;
      opacity: 0.8;
   }
  }
`
