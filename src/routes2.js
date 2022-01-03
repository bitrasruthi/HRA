
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
import Holidays from './components/Admin Files/Settings/Holidays/holidays';
import OfficeHours from './components/Admin Files/Settings/officeHours';
import Orgprofile from './components/Admin Files/Settings/orgProfile';
import EmpRestPassword from 'components/Admin Files/Employee Reset Password/empresetpassword';
var routes2 = [
  {
    path: "/holidays",
    name: "Holiday List",
    icon: "fas fa-clipboard-list text-blue",
    component: Holidays,
    layout: "/admin",
  },
  {
    path: "/officehours",
    name: "Office Hours",
    icon: "fas fa-business-time text-yellow",
    component: OfficeHours,
    layout: "/admin",
  },

  {
    path: "/companyprofile",
    name: "Company Profile",
    icon: "fas fa-sitemap text-orange",
    component: Orgprofile,
    layout: "/admin",
  },
  {
    path: "/resetpassword",
    name: "Reset Password",
    icon: "fa fa-key text-pink",
    component: EmpRestPassword,
    layout: "/admin",
  },
 
   
  {
    path: "/logout",
    name: "Logout",
    icon: "fas fa-sign-out-alt text-danger",
    component: Logout,
    layout: "/auth",
  },
];
export default routes2;
