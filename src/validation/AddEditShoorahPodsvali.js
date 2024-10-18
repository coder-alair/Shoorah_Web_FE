import validator from 'validator';

function AddEditShoorahPodsVali(data, focusList, selectedFile, selectedShoorahpods) {
  const errors = {};

  if (validator.isEmpty(data.podName.trim())) errors.podName = 'Please enter the title.';
  if (validator.isEmpty(data.description.trim()))
    errors.description = 'Please enter the description.';
  if (focusList.length === 0) errors.focus = 'Please select the focus.';
  if (!selectedFile && selectedFile === '' && selectedFile !== File)
    errors.podFile = 'Please select the file.';
  if (!selectedShoorahpods && selectedShoorahpods === '' && selectedShoorahpods !== File)
    errors.podImage = 'Please select the shoorah pod image.';
  if (data.podBy === 2) {
    if (validator.isEmpty(data?.expertName?.trim())) errors.expertName = 'Please enter the title.';
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default AddEditShoorahPodsVali;
