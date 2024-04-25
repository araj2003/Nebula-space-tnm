import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import {
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import Product from "./components/product/Product";
import ProductDetails from "./components/product/ProductDetails";
import { loadUser } from "./actions/userAction";
import Profile from "./components/user/Profile";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./components/user/ResetPassword";
import ActivateAccount from "./components/user/ActivateAccount";
import Cart from "./components/Cart/Cart";
import MyOrders from "./components/orders/MyOrders";
import Admin from "./components/Admin/Admin";
import Editor from "./components/Admin/Editor";
import Content from "./components/Admin/Content";
import AnimalPage from "./components/Pages/AnimalPage";
import EssentialsPage from "./components/Pages/EssentialsPage";
import MedicalPage from "./components/Pages/MedicalPage";
import PharmaPage from "./components/Pages/PharmaPage";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./components/Contact/Contact";
import ConfirmOrder from "./components/Contact/ConfirmOrder";
import TermsandPolicy from "./components/Info/TermsandPolicy";
import About from "./components/Info/About";
import AllArticles from "./components/Info/AllArticles";
import PrivacyPolicy from "./components/Info/PrivacyPolicy";
import LegalNotice from "./components/Info/LegalNotice";
import Loader from "./components/layout/Loader/Loader";
import ErrorPage from "./components/Error";
import FAQ from "./components/Info/FAQ";
import ShippingReturn from "./components/Info/Shipping&Return";
import ArticlePage from "./components/Info/ArticlePage";
import LoginPage from "./components/user/LoginPage";
import RegisterPage from "./components/user/RegisterPage";
import ForgotPasswordPage from "./components/user/ForgotPasswordPage";
import EmailSent from "./components/user/EmailSent";
import ForgotMailSent from "./components/user/ForgotMailSent";
import { useEffect } from "react";
import RFQWindow from "./components/RQF/RFQWindow";
import Catalog from "./components/RQF/Catalog";
import ContactUs from "./components/RQF/ContactUs";
import IndustryPage from "./components/Pages/Industry";
import Layout from "./Layout";

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "activate/:token",
				element: <ActivateAccount />,
			},
			{
				path: "resetPassword/:token",
				element: <ResetPassword />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "orders",
				element: <MyOrders />,
			},
			{
				path: "confirmorder",
				element: <ConfirmOrder />,
			},
			{
				path: "products",
				element: <Product />,
			},
			{
				path: "product/:id",
				element: <ProductDetails />,
			},
			{
				path: "animal",
				element: <AnimalPage />,
			},
			{
				path: "pharmaceuticals",
				element: <PharmaPage />,
			},
			{
				path: "essential",
				element: <EssentialsPage />,
			},
			{
				path: "surigcals",
				element: <MedicalPage />,
			},
			{
				path: "industry",
				element: <IndustryPage />,
			},
			{
				path: "/essential/:essential",
				element: <Product />,
			},
			{
				path: "medical/:medical",
				element: <Product />,
			},
			{
				path: "animal/:animal",
				element: <Product />,
			},
			{
				path: "surgicals/:surgicals",
				element: <Product />,
			},
			{
				path: "contact",
				element: <Contact />,
			},
			{
				path: "termsandconditions",
				element: <TermsandPolicy />,
			},
			{
				path: "privacypolicy",
				element: <PrivacyPolicy />,
			},
			{
				path: "aboutus",
				element: <About />,
			},
			{
				path: "faqs",
				element: <FAQ />,
			},
			{
				path: "shipping&return",
				element: <ShippingReturn />,
			},
			{
				path: "allarticles",
				element: <AllArticles />,
			},
			{
				path: "allarticles/:_id",
				element: <ArticlePage />,
			},
			{
				path: "legalnotice",
				element: <LegalNotice />,
			},
			{
				path: "admin/dashboard",
				element: <Admin />,
			},
			{
				path: "editor/dashboard",
				element: <Editor />,
			},
			{
				path: "content/dashboard",
				element: <Content />,
			},
			{
				path: "forgotpassword",
				element: <ForgotPasswordPage />,
			},
			{
				path: "forgot-mail-sent",
				element: <ForgotMailSent />,
			},
			{
				path: "emailsent",
				element: <EmailSent />,
			},
			{
				path: "requestcatalogue",
				element: <RFQWindow />,
			},
			{
				path: "rfq",
				element: <Catalog />,
			},
			{
				path: "contactus",
				element: <ContactUs />,
			},
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
]);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    const isAuthenticatedCookie = document.cookie.includes("jwt");
    if (!loading && !isAuthenticated && isAuthenticatedCookie) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, user]);
  return (
    <>
		<RouterProvider router={router}/>
    </>
  );
}

export default App;
