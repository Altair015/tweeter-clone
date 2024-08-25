export const resourceConflict = (error) => {
  // in case of duplicate entries
  if (error.code === 11000) {
    const propertyName = Object.keys(error.keyValue)[0];
    const errMessage = {
      status: 409,
      message: `${propertyName} : ${error.keyValue[propertyName]} already exists.`,
      type: "conflict",
    };
    return errMessage;
  }

  // unknown error status
  return {
    status: 400,
    message: error.message,
    type: "others",
  };
};

export const resouceInvalid = (error) => {};
