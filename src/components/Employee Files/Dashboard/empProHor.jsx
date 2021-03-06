import React from 'react';
import { getemppro } from 'services/prodService';
import { toast } from 'react-toastify';

import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
} from "reactstrap";

class EProcard extends React.Component {
  state = {
    lastMonthHours: '',
    lastWeekHours: '',
    name: ''
}

async componentDidMount() {

    try {
        const dd = await getemppro();
        console.log(dd);
        await this.setState({ lastMonthHours: dd.data.lastMonthHours, lastWeekHours: dd.data.lastWeekHours });
    }
    catch (ex) {
        if (ex.response && ex.response.status === 400) {
            this.setState({ isLoading: false });
            toast("something wrong ")
        }
    }
}
  render() {
    return (
      <Card className="text-center card-stats mb-6 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle
              tag="h5"
              className="text-uppercase text-muted mb-0"
            >
              Total Production Hours
            </CardTitle>
            <div className="icon icon-shape bg-danger text-white ml mt-2 rounded-circle shadow">
              <i className="fas fa-users" />
            </div>
            <div className='mt-3'>
            <span className="cardtry ml h2 font-weight-bold mb-0">
            {this.state.lastMonthHours || 'Loading...'}
            </span>
            </div>
            
          </div>
          
        </Row>
      </CardBody>
    </Card>



    
    )
    // ) <div style={{ marginLeft: '85px' }}>
    //   <div className="container" style={{ paddingLeft: "400px", paddingRight: "200px", marginLeft: '200px', paddingTop: "200px" }}>
    //     <Card
    //       style={{ marginTop: "-455px", }}
    //       className="bg-secondary shadow border-0"
    //     >
    //       <CardBody style={{ marginBottom: '0px' }} className="px-lg-7 py-lg-4">
    //         <h1 style={{ textAlign: "center", marginLeft: '-40px', width: '300px', }}>Total Production Hours</h1>
    //         <Card style={{ marginLeft: '-70px', marginRight: '120px' }} className="card-stats mb-4 mb-xl-0">
    //           <CardBody >
    //             <div>
    //                   <Col className="col-auto">
    //                 <div style={{marginLeft: '30px', }} className="icon icon-shape bg-danger text-white rounded-circle shadow">
    //                   <i className="fas fa-chart-bar" />
    //                 </div>
    //               </Col>
    //                 </div>
    //             <Row style={{marginTop: '10px'}}>
    //               <div className="col">
    //                 <CardTitle
    //                   tag="h5"
    //                   className="text-uppercase text-muted mb-0"
    //                 >
    //                 </CardTitle>
                   
    //                 <span style={{marginLeft: '-5px', }}className="h2 font-weight-bold mb-0">
    //                   {this.props.hrs}
    //                 </span>
    //               </div>
                  
    //             </Row>
    //             <p className="mt-3 mb-0 text-muted text-sm">
    //               <span className="text-success mr-2" />
    //               <span style={{marginLeft: '30px'}} className="text-nowrap">Last Month</span>
    //             </p>
    //           </CardBody>
    //         </Card>
    //         <Card style={{ marginLeft: '120px', marginRight: '-70px', marginTop: '-160px' }} className="card-stats mb-4 mb-xl-0">
    //           <CardBody >
    //             <div>
    //             <Col className="col-auto">
    //                 <div style={{marginLeft: '30px'}}className="icon icon-shape bg-orange text-white rounded-circle shadow">
    //                   <i  className="fas fa-chart-bar" />
    //                 </div>
    //               </Col>
    //             </div>
    //             <Row style={{marginTop: '10px'}}>
    //               <div className="col">
    //                 <CardTitle
    //                   tag="h5"
    //                   className="text-uppercase text-muted mb-0"
    //                 >
    //                 </CardTitle>
    //                 <span style={{marginLeft: '-5px'}} className="h2 font-weight-bold mb-0">
    //                   {this.props.whrs}
    //                 </span>
    //               </div>
                 
    //             </Row>
    //             <p className="mt-3 mb-0 text-muted text-sm">
    //               <span className="text-success mr-2" />
    //               <span style={{marginLeft: '30px'}} className="text-nowrap">Last Week</span>
    //             </p>
    //           </CardBody>
    //         </Card>
    //       </CardBody>
    //     </Card>
    //   </div>

    // </div>;
  }
}

export default EProcard;