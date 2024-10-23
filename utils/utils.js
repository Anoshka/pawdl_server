export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePhoneNumber = (phoneNumber) => {
  return String(phoneNumber)
    .toLowerCase()
    .match(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
};

export const validateFields = (fields) => {
  const foundErrors = {};

  // Validates if the required field is empty.
  for (const [key, value] of Object.entries(fields))
    if (value === "")
      foundErrors[key] =
        key
          .trim()
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") + " is required";

  // Validates for the required phone number.
  //   if (!foundErrors.contact_phone && !validatePhoneNumber(fields.contact_phone))
  //     foundErrors.contact_phone = "Phone Number is invalid";

  // Validates for the required contact email.
  if (foundErrors.contact_email) {
    foundErrors.contact_email = "Email is invalid";
  }
  return foundErrors;
};

export default {
  validateEmail,
  validateFields,
};
