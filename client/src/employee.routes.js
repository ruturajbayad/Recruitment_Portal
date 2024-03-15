import AllCandidates from "views/examples/AllCandidates";
import AddCandidate from "views/examples/AddCandidate";
import AddSchedule from "views/examples/AddSchedule";
import EmployeeIndex from "views/EmployeeIndex";
var employeeRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <EmployeeIndex />,
    layout: "/employee",
  },
];

export default employeeRoutes;
