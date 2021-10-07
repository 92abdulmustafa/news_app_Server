const globalHelpers = {};

globalHelpers.handleMongooseError = function (response) {
  let returnResponse = {};

  if (response.name === "ValidationError") {
    const errorsArray = [];

    for (const item in response.errors) {
      if (response.errors.hasOwnProperty(item)) {
        errorsArray.push(response.errors[`${item}`].message);
      }
    }

    returnResponse.message = errorsArray[0];
  } else if (typeof response === "object" && "message" in response) {
    returnResponse = { message: response.message };
  } else if (Array.isArray(response)) {
    returnResponse.message = response[0];
  } else if (typeof response === "string") {
    returnResponse.message = response;
  }

  return returnResponse;
};
module.exports = globalHelpers;
