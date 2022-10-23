console.log(mdc);

const MDCTextField = mdc.textField.MDCTextField;
const textFields = [].map.call(
  document.querySelectorAll(".mdc-text-field"),
  function (el) {
    return new MDCTextField(el);
  }
);

const MDCCheckbox = mdc.checkbox.MDCCheckbox;
const checkboxes = [].map.call(
  document.querySelectorAll(".mdc-checkbox"),
  function (el) {
    return new MDCCheckbox(el);
  }
);
