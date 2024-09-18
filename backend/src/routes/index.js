import express from "express";
import adminrouter from "./admin.js";

const router = express.Router();

router.use("/admin", adminrouter);


export default router;
