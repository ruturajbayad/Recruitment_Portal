import AllCandidates from "views/examples/AllCandidates";
import AddCandidate from "views/examples/AddCandidate";
import AddSchedule from "views/examples/AddSchedule";
import EmployeeIndex from "views/EmployeeIndex";
import Profile from "views/examples/Profile";
var employeeRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <EmployeeIndex />,
    layout: "/employee",
  },
  {
    path: "/user-profile/:id",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/employee",
    hideInSidebar: true,
  },
];

export default employeeRoutes;
