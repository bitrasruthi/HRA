import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useState, useEffect } from 'react';
import store from "reduxstore/store";
import get_hrslist from "reduxstore/actions/hrsAction";
import { connect, useSelector } from "react-redux";
import React from 'react';


const Header = () => {
  const [data, setdata] = useState({});
  
  const counter = useSelector( (state) => state)
  
  React.useEffect(async () => { 
  if(!counter.getthrslist)  await get_hrslist()
       await setdata(counter.getthrslist)
     console.log(data)
  })

  return (
    <>
      <div className="header bg-gradient-success pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className=" card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Emp Count
                        </CardTitle>
                        <span className="cardtry h2 font-weight-bold mb-0">
                        {data.count ? data.count : 'loading..' }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Month Hours
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> {data.total ? data.total.totalLastMonthHours : 'loading..' }</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Last Month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Week
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> {data.total ? data.total.totalLastWeekHours : 'loading..' }</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" />
                      </span>{" "}
                      <span className="text-nowrap">Since Last Week</span>
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

export default Header;

