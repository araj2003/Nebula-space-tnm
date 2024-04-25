import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../actions/orderAction";
import { AiFillShopping } from "react-icons/ai";
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userOrdersData = useSelector((state) => state.myOrders);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
    }
  }, []);
  
  const formatAddressInfo = (info) => {
    return `${info.fname}, ${info.lname}, ${info.country}, ${info.city}, ${info.state}, ${info.pinCode}`;
  };

  return (
    <div className="px-3 md:px-7 py-24 lg:py-7 min-h-[75vh]">
      {userOrdersData.orders && userOrdersData.orders.length != 0 && (
        <div className="">
          <div className="flex flex-col lg:flex-row justify-between w-full items-center mb-3 ">
            <h2 className="font-semibold text-2xl md:text-3xl text-gray-800 mb-4">
              Your Past Orders
            </h2>
            <a
              href="https://wasap.my/919773727759"
              className="text-teal-800 italic font-medium hover:underline text-center"
            >
              For immediate assistance regarding your order, please contact us
              on WhatsApp.
            </a>
          </div>
          <div
            className="border-2 p-2 min-h-[75vh]"
            style={{ overflowX: "auto" }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  style={{
                    display: "flex",
                  }}
                >
                  <TableCell
                    style={{
                      width: "25%",
                      minWidth: "20px",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                      color: "#0F766E",
                    }}
                  >
                    Items
                  </TableCell>
                  <TableCell
                    style={{
                      width: "7.5%",
                      minWidth: "75px",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      color: "#0F766E",
                    }}
                  >
                    Qty
                  </TableCell>
                  <TableCell
                    style={{
                      width: "25%",
                      minWidth: "20px",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                      color: "#0F766E",
                    }}
                  >
                    Shipping
                  </TableCell>
                  <TableCell
                    style={{
                      width: "25%",
                      minWidth: "20px",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                      color: "#0F766E",
                    }}
                  >
                    Billing
                  </TableCell>
                  <TableCell
                    style={{
                      width: "10%",
                      minWidth: "100px",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                      color: "#0F766E",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    style={{
                      width: "7.5%",
                      minWidth: "75px",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                      color: "#0F766E",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrdersData.orders &&
                  userOrdersData.orders.map((order) => (
                    <TableRow
                      key={order._id}
                      style={{
                        display: "flex",
                        width: "100%",
                        flexGrow: "1",
                      }}
                    >
                      <TableCell
                        style={{
                          width: "25%",
                          minWidth: "250px",
                          display: "flex",
                          minHeight: "100%",
                        }}
                        className="flex-col gap-1"
                      >
                        {order.orderItems.map((item, index) => (
                          <span
                            className="capitalize text-gray-600 "
                            key={item._id}
                          >
                            <Link to={`/product/${item.product._id}`} className="hover:underline"> 
                              {item.product.name || " "}
                            </Link>{" "}
                            <span className="text-teal-800 font-semibold mx-0.5">
                              ({`${item.quantity}x`})
                            </span>{" "}
                            <span className=" text-zinc-800 font-semibold">
                              {item.size != "NaN" && `-${item.size}`}
                            </span>{" "}
                            <span className=" text-red-800">
                              {item.color != "NaN" && `[${item.color}]`}
                            </span>{" "}
                            <span className="my-1 text-red-800 font-semibold">
                              {item.other != "NaN" && `[ ${item.other} ]`}
                            </span>
                            {index === order.orderItems.length - 1 ? "" : ", "}
                          </span>
                        ))}
                      </TableCell>
                      <TableCell
                        className="!text-gray-600"
                        style={{
                          textAlign: "center",
                          fontWeight: "600",
                          width: "7.5%",
                          minWidth: "75px",
                        }}
                      >
                        {order.orderItems.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.quantity,
                          0
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "25%",
                          minWidth: "250px",
                        }}
                      >
                        {formatAddressInfo(order.shippingInfo)}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "25%",
                          minWidth: "250px",
                        }}
                      >
                        {formatAddressInfo(order.billingInfo)}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "10%",
                          minWidth: "100px",
                        }}
                      >
                        <span className="font-semibold text-teal-800 hover:underline">
                          {order.createdAt.slice(0, 10)}
                        </span>
                      </TableCell>
                      <TableCell
                        style={{
                          width: "7.5%",
                          minWidth: "75px",
                        }}
                      >
                        {order.orderStatus}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {userOrdersData.orders && userOrdersData.orders.length == 0 && (
        <div className="pt-24 lg:pt-0  min-h-[70vh] flex justify-center flex-col gap-3 items-center">
          <AiFillShopping className="text-teal-600 text-5xl md:text-[100px]" />
          <h2 className="text-gray-400 font-semibold text-lg md:text-2xl">
            You do no have any past orders
          </h2>
          <Link
            to="/products"
            className="bg-teal-600 hover:bg-white border-2 border-teal-600 hover:text-teal-800 transition-all duration-150 text-white px-3 md:px-6 rounded-md md:text-lg py-1.5 mt-5"
          >
            View Products
          </Link>
        </div>
      )}
      <style></style>
    </div>
  );
}
