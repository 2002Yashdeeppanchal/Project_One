// require('dotenv').config({path: './env'})

import dotenv from "dotenv"

// import mongoose from "mongoose";
// import DB_NAME from "./constants.js";
import connetDB from "./db/index.js";

dotenv.config({
  path: './env'
})

connetDB();













/*
import express from "express"
const app = express();
//iffies jo function hai usse turant execute krdo
;( async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("ERROR: ",error);
      throw error;
    })

    app.listen(process.env.PORT, () => {
      console.log(`Application is listening on port: ${ process.env.PORT} `)
    })
  } catch (error) {
    console.error("ERROR", error)
    throw error;
  }
} )()
*/