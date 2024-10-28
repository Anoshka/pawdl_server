import initKnex from "knex";
import configuration from "../knexfile.js";
import { validateFields } from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const knex = initKnex(configuration);

const getChats = async (req, res) => {
  try {
    const data = await knex("chats")
      .where({ sender_id: req.params.id })
      .orWhere({ receiver_id: req.params.id });

    if (data.length == 0) {
      return res.status(404).send("No chats found");
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving chats: ${error}`);
  }
};

const getChat = async (req, res) => {
  try {
    const data = await knex("chats")
      .where({ sender_id: req.params.id })
      .andWhere({ receiver_id: req.params.friendId })
      .orWhere({ sender_id: req.params.friendId })
      .andWhere({ receiver_id: req.params.id })
      .orderBy("created_at", "asc");
    if (data.length === 0) {
      return res.status(404).json({
        message: `chat with ID ${req.params.id} not found`,
      });
    }
    const chat = data;
    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for chat with ID ${req.params.id}`,
    });
  }
};

const postMessage = async (req, res) => {
  try {
    const fields = {
      id: uuidv4(),
      sender_id: req.params.id,
      sender_name: req.body.sender_name,
      receiver_id: req.params.friendId,
      receiver_name: req.body.receiver_name,
      message: req.body.message,
    };

    const result = await knex("chats").insert(fields);
    const newChat = await knex("chats").where({ id: result[0] });
    res.status(200).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to send message" });
  }
};

export { getChats, getChat, postMessage };
