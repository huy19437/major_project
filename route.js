import React from "react";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage/ContactPage";
import UserPage from "./pages/UserPage/UserPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import QuotePage from "./pages/QuotePage/QuotePage";
import PrescriptionPage from "./pages/PrescriptionPage/PrescriptionPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ConfigPage from "./pages/ConfigPage/ConfigPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  // Contact
  {
    path: "/contacts",
    exact: true,
    main: ({ history }) => <ContactPage history={history} />,
  },
  // Config
  {
    path: "/config",
    exact: true,
    main: ({ history }) => <ConfigPage history={history} />,
  },
  // About
  {
    path: "/about",
    exact: true,
    main: ({ history }) => <AboutPage history={history} />,
  },

  // Prescription
  {
    path: "/prescriptions",
    exact: true,
    main: ({ history }) => <PrescriptionPage history={history} />,
  },

  // Quote
  {
    path: "/quotes",
    exact: true,
    main: ({ history }) => <QuotePage history={history} />,
  },

  // Order
  {
    path: "/orders",
    exact: true,
    main: ({ history }) => <OrderPage history={history} />,
  },

  //User
  {
    path: "/staffs",
    exact: true,
    main: ({ history }) => <UserPage history={history} />,
  },
  //customer
  {
    path: "/customers",
    exact: true,
    main: ({ history }) => <CustomerPage history={history} />,
  },
  //Login
  {
    path: "/login",
    exact: true,
    main: () => <LoginPage />,
  },
  {
    path: "/forgot-password",
    exact: true,
    main: () => <ForgotPasswordPage />,
  },
  {
    path: "/profile",
    exact: true,
    main: () => <ProfilePage />,
  },
  {
    path: "/profile/:email",
    exact: true,
    main: (match) => <UserProfilePage match={match} />,
  },
  {
    path: "",
    exact: true,
    main: () => <NotFoundPage />,
  },
];

export default routes;
