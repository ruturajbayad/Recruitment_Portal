/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import AddEmployees from "views/examples/AddEmployees";
import ForgotPassword from "views/examples/ForgotPassWord";
import ResetPassword from "views/examples/ResetPassword";
import AllUsers from "views/examples/AllUsers";
import AddCandidate from "views/examples/AddCandidate";
import AllCandidates from "views/examples/AllCandidates";
import AddSchedule from "views/examples/AddSchedule";
// import ForgotPassword from "views/examples/ForgotPassWord";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/add-user",
    name: "Add User",
    icon: "ni ni-fat-add text-red",
    component: <AddEmployees />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    hideInSidebar: true,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    icon: "ni ni-key-25 text-info",
    component: <ForgotPassword />,
    layout: "/auth",
    hideInSidebar: true,
  },
  {
    path: "/reset-password/:id/:token",
    name: "Reset Password",
    icon: "ni ni-key-25 text-info",
    component: <ResetPassword />,
    layout: "/auth",
    hideInSidebar: true,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-red",
    component: <Icons />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/all-users",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: <AllUsers />,
    layout: "/admin",
    hideInSidebar: false,
  },
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <Index />,
  //   layout: "/admin",
  // },
  {
    path: "/add-candidate",
    name: "Add Candidate",
    icon: "ni ni-fat-add text-green",
    component: <AddCandidate />,
    layout: "/admin",
    hideInSidebar: false,
  },
  {
    path: "/show-candidate",
    name: "Candidates",
    icon: "ni ni-circle-08 text-green",
    component: <AllCandidates />,
    layout: "/admin",
    hideInSidebar: false,
  },
  {
    path: "/schdule",
    name: "Schedule",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: <AddSchedule />,
    layout: "/admin",
    hideInSidebar: false,
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
