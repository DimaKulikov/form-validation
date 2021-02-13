const options = {
  formSelector: '.form',
  inputSelector: '.form__input',
  errorSelector: '.form-error-',
  errorVisibleClass: 'form__error_shown',
  submitSelector: '.form__submit',
  submitDisabledClass: 'form__submit_disabled',
  errorFadeDelay: 300
}

const showError = (input, options) => {
  const { errorVisibleClass, errorSelector } = options;
  const errorContainer = document.querySelector(errorSelector + input.id);
  errorContainer.textContent = input.validationMessage;
  errorContainer.classList.remove(errorVisibleClass);
  errorContainer.classList.add(errorVisibleClass);
}

const hideError = (input, options) => {
  const { errorVisibleClass, errorSelector, errorFadeDelay } = options;
  const errorContainer = document.querySelector(errorSelector + input.id);
  errorContainer.classList.remove(errorVisibleClass);
  setTimeout(() => errorContainer.textContent = '', errorFadeDelay)
}

const hasInvalidInputs = (form, options) => {
  const { inputSelector } = options;
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  return inputs.some(input => !input.validity.valid);
}

const toggleButtonState = (form, options) => {
  const { submitSelector, submitDisabledClass } = options;
  const button = form.querySelector(submitSelector);
  if (hasInvalidInputs(form, options)) {
    button.classList.add(submitDisabledClass);
  } else {
    button.classList.remove(submitDisabledClass);
  }
}

const isValid = (input, form, options) => {
  toggleButtonState(form, options);
  if (input.validity.valid) {
    hideError(input, options);
  } else {
    showError(input, options);
  }
}

const validateForm = (form, options) => {
  const { inputSelector } = options
  form.addEventListener('submit', e => e.preventDefault())
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  inputs.forEach(field => field.addEventListener('input', () => {
    isValid(field, form, options);
  }))
}

const enableValidation = (options) => {
  const { formSelector } = options;
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => validateForm(form, options));
}

enableValidation(options);





