const router = require("express").Router();
const Auth = require("../../connection/model/AuthModel");

/**
 * Signup Form for register a New User Details
 * @param {*} req 
 * @param {*} resp 
 * @returns 
 */
const signUp = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return resp
        .status(400)
        .json({ message: "Not all fields have been entered." });
    }

    const existingEmail = await Auth.findOne({ email: email });
    if (existingEmail) {
      return resp
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    let user = new Auth({
      ...req.body,
    });
    let result = await user.save().toObject();
    delete result.password;
    resp.status(201).json(result);
  } catch (err) {
    resp.status(400).json({ message: err.message });
  }
};

/**
 * Login Form User Can login by enter details
 * @param {*} req 
 * @param {*} resp 
 * @returns 
 */
const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp
        .status(400)
        .json({ message: "Not all fields have been entered." });
    }

    if (password && email) {
      let userData = await Auth.findOne(req.body).select("-password");
      if (userData) {
        resp.status(200).json({ user: userData, success: true });
      } else {
        resp.status(404).json({ result: "Invalid credentials." });
      }
    }
  } catch (err) {
    resp.status(400).json({ message: err.message });
  }
};

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
