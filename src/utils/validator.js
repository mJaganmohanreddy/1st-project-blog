const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidTitle = function (title) {
  return ["Mr", "Mrs", "Miss", ].indexOf(title) !== -1;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};



// const isValidString = function (value) {
//   if (typeof value === "string" && value.trim().length === 0) return false;
//   return true;
// };

const isValidEmail=function(email){
    let mailFormate=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    return mailFormate.test(email);
}
module.exports = { isValid,isValidTitle,isValidRequestBody,isValidEmail}
