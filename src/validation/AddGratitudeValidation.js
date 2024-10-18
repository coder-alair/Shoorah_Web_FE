import validator from 'validator';

function AddVali(data) {
  const errors = {};
  if (validator.isEmpty(data.title.trim()))
    errors.title = 'Please enter the title.';
    if (validator.isEmpty(data.description.trim()))
    errors.description = 'Description cannot be empty.';

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default AddVali;
