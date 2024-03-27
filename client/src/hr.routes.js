import HrIndex from "views/HrIndex";
import AddCandidate from "views/examples/AddCandidate";
import AddSchedule from "views/examples/AddSchedule";
import AllCandidates from "views/examples/AllCandidates";
import Profile from "views/examples/Profile";

var HRroutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <HrIndex />,
    layout: "/hr",
  },
  {
    path: "/add-candidate",
    name: "Add Candidate",
    icon: "ni ni-fat-add text-green",
    component: <AddCandidate />,
    layout: "/hr",
    hideInSidebar: false,
  },
  {
    path: "/show-candidate",
    name: "Show Candidate",
    icon: "ni ni-circle-08 text-green",
    component: <AllCandidates />,
    layout: "/hr",
    hideInSidebar: false,
  },
  {
    path: "/schdule",
    name: "Schedule",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: <AddSchedule />,
    layout: "/hr",
    hideInSidebar: false,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/hr",
    hideInSidebar: true,
  },
];

export default HRroutes;
