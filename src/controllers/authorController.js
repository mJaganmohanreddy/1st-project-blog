const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");
const validator = require("../utils/validator");

const createAuthor = async function (req, res) {
  try {
    let requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide author Detaills",
      });
    }

    const { fname, lname, title, email, password } = requestBody;

    if (!validator.isValid(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "First name is required" });
    }

    if (!validator.isValid(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "Last name is required" });
    }

    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required" });
    }

    if (!validator.isValidTitle(title)) {
      return res.status(400).send({
        status: false,
        message: `Title should Mr, Mrs, Miss `});
    }

    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required` });
    }

    
    if(!validator.isValidEmail(email)){
      return res.status(400).send({status:false,msg:"Email address is not valid"})
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: `Password is required` });
    }

    const isEmailAlredyUsed = await authorModel.findOne({ email });
    if (isEmailAlredyUsed) {
      return res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
    }

    const newAuthor = await authorModel.create(requestBody);
    return res.status(201).send({
      status: true,
      message: `Author created successfully`,
      data: newAuthor,
    });

  } 
  catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
    console.log(error);
  }
};



const loginAuthor = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid details please provide login details",
      });
    }

    let { email, password } = requestBody;

    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required for login` });
    }

    if(!validator.isValidEmail(email)){
      return res.send({status:false,msg:"Email should be valid"})
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: `Password is mandatory for login` });
    }

    const findAuthor = await authorModel.findOne({ email, password });

    if (!findAuthor) {
      return res.status(401).send({
        status: false,
        message: `Incorrect email or password. Try Again.`,
      });
    }

    let token = jwt.sign(
      {
        authorId: findAuthor._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
      },
      "uranium"
    );
    res.header("x-api-key", token);

    return res.status(200).send({
      status: true,
      message: `Author login successful.`,
      data: { token },
    });
  } 
  catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor
