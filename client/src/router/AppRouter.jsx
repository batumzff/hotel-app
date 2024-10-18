import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SuspenseWrapper from "../components/SUSPENSE-WRAPPER/SuspenseWrapper";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/HOME/Home";
import Unauthorized from "../pages/UNAUTHORIZED/Unauthorized";
import AuthorizedLayout from "../pages/AUTHORIZED/AuthorizedLayout";

const Login = lazy(() => import("../pages/LOGIN/Login"));
const Register = lazy(() => import("../pages/REGISTER/Register"));
const Booking = lazy(() => import("../components/BOOKING/Booking"));
const Payment = lazy(() => import("../pages/PAYMENT/Payment"));
const About = lazy(() => import("../pages/ABOUT/About"));
const AboutDetails = lazy(() => import("../pages/ABOUT-DETAILS/AboutDetails"));
const Contact = lazy(() => import("../pages/CONTACT/Contact"));
const Rooms = lazy(() => import("../pages/ROOMS/Rooms"));
const RoomDetail = lazy(() => import("../pages/ROOM-DETAIL/RoomDetail"));
const Upload = lazy(() => import("../pages/UPLOAD/Upload"));
const Profile = lazy(() => import("../pages/PROFILE/Profile"));
const Messages = lazy(() => import("../pages/AUTHORIZED/Messages"));
const Dashboard = lazy(() => import("../pages/AUTHORIZED/Dashboard"));
const Reservations = lazy(() => import("../pages/AUTHORIZED/Reservations"));
const Clients = lazy(() => import("../pages/AUTHORIZED/Clients"));
const NotFound = lazy(() => import("../pages/404/NotFound"));

const AppRouter = () => {
  return (
    <SuspenseWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="payment"
          element={<PrivateRouter allowedRoles={["admin", "staff", "user"]} />}
        >
          <Route path="" element={<Payment />} />
        </Route>
        <Route
          path="profile"
          element={<PrivateRouter allowedRoles={["admin", "staff", "user"]} />}
        >
          <Route path="" element={<Profile />} />
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

        {/* Authorized Person(ADMIN - STAFF) */}
        <Route
          path="authorized"
          element={<PrivateRouter allowedRoles={["admin", "staff"]} />}
        >
          <Route
            index
            element={
              <AuthorizedLayout>
                <Dashboard />
              </AuthorizedLayout>
            }
          />
          {/* <Route
            path="reservations"
            element={
              <AuthorizedLayout>
                <Reservations />
              </AuthorizedLayout>
            }
          />
          <Route
            path="clients"
            element={
              <AuthorizedLayout>
                <Clients />
              </AuthorizedLayout>
            }
          />
          <Route
            path="messages"
            element={
              <AuthorizedLayout>
                <Messages />
              </AuthorizedLayout>
            }
          /> */}
        </Route>
      </Routes>
    </SuspenseWrapper>
  );
};

export default AppRouter;