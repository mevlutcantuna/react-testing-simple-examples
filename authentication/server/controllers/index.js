const User = require("../models/");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // account verification
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errorMessage: "The Account Not Found..." });
    }

    // check password
    if (password !== user.password) {
      return res.status(403).json({ errorMessage: "The Password is Wrong..." });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ errorMessage: err.message });
  }
};

const signup = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  try {
    // the account exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ errorMessage: "The Account already Exists..." });
    }

    const user = new User({ fullName, email, password });

    await user
      .save()
      .then(() => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(400).json({ errorMessage: err.message });
      });
  } catch (err) {
    return res.status(400).json({ errorMessage: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    // get user
    const user = await User.findOne({ _id: id });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ errorMessage: err.message });
  }
};

module.exports = { login, signup, getUser };
