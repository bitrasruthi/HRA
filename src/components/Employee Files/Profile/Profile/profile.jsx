import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import EduCard from "../Educational Details/eduCardDegree";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Forms from "components/Common/form";
import { Joi } from 'joi-browser';
import _ from 'lodash'
import { getProDetails } from 'services/profileService';
import { profileRegister } from "services/profileService";
import {toast} from 'react-toastify'
class ProfileNew extends Forms {
  state = {
    data: {
      FirstName: '', MiddleName: '', LastName: '', Address: '', City: '',
      Country: '', Pincode: '', AboutMe: '', role: '', fatherName: '', motherName: '',
      emergencyNumber: '', emergencyAddress: '',
    },
    employees: [],
    pageSize: 4,
    id: [],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "FirstName", order: "asc" },
  }

  // schema = {
  //   FirstName: Joi.string().min(3).required(),
  //   MiddleName: Joi.string(),
  //   LastName: Joi.string().min(3).required(),
  //   fatherName: Joi.string().min(3).required(),
  //   motherName: Joi.string().min(3).required(),
  //   emergencyNumber: Joi.number().min(10).required(),
  //   Address: Joi.string().min(3).required(),
  //   City: Joi.string().min(3).required(),
  //   Country: Joi.string().min(3).required(),
  //   Pincode: Joi.number().min(6).required(),
  //   emergencyAddress: Joi.string().min(3).required(),
  //   AboutMe: Joi.string().min(3).required(),
  //   // last_updated_on: Joi.string().required(),

  // };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  
  doSubmit = async () => {
    try {
      const { data } = this.state;
      const tt = await profileRegister(data);
      toast.success("Profile Updated Successful");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/edashboard";
      }, 2000);
      const { state } = this.props.location;
      await getProDetails();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.EmployeeName = ex.response.data.data;
        this.setState({ errors });
      }
    }
  }


  async componentDidMount() {
    // this.doSubmit();
    // const tt = getEmployees();
    // console.log(tt);

    const { data: profile } = await getProDetails();
    let pp = profile[0].profile;
    console.log(pp);
    this.setState({ data: this.mapToViewModel(pp) });
    if (pp === []) { this.doSubmit(); }

  }

  mapToViewModel(pro) {
    return {
      FirstName: pro.FirstName,
      MiddleName: pro.MiddleName,
      LastName: pro.LastName,
      Country: pro.Country,
      City: pro.City,
      Address: pro.Address,
      Pincode: pro.Pincode,
      AboutMe: pro.AboutMe,
      fatherName: pro.fatherName,
      motherName: pro.motherName,
      emergencyAddress: pro.emergencyAddress,
      emergencyNumber: pro.emergencyNumber,
      // last_updated_on: pro.last_updated_on,
    };
  }

  render() {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {/* <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require()
                            .default
                        }
                      /> */}
                    </a>
                  </div>
                </Col>
              </Row>
              
              <CardBody className="pt-3 pt-md-4">
               
                <div className="text-center">
                <h2 className="text-center">{this.state.data.FirstName} {this.state.data.MiddleName} {this.state.data.LastName}

                  </h2>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {this.state.data.City}, {this.state.data.Country}
                  </div>
                  
                  <div>
                    <i className="ni education_hat mr-2" />
                    {this.state.data.EducationDetails}
                  </div>
                  <hr className="my-4" />
                  <p>
                    {this.state.data.AboutMe}
                  </p>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                 
                </Row>
              </CardHeader>
              <CardBody>
              <Form role="form" onSubmit={this.handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                      {this.renderInput("FirstName", "First Name",)}
                      </Col>
                      <Col lg="4">
                      {this.renderInput("MiddleName", "Middle Name",)}
                      </Col>
                      <Col lg="4">
                      {this.renderInput("LastName", "Last Name",)}
                      </Col>
                    </Row>
                   
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                      {this.renderInput("Address", "Address",)}
                      </Col>
                      <Col md="6">
                      {this.renderInput("emergencyNumber", "Emergency Number",)}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                      {this.renderInput("City", "City",)}

                      </Col>
                      <Col lg="4">
                      {this.renderInput("Country", "Country",)}

                      </Col>
                      <Col lg="4">
                      {this.renderInput("Pincode", "Pincode",)}

                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                  {this.renderInput("AboutMe", "About me",)}

                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col className="order-xl-1 mt-2" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Educational Details</h3>
                  </Col>
                  </Row>
                  </CardHeader>
                  <CardBody className="mt pt-lg-7">
                    {/* <EduCard /> */}
                  </CardBody>
                  </Card>
                  </Col>
        </Row>
      </Container>
    </>
  );
}
};

export default ProfileNew;
