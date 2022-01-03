
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello Jesse</h1>
              
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
    </>
  );
};

export default UserHeader;
