
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <>
      <footer className="py-8">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.codegene.io/"
                  target="_blank"
                >
                  Codegene
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.codegene.io/"
                    target="_blank"
                  >
                    Codegene
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://www.codegene.io/#about"
                    target="_blank"
                  >
                    About Us
                  </NavLink>
                </NavItem>
               
                
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
