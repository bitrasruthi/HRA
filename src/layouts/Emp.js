
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";


import Holidays from './../components/Admin Files/Settings/Holidays/holidays';
import routes3 from './../routes3';
import EmpNavbar from './../components/Navbars/EmpNavbar';
import ESidebar from "components/Sidebar/ESidebar";

const Emp = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/emp") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };



  const getBrandText = (path) => {
    for (let i = 0; i < routes3.length; i++) {
      if (
        props.location.pathname.indexOf(routes3[i].layout + routes3[i].path) !==
        -1
      ) {
        return routes3[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <ESidebar
              {...props}
        routes={routes3}
        logo={{
          innerLink: "/emp/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className=" main-content" ref={mainContent}>
        <EmpNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes3)}
          <Redirect from="*" to="/emp/index" />
          {/* <Route path="/admin/holidays" component={Holidays} /> */}

        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Emp;
