import initKnex from "knex";
import configuration from "../knexfile.js";
import { validateFields } from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const knex = initKnex(configuration);

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const validateUser = [
  body("user_name").notEmpty().withMessage("User name is required"),
  body("pet_name").notEmpty().withMessage("Pet name is required"),
  body("type").notEmpty().withMessage("Pet type is required"),
  body("contact_phone").notEmpty().withMessage("Contact phone is required"),
  body("contact_email")
    .notEmpty()
    .withMessage("Contact email is required")
    .isEmail()
    .withMessage("Email is invalid 1"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Please enter a password with atleast 8 characters")
    .withMessage("Password is invalid"),
];

const getUsers = async (req, res) => {
  try {
    const data = await knex("users");
    if (data.length == 0) {
      return res.status(404).send("No users found");
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${error}`);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const data = await knex("users").where({ id: req.params.id });
    if (data.length === 0) {
      return res.status(404).json({
        message: `user with ID ${req.params.id} not found`,
      });
    }
    const usersData = data[0];
    delete usersData.created_at;
    delete usersData.updated_at;
    res.json(usersData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for user with ID ${req.params.id}`,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const requiredFields = {
      user_name: req.body.user_name,
      pet_name: req.body.pet_name,
      type: req.body.type,
      contact_phone: req.body.contact_phone,
      contact_email: req.body.contact_email,
      password: req.body.password,
    };
    const notRequiredFields = {
      id: uuidv4(),
      breed: req.body.breed | "",
      avatar: req.body.breed | "",
      temperament: req.body.temperament | "",
      status: req.body.status | "",
      bio: req.body.bio | "",
      location: req.body.location | "",
    };
    // Object for any found errors.
    const error = validateFields(requiredFields);
    //Returns a response if any errors are found.
    if (Object.entries(error).length > 0) {
      return res.status(400).json({ message: error });
    }

    const allFields = { ...requiredFields, ...notRequiredFields };

    const salt = await bcrypt.genSalt(10);
    allFields.password = await bcrypt.hash(allFields.password, salt);
    //await allFields.save();

    const payload = {
      user: {
        id: allFields.id,
      },
    };

    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
        res.status(404).send("no token");
      }
      res.json({ token });
    });

    const result = await knex("users").insert(allFields);
    const newUser = await knex("users").where({ id: result[0] });
    //res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to register new user" });
  }
};

const loginUSer = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await knex("users")
      .where({ contact_email: req.body.email })
      .first();

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    let loginResponse = {
      token: "",
      success: false,
      msg: "",
    };

    loginResponse.success = await bcrypt.compare(
      String(password),
      String(user.password)
    );
    if (loginResponse.success) {
      const token = jwt.sign(
        {
          id: user.id,
          user_name: user.user_name,
        },
        JWT_SECRET_KEY,
        {
          expiresIn: "1hr",
        }
      );
      console.log("token login is ", token);
      res.json({ token: token, _id: user.id });
    } else {
      return res
        .status(401)
        .json({ message: "Authentication failed, passwords do not match" });
    }
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editUser = async (req, res) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    await knex("users").where({ id }).update(updatedData);
    const updatedUser = await knex("users").where({ id }).first();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await knex("users").where({ id }).first();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await knex("users").where({ id }).del();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserPosts = async (req, res) => {
  console.log("getting user posts");
  try {
    const postsFound = await knex("posts")
      .join("users", "posts.user_id", "users.id")
      .select(
        "posts.id",
        "posts.image",
        "posts.likes",
        "posts.description",
        "posts.created_at"
      )
      .where("users.id", req.params.id);
    console.log("posts found are ", postsFound);

    if (postsFound.length === 0) {
      return res.status(404).send(`TNo posts found for user: ${req.params.id}`);
    }
    res.status(200).json(postsFound);
  } catch (error) {
    console.error("error getting posts: ", { error });
    res.status(500).json({
      message: `Unable to retrieve posts data with User ID ${req.params.id}`,
    });
  }
};

export {
  getUsers,
  getSingleUser,
  registerUser,
  validateUser,
  loginUSer,
  editUser,
  deleteUser,
  getUserPosts,
};
