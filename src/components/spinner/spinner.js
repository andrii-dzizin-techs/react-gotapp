import React from 'react';
import styled from 'styled-components';

const SpinnerBlock = styled.div`
  width: 200px;
  height: 200px;
  // display: inline-block;
  display: block;
  overflow: hidden;
  // background: #f1f2f3;
  margin: 0 auto;
  @keyframes ldio-l3kxkgrehon {
    0% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 18px;
      left: 18px;
      width: 156px;
      height: 156px;
      opacity: 0;
    }
  }
  .ldio-l3kxkgrehon div {
    position: absolute;
    border-width: 4px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    animation: ldio-l3kxkgrehon 1s cubic-bezier(0,0.2,0.8,1) infinite;
  }
  .ldio-l3kxkgrehon div:nth-child(1) {
    border-color: #1d3f72;
    animation-delay: 0s;
  }
  .ldio-l3kxkgrehon div:nth-child(2) {
    border-color: #5699d2;
    animation-delay: -0.5s;
  }
  .ldio-l3kxkgrehon {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-l3kxkgrehon div { box-sizing: content-box; }
`;

const Spinner = () => {
  return(
  <SpinnerBlock>
    <div className="ldio-l3kxkgrehon">
      <div></div>
      <div></div>
    </div>
  </SpinnerBlock>
  )
}

export default Spinner



