import dotenv from "dotenv";
import { resolve } from "path";




dotenv.config({
    path: resolve(`.env.${process.env.NODE_ENV}`)
});


export default {
    port: process.env.PORT,
    db_url: process.env.DB_URL
}