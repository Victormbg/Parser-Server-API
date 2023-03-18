const express = require("express");
const router = require("./router");

app.use(express.json());
app.use(router);
