const express = require("express");
const { chechOutCtrl, paymentVerification, getKey, paymentSuccessfullMail } = require("../controllers/paymentCtrl");

const router = express.Router();
router.post("/checkout", chechOutCtrl)
router.post("/paymentverification", paymentVerification)
router.get("/getkey", getKey)
router.post("/email", paymentSuccessfullMail)

module.exports = router;