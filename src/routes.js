
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

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Add New Employee",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Employee List",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Leave List",
    icon: "ni ni-single-02 text-yellow",
    component: LeaveList,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Terminated List",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/elogin",
    name: "ELogin",
    icon: "ni ni-key-25 text-info",
    component: ELogin,
    layout: "/auth",
  },
   
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-circle-08 text-pink",
    component: Logout,
    layout: "/auth",
  },
];
export default routes;
