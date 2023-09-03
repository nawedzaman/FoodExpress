import React from "react";
import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const ShimmerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100vh;
`;

const ShimmerCardItem = styled.div`
  position: relative;
  overflow: hidden;
  width: 400px;
  border-radius: 8px;
  margin-top: 10px;
  margin: 10px;
  height: 300px;
`;

const ShimmerContent = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 38%, #f6f7f8 54%);
  background-size: 200px 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
`;

const ShimmerCard = ({ count = 12 }) => {
  const shimmerCards = Array.from({ length: count }, (_, index) => (
    <ShimmerCardItem key={index}>
      <ShimmerContent />
    </ShimmerCardItem>
  ));

  return <ShimmerContainer>{shimmerCards}</ShimmerContainer>;
};

export default ShimmerCard;
