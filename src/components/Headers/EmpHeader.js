import { Card, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from 'react';
import store from "reduxstore/store";
import get_hrslist from "reduxstore/actions/hrsAction";
import { connect, useSelector } from "react-redux";
import React from 'react';
import { getCurrentUser } from './../../services/authService';
import TimeCard  from 'components/Employee Files/Dashboard/timecard';
import EProcard  from 'components/Employee Files/Dashboard/empProHor';
import { getemppro } from "services/prodService";
import EProcard2 from './../Employee Files/Dashboard/empProHor2';


const EmpHeader = () => {
  const [data, setdata] = useState({});
  const [lastMonthHours, setLastMonthHours] = useState({});
  
  const counter = useSelector( (state) => state)
  
  React.useEffect(async () => { 
  const tt =  await getCurrentUser()
  console.log(tt)
       setdata(tt.EmployeeName)

  const pp = await getemppro()  
  // setLastMonthHours(pp.data)
      //  console.log(pp.data);
  })

  
  return (
    <>
      <div className="header bg-gradient-purple pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row className="ml">
              <Col lg="6" xl="4">
               <TimeCard/>
              </Col> 
              <Col lg="6" xl="4">
               <EProcard
               />
              </Col>  
              <Col lg="6" xl="4">
               <EProcard2
               />
              </Col>            
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EmpHeader;

