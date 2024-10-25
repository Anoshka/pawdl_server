import initKnex from "knex";
import configuration from "../knexfile.js";
import { validateFields } from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const knex = initKnex(configuration);

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const getPosts = async (req, res) => {
  try {
    const data = await knex("posts");
    if (data.length == 0) {
      return res.status(404).send("No posts found");
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving posts: ${error}`);
  }
};

const getSinglePost = async (req, res) => {
  try {
    console.log("id is ", req.params.id);
    const data = await knex("posts").where({ id: req.params.id });
    if (data.length === 0) {
      return res.status(404).json({
        message: `post with ID ${req.params.id} not found`,
      });
    }
    const postsData = data[0];
    delete postsData.created_at;
    delete postsData.updated_at;
    res.json(postsData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for post with ID ${req.params.id}`,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const fields = {
      id: uuidv4(),
      user_id: req.body.user_id,
      image: req.body.image,
      likes: 0,
      description: req.body.description,
    };
    const result = await knex("posts").insert(fields);
    const newPost = await knex("posts").where({ id: result[0] });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to register new post" });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const post = await knex("posts").where({ id }).first();

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    await knex("posts").where({ id }).update(updatedData);
    const updatedPost = await knex("posts").where({ id }).first();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await knex("posts").where({ id }).first();
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    await knex("posts").where({ id }).del();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getPosts, getSinglePost, createPost, editPost, deletePost };
