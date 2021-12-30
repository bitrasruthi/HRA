
import React from "react";

import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import Forms from "components/Common/form";

class Maps extends Forms {
  render(){ 

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
              
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
};

export default Maps;
