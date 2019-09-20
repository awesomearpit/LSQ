export const checkPassword = sPassword => {
  if (sPassword) {
    let regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    if (!sPassword.match(regPassword)) {
      // return "Password has to be at least 8 chars long including one small, one capital and one special character";
      return "Min 8 characters with at least one number";
    }
    return null;
  }
  return "cannot be empty";
};

export const validateName = name => {
  if (name) {
    if (name.toString().length < 3) {
      return "Must be Min 3 Characters";
    }
    return null;
  }
  return "cannot be empty";
};

export const validateEmail = sEmail => {
  if (sEmail) {
    let reEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!sEmail.match(reEmail)) {
      return "Must be Valid";
    }
    return null;
  }
  return "cannot be empty";
};

export const validateMobile = mobile => {
  if (mobile) {
    if (mobile.length !== 10) {
      return "Mobile no. Length is 10";
    }
    return null;
  }
  return "cannot be empty";
};
