const mongoose = require("mongoose");

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

globalHelpers.isNullOrUndefined = function (value) {
  if (typeof value === "undefined" || value === null || value === "") {
    return true;
  }
};

globalHelpers.removedUndefinedValues = function (obj) {
  const payload = {};

  for (const key in obj) {
    if (!globalHelpers.isNullOrUndefined(obj[`${key}`])) {
      payload[`${key}`] = obj[`${key}`];
    }
  }

  return payload;
};

globalHelpers.getUserPublicProfile = function (user, removeDeleteKeys = true) {
  if (user.toJSON) {
    user = user.toJSON();
  }

  delete user.googleId;
  delete user.deviceToken;
  delete user.isNeedToUpdate;
  if (removeDeleteKeys) {
    delete user.deleted;
    delete user.blocked;
  }
  return user;
};

globalHelpers.skipDocCalculate = (page) => {
  return (Number(page) - 1) * process.env.LIMIT;
};

globalHelpers.calculateTotalPage = function (totalDocs, limit) {
  if (totalDocs === 0 || limit === 0) {
    return 1;
  }
  return Math.ceil(totalDocs / limit);
};

globalHelpers.isValidObjectId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

globalHelpers.getTomorrowsMillisecond = function () {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);
  return currentDate.getTime();
};

module.exports = globalHelpers;