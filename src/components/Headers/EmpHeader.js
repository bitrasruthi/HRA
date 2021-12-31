import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useState, useEffect } from 'react';
import store from "reduxstore/store";
import get_hrslist from "reduxstore/actions/hrsAction";
import { connect, useSelector } from "react-redux";
import React from 'react';
import { getCurrentUser } from './../../services/authService';


const EmpHeader = () => {
  const [data, setdata] = useState({});
  
  const counter = useSelector( (state) => state)
  
  React.useEffect(async () => { 
  if(!counter.getcurrent)  await getCurrentUser()
       await setdata(counter.getcurrent)
     console.log(data)
  })

  return (
    <>
      <div className="header bg-gradient-purple pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
           
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-8"
                        >
                          Hi
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-2"> </span>
                      </div>
                      <Col className="col-auto">
                        
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            
             
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EmpHeader;

