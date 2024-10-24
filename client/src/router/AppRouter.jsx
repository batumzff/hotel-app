import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SuspenseWrapper from "../components/SUSPENSE-WRAPPER/SuspenseWrapper";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Unauthorized from "../pages/Unauthorized";
import AuthorizedLayout from "../pages/AUTHORIZED/AuthorizedLayout";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Payment = lazy(() => import("../pages/Payment"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Rooms = lazy(() => import("../pages/Rooms"));
const RoomDetail = lazy(() => import("../pages/ROOM-DETAIL/RoomDetail"));
const Upload = lazy(() => import("../pages/Upload"));
const Profile = lazy(() => import("../pages/Profile"));
const Dashboard = lazy(() => import("../pages/AUTHORIZED/Dashboard"));
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