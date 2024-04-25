const Banner = require("../models/bannerModel");
const factory = require("./handleFactory");

exports.getBigBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({}).select("bigBanner").exec();
    // console.log(banner);
    res.status(200).json({
      status: "success",
      data: banner,
    });
  } catch (error) {
    console.error("Error fetching big banner:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getSmallBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({}).select("smallBanner").exec();
    // console.log(banner);
    res.status(200).json({
      status: "success",
      data: banner,
    });
  } catch (error) {
    console.error("Error fetching small banner:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getAllBanners = factory.getAll(Banner);
exports.updateBanner = factory.updateOne(Banner);
