import { useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  FormGroup,
   Button,
  Form,
  Input,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const Icons = () => {
  const [copiedText, setCopiedText] = useState();

  const doSubmit = (dd) => { 
    // e.preventDefault()
   console.log(dd)
  }
  return (
    <>
      {/* Page content */}
      <Container className="mt-3" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Add New emp</h3>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4" >
              <Col lg="6">
                        <FormGroup >
                          <Row>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                          
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Joining Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="data"
                          />
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </Row>
                        <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    // onClick={(e) => this.doSubmit()}
                    size="sm"
                  >
                    Connect
                  </Button>
                        </FormGroup>
                      </Col>
                      
                     
                
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
