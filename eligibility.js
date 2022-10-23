// console.log(mdc);

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

// console.log(document.forms[0]);
const myForm = document.forms[0];
const signUpButton = myForm[8];

const [fullNameInput, usernameInput, enterPasswordInput, confirmPasswordInput, ageInput, birthDateInput, legalCheckbox, termsCheckbox] = myForm;
// console.dir(signUpButton)

function validateEligibility(event){
  event.preventDefault();
  const fullNameVal = fullNameInput.value;
  const usernameVal = usernameInput.value;
  const enterPasswordVal = enterPasswordInput.value;
  const confirmPasswordVal = confirmPasswordInput.value;
  const ageVal = ageInput.value;
  const birthDateVal = birthDateInput.value;
  const legalVal = legalCheckbox.checked;
  const termsVal = termsCheckbox.checked;

  // console.log(legalVal, termsVal);

  console.log(`Full Name: ${fullNameVal}`)
  console.log(`Username: ${usernameVal}`)
  console.log(`Enter Password: ${enterPasswordVal}`)
  console.log(`Confirm Password: ${confirmPasswordVal}`)
  console.log(`Age: ${ageVal}`)
  console.log(`Birth Date: ${birthDateVal}`)

  if (legalVal){
    console.log("The user has checked the legal checkbox");
  }
  else{
    console.log("The user has not checked the legal checkbox");
  }
  if (termsVal){
    console.log("The user has checked the terms checkbox");
  }
  else{
    console.log("The user has not checked the terms checkbox");
  }

  fields = [fullNameVal, usernameVal, enterPasswordVal, confirmPasswordVal, ageVal, birthDateVal,]

  let fieldsFilled = true;
  for(var i=0; i<fields.length; i++) {
      if(fields[i] === ""){
        fieldsFilled = false;
        break;
        }
  }

  const passwordsSame = enterPasswordVal === confirmPasswordVal;
  const validAge = ageVal >= 13;
  const bothChecked = legalVal && termsVal;
    
  if (passwordsSame && validAge && bothChecked && fieldsFilled) {
    console.log("The user is eligible");
  }
  else{
    console.log("The user is ineligible");
  }

}

signUpButton.addEventListener("click", validateEligibility);


