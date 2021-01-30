import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  width: 100%;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

Button.External = styled(Button)`
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  text-transform: none;
  text-align: left;
  &:disabled {
    background-color: #97979740;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastText};
    font-weight: 400;
    font-size: 16px;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
