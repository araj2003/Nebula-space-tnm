import  { useEffect } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import { useGlobalContext } from "../../context/globalcontext";

const ConfirmOrder = () => {
  const navigate = useNavigate(); 
  const { ordered } = useGlobalContext();
  useEffect(() => {
    if (!ordered) {
      navigate("/cart");
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
      // Reload the homepage after navigating to it
      if (window.location.pathname === "/") {
        window.location.reload();
      }
    }, 6000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);
  
  return (
    <div className="bg-teal-50 fixed w-screen h-screen top-0 z-50 grid place-content-center">
      {ordered && (
        <div className="flex flex-col items-center gap-7 ">
          <MdCheckCircle className="text-9xl animate-bounce text-teal-500" />
          <p className="text-xl text-teal-800 italic w-3/5 text-center">
            We've received your order. Our representative will contact you
            within 24-72 hours. For urgent assistance, feel free to reach out on
            WhatsApp. Thank you for choosing us!
          </p>

          <p className="text-teal-700 italic">Redirecting to Home Page.....</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmOrder;
