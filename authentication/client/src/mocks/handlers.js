import { rest } from "msw";

const url = "http://localhost:3000/api";

const signup_account_exists = rest.post(
  url + "/auth/signup",
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ errorMessage: "The account already exists..." })
    );
  }
);

const signup_correctly = rest.post(url + "/auth/signup", (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      _id: "62a33b1ff564fd748d76b804",
      fullName: "mevlüt can tuna",
      email: req.body,
      password: req.body,
      __v: 0,
    })
  );
});

const login_not_found_account = rest.post(
  url + "/auth/login",

  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ errorMessage: "The Account not Found..." })
    );
  }
);

export const login_wrong_password = rest.post(
  url + "/auth/login",
  (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({ errorMessage: "The password is wrong..." })
    );
  }
);

const login_correct = rest.post(url + "/auth/login", (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      user: {
        _id: "62a33b1ff564fd748d76b804",
        fullName: "mevlüt can tuna",
        email: req.body,
        password: req.body,
        __v: 0,
      },
    })
  );
});

export const handlers = [
  signup_account_exists,
  login_not_found_account,
  signup_correctly,
  login_wrong_password,
  login_correct,
];
