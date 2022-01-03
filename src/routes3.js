
import Index from "views/Index.js";
import ProfileNew from "components/Employee Files/Profile/Profile/profile";
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
import AttList from './components/Employee Files/My Attendance/myattendance';
import LeaveForm from './components/Employee Files/Leave Form/leaveform';
import ELeavsList from './components/Employee Files/My Leaves/eleavelist';
import ChangePassword from "components/Employee Files/Change Password/changePassword";

var routes3 = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: EIndex,
    layout: "/emp",
  },
  {
    path: "/attendance",
    name: "My Attendance",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: AttList,
    layout: "/emp",
  },
  
  {
    path: "/leaveform",
    name: "Leave Form",
    icon: "ni ni-single-copy-04 text-orange",
    component: LeaveForm,
    layout: "/emp",
  },
  {
    path: "/myleaves",
    name: "My Leaves",
    icon: "ni ni-map-big text-blue",
    component: ELeavsList,
    layout: "/emp",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-pink",
    component: ProfileNew,
    layout: "/emp",
  },
  {
    path: "/changepassword",
    name: "Change Password",
    icon: "fa fa-key text-purple",
    component: ChangePassword,
    layout: "/emp",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "fas fa-sign-out-alt text-danger",
    component: Logout,
    layout: "/emp",
  },
   
 
];
export default routes3;
