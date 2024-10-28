const bcrypt = require("bcryptjs");
const validator = require("validatorjs");
const moment = require("moment");

const standardFormat = "YYYY-MM-DD HH:mm:ss";
const manualFormat = "DD-MM-YYYY";
const time = "HH:mm:ss";

exports.encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);
  // console.log("encryptedPassword", encryptedPassword);
  return encryptedPassword;
};

exports.comparePassword = async (hashPassword, normalPassword) => {
  const isMatch = await bcrypt.compare(normalPassword, hashPassword);
  return isMatch;
};

exports.otpGeneration = async (req, res) => {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  return OTP;
};

exports.standardDateFormat = async (req, res) => {
  return moment().format(standardFormat);
};

exports.manualDateFormat = async (req, res) => {
  return moment().format(manualFormat);
};

exports.timeFormat = async (req, res) => {
  return moment().format(time);
};

exports.validator = (body, rules) => {
  const validation = new validator(body, rules);
  var result = {};
  validation.passes(() => {
    result = {
      err: null,
      status: true,
    };
  });
  validation.fails(() => {
    result = {
      err: validation.errors,
      status: false,
    };
  });
  return result;
};
