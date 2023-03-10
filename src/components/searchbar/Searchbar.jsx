import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';

import {
  Header,
  FormField,
  Input,
  Button,
  ButtonLabel,
} from './Searchbar.styled';

const initialValues = {
  queryName: '',
};
export const Searchbar = ({ onAddnewQueryName }) => {
  const hendleSubmit = (value, { resetForm }) => {
    if (value.queryName.trim() !== '') {
      console.log({ ...value });
      onAddnewQueryName({ ...value });
      resetForm();
    } else {
      toast.error('Please enter a valid image title...');
    }
  };
  return (
    <Header className="searchbar">
      <div></div>
      <Formik initialValues={initialValues} onSubmit={hendleSubmit}>
        <FormField>
          <Button type="submit" className="button">
            <FcSearch size={30} />
            <ButtonLabel className="button-label">Search</ButtonLabel>
          </Button>

          <Input
            className="input"
            name="queryName"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormField>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onAddnewQueryName: PropTypes.func.isRequired,
};
