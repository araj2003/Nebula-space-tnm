const RFQ = require("../models/rfqModel");
const factory = require("./handleFactory");
const ErrorHandler = require("../utils/appError");
const catchAsyncErrors = require("../utils/catchAsyncError");

exports.createRFQ = factory.createOne(RFQ);
exports.getAllRFQs = factory.getAll(RFQ);
exports.updateRFQ = factory.updateOne(RFQ);
exports.deleteRFQ = factory.deleteOne(RFQ);
