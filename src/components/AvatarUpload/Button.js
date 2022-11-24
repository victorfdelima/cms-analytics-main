import styled from '@emotion/styled';

export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: #3d485f;
  color: #fff;
  padding: 10px 38px;
  border-radius: 16px;
  border: none;
  font-weight: 500;
  transition: 0.25s ease;
  cursor: pointer;

  &:hover {
    background-color: #333c4f;
  }
`;
