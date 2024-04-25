const express = require("express");
const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API v1 working!",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
