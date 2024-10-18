import validator from 'validator';

function AddEditRitualsVali(data, focusList) {
  const errors = {};
  if (validator.isEmpty(data.ritualName.trim())) errors.ritualName = 'Please enter the title.';
  if (focusList.length === 0) errors.focus = 'Please select the focus.';

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default AddEditRitualsVali;
