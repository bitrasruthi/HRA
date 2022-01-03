
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Logout from './components/Admin Files/Logout/logout';
import AddNewEmp from '../src/components/Admin Files/Adding Employee/addNewEmp'
import Employees from'../src/components/Admin Files/Employee List/emplist'
import ELogin  from 'views/examples/ELogin.js';
import LeaveList from "views/examples/Profile";
import EmpWorkingStas from './components/Admin Files/Employee Working Stats/empWorkingStats';
import Header  from 'components/Headers/Header.js';
import TerminateEmp from './components/Admin Files/Terminate Emp/terminateEmp';

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component:Header,
    layout: "/admin",
  },
  {
    path: "/addnew",
    name: "Add New Employee",
    icon: "ni ni-circle-08 text-success",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Employee List",
    icon: "ni ni-bullet-list-67 text-warning",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/leavelist",
    name: "Leave List",
    icon: "ni ni-bullet-list-67 text-info",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/terminatedlist",
    name: "Terminated List",
    icon: "fas fa-user-slash text-red",
    component: TerminateEmp,
    layout: "/admin",
  },
  {
    path: "/workingstats",
    name: "Working Stats",
    icon: "ni ni-chart-bar-32 text-purple",
    component: EmpWorkingStas,
    layout: "/admin",
  },
 
   
 
];
export default routes;
