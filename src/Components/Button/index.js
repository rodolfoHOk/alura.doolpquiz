import styled from 'styled-components';

const Button = styled.button`
  
  background: #E91E63;
  width: 100%;
  margin-top: 25px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  
  border-radius: 4px;
  border-color: #E91E63;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);

  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.25px;
  text-transform: uppercase;

  :disabled {
    border-color: #979797;
    background-color: #979797;
  }

`;

export default Button;
