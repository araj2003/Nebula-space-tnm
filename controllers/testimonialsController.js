const Testimonial = require("../models/testimonialModel");
const factory = require("./handleFactory");

exports.getAllTestimonial = factory.getAll(Testimonial);
exports.createTestimonial = factory.createOne(Testimonial);
exports.updateTestimonial = factory.updateOne(Testimonial);
exports.deleteTestimonial = factory.deleteOne(Testimonial);

