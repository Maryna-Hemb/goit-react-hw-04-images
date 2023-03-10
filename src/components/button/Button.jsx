import PropTypes from 'prop-types';
import { BtnWraper, Btn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <BtnWraper>
      <Btn onClick={onClick} type="button">
        Load more
      </Btn>
    </BtnWraper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
