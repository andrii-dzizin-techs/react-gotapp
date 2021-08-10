import React from 'react';
import styled from 'styled-components';
import img from './error.jpg';

const ErrorBlock = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const ErrorMessage = () => {
  return(
      <ErrorBlock>
        <img src={img} alt="Error"/>
        <span>Something goes wrong</span>
      </ErrorBlock>
    )
}

export default ErrorMessage;