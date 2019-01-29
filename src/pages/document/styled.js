import styled from 'styled-components'

export const Style = styled.div` 
  margin-top: 72p;
  background-color: #eff0f5;
  
.documents {
  width: 800px;
  margin: 40px auto 16px;
  overflow: hidden;

  .cardOuter {
    float: left;
    display: inline-block;
    margin: 0 24px 24px 0;
    width: calc(50% - 12px);
    padding: 24px;
    background-color: #fff;
    border-radius: 3px;

    &:nth-child(2n+2) {
      margin-right: 0;
    }

    &:nth-child(3) {
      height: 250px;
    }

    .icon {
      float: left;
      display: inline-block;
      width: 48px;
      height: 48px;
    }
  }

  .card {
    margin-left: 56px;
    .title {
      margin-bottom: 4px;
      line-height: 24px;
      font-size: 16px;
      a {
        color: #343945;

        &:hover, &:active {
          color: #8454cd;
        }
      }
    }

    .describe {
      margin-bottom: 24px;
      line-height: 18px;
      font-size: 12px;
      color: #69748c;
    }

    .tagLink{
      display: inline-block;
      margin: 0 12px 12px 0;
      padding: 4px 16px;
      line-height: 24px;
      font-size: 12px;
      font-weight: 300;
      border-radius: 12px;
      background-color: #eff0f5;
      color: #78839e;
      cursor: pointer;

      &:hover {
        background-color: #efe6f8;
        color: #6d35c3;
      }
    }
  }
}                                                                       
                                                                              
@media only screen and (min-width: 768px) {                                    
  .main-body {                                                                 
    padding: 64px 24.0972222%;                                                 
    > div {                                                                    
      width: 50%;                                                              
      margin-bottom: 64px;                                                     
    }                                                                          
    span {                                                                     
      width: 65%;                                                              
    }                                                                          
  }                                                                            
  footer {                                                                     
    margin: 24px 184px;                                                        
    .l-right {                                                                 
      a {                                                                      
        display: inline-block;                                                 
      }                                                                        
    }                                                                          
  }                                                                            
}                                                                              
@media only screen and (min-width: 1280px) {                                   
  .main-body {                                                                 
    > div {                                                                    
    width: 33.3%;                                                              
    margin-bottom: 64px;                                                       
    }                                                                          
  }                                                                            
}                                                                              
`
