const Order = require("../models/orderModel");
const Product = require("../models/myProductModel");
const ErrorHandler = require("../utils/appError");
const catchAsyncErrors = require("../utils/catchAsyncError");
const sendEmail = require("../utils/sendEmail");
const logger = require("../utils/logger");
const Address = require("../models/address");
const factory = require("./../controllers/handleFactory");
const User = require("../models/userModel");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const { shippingInfo, billingInfo, animals } = req.body;
	delete shippingInfo._id;
	delete billingInfo._id;

	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHandler("User not found with this Id", 404));
	}
	if (user.cart.length === 0) {
		return next(new ErrorHandler("Cart is empty", 404));
	}
	const shippingAdd = await Address.create(shippingInfo);
	const billingAdd = await Address.create(billingInfo);

	if (user.address === null) {
		user.address = await Address.create(shippingInfo);
	} else {
		//update address with new shipping address
		user.address = await Address.findByIdAndUpdate(
			user.address._id,
			shippingInfo,
			{
				new: true,
				runValidators: true,
				useFindAndModify: false,
			}
		);
	}

	// user.address = shippingAdd;
	user.animals = animals;

	const order = await Order.create({
		shippingInfo: shippingAdd,
		billingInfo: billingAdd,
		orderItems: user.cart,
		user: user._id,
		orderedAt: Date.now(),
	});

	user.orders.push(order._id);
	user.cart = [];
	await user.save({ validateBeforeSave: false });

	// Send email to user with order details
	const message = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
    
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    
    
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    @media screen and (max-width: 480px) {
        .mobile-hide {
            display: none !important;
        }
        .mobile-center {
            text-align: center !important;
        }
    }
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    
    
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. 
    </div>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: green;" bgcolor="green">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="green">
                   
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                    <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;"></h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                    <table cellspacing="0" cellpadding="0" border="0" align="right">
                                        <tr>
                                          
                                            <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                           
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                  
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                               <br>
                                 <h3>OrderId : #${order._id}</h3>
                                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                    Thank You For Your Order!
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                   Hi, ${order.billingInfo.fname}  ${
		order.billingInfo.lname
	}, We got your Order We will Contact you soon!
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding-top: 20px;">
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                           Product 
                                        </td>
                                        <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                            Quantity
                                        </td>
                                    </tr>
                                    ${order.orderItems.map(
																			(item) => `
                                    <tr>
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px; border-bottom: 3px solid #eeeeee;">
                                        ${item.name}
                                      </td>
                                      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px; border-bottom: 3px solid #eeeeee;">
                                        ${item.quantity}
                                      </td>
                                    </tr>
                                  `
																		)}
                                  
                                  
                                </table>
                            </td>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    </td>
                </tr>
                 <tr>
                    <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0;">
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                <p style="font-weight: 800;">Delivery Address</p>
                                                <p>  ${
																									order.shippingInfo.address
																								}</p>
                                              <p>    ${
																								order.shippingInfo.city
																							},${order.shippingInfo.country},${
		order.shippingInfo.pinCode
	}
    </p>
                                              <p> Phone no: ${
																								order.shippingInfo.phoneNo
																							} </p>
    
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                     
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style=" padding: 35px; background-color: green;" bgcolor="green">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                    Space Wonders 
                                </h2>
                            </td>
                        </tr>
                        <tr>
                          
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                   
                        </tr>
                        <tr>
                            <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                    If you didn't create an account using this email address, please ignore this email. 
                                </p>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
        
    </body>
    </html>
    
  
  `;

	res.status(201).json({
		success: true,
		shippingInfo,
		billingInfo,
		user: user._id,
		status: order.orderStatus,
	});

	logger.info("order placed !");
});

exports.getSingleOrder = factory.getOne(Order);

//get logged in user Order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await User.findById(req.user._id)
		.select("orders")
		.populate({
			path: "orders",
			select: "-user",
			populate: [
				{ path: "shippingInfo" },
				{ path: "billingInfo" },
				{
					path: "orderItems",
					populate: {
						path: "product",
						select: "name images",
					},
				},
			],
		});
	// console.log(orders);

	res.status(200).json({
		success: true,
		orders: orders.orders,
	});
	logger.info("My orders!");
});

//get All orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find()
		.populate({
			path: "user",
			select: ["name", "email"],
		})
		.populate("shippingInfo billingInfo")
		.populate({
			path: "orderItems",
			populate: {
				path: "product",
				select: "name images",
			},
		});

	res.status(200).json({
		success: true,
		orders,
	});
	logger.info("Get all orders admin");
});
//Update Order status --Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler("Order not found with this Id", 404));
	}

	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler("You have delivered this order", 400));
	}

	// order.orderItems.forEach(async (order) => {
	//   await updateStock(order.product, order.quantity);
	// });

	order.orderStatus = req.body.orderStatus;

	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}

	await order.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		order,
	});
	logger.info("update order status admin");
});

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler("Order not found with this Id", 404));
	} else {
		await Order.findByIdAndRemove(req.params.id);
	}

	res.status(200).json({
		success: true,
	});
	logger.info("Delete orders admin");
});
