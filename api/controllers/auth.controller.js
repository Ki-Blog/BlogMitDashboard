import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, "Bitte alle Felder ausfüllen."));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Benutzer mit dieser E-Mail existiert bereits."));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET
    );

    res.status(201).json({ token, message: "Anmeldung erfolgreich." });
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern.username) {
        return next(errorHandler(400, "Benutzername existiert bereits."));
      }
      if (err.keyPattern.email) {
        return next(errorHandler(400, "E-Mail existiert bereits."));
      }
    }
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Bitte alle Felder ausfüllen."));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Benutzer wurde nicht gefunden."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Ungültiges Passwort"));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const {password: userPassword, pass, ...rest} = validUser._doc;

      res.status(200).cookie('access_token', token, {
        httpOnly: true}).json(rest);
} catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET);
      const {password, ...rest} = user._doc;
      res.status(200).cookie('access_token', token, {
        httpOnly: true}).json(rest);
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + 
        Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin},process.env.JWT_SECRET);
        const {password, ...rest} = newUser._doc;
        res.status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};