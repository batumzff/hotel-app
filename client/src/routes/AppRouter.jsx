import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SuspenseWrapper from "../components/SUSPENSE-WRAPPER/SuspenseWrapper"
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/HOME/Home";
import Unauthorized from "../pages/UNAUTHORIZED/Unauthorized";

const Login = lazy(() => import("../pages/LOGIN/Login"));
const Register = lazy(() => import("../pages/REGISTER/Register"));
const Booking = lazy(() => import("../pages/BOOKING/Booking"));
const Payment = lazy(() => import("../pages/PAYMENT/Payment"));
const About = lazy(() => import("../pages/ABOUT/About"));
const AboutDetails = lazy(() => import("../pages/ABOUT-DETAILS/AboutDetails"));
const Contact = lazy(() => import("../pages/CONTACT/Contact"));
const Rooms = lazy(() => import("../pages/ROOMS/Rooms"));
const RoomDetail = lazy(() => import("../pages/ROOM-DETAIL/RoomDetail"));
const Upload = lazy(() => import("../pages/UPLOAD/Upload"));
const Profile = lazy(() => import("../pages/PROFILE/Profile"));
const Messages = lazy(() => import("../pages/MESSAGES/Messages"));
const NotFound = lazy(() => import("../pages/404/NotFound"));
const ReturnForm = lazy(() => import("../components/PAYMENT-FORM/ReturnForm"));
const CheckoutForm = lazy(() => import("../components/PAYMENT-FORM/CheckoutForm"));

const AppRouter = () => {
  return (
    <SuspenseWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="payment"
          element={<PrivateRouter allowedRoles={[ "admin", "staff", "user"]} />}
        >
         
          <Route path="" element={<Payment />} />
        </Route>
        <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<ReturnForm />} />
        <Route
          path="profile"
          element={<PrivateRouter allowedRoles={[ "admin", "staff", "user"]} />}
        >
          <Route path="" element={<Profile />} />
        </Route>
        <Route
          path="messages"
          element={<PrivateRouter allowedRoles={[ "admin", "staff"]} />}
        >
          <Route path="" element={<Messages />} />
        </Route>
        <Route element={<PrivateRouter allowedRoles={["admin", "staff"]} />}>
          <Route path="upload" element={<Upload />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="about-details/:id" element={<AboutDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="room-detail/:roomId" element={<RoomDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SuspenseWrapper>
  );
};

export default AppRouter;