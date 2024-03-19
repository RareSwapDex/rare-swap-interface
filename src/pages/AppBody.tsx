import React from 'react';
import styled from 'styled-components';

export const BodyWrapper = styled.div`
  margin-top: 3rem;
  position: relative;
  max-width: 500px;
  width: 100%;
  padding: 0.2rem;
  border-radius: 1.6rem;
  box-shadow: 0 0 15px white;
  // background: ${({ theme }) => theme.bg1};

  // background-color: #f8f8f4;
  // backdrop-filter: blur(10px); /* Adjust the blur level as needed */

  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent background */
  backdrop-filter: blur(20px); /* Adjust the blur level as needed */

  box-shadow: 8px 10px 35px -8px rgba(148, 123, 217, 0.75);
  -webkit-box-shadow: 8px 10px 35px -8px rgba(148, 123, 217, 0.75);
  -moz-box-shadow: 8px 10px 35px -8px rgba(148, 123, 217, 0.75);

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 90%;
  `}
`;

export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
