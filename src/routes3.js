
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
import EmpHeader from './components/Headers/EmpHeader';
import EIndex from './views/eindex';

var routes3 = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: EIndex,
    layout: "/emp",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: EIndex,
    layout: "/emp",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-circle-08 text-pink",
    component: Logout,
    layout: "/emp",
  },
   
 
];
export default routes3;
