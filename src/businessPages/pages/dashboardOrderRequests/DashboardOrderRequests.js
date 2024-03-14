import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader'
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import AppFooter from '../../components/AppFooter/AppFooter'
import 'bootstrap'
import { Col, Container, Row, Table } from 'reactstrap';
import Helmet from '../../components/helmet/Helmet';

const userData = [
  {
    userName: "JOHN SMITH",
    equipmentDetails: "FOLDABLE WHEEL CHAIR-LIGHTWEIGHT",
    userAddress: "5th Avenuu,Cambridge Campus,California, USAm"
  },
  {
    "userName": "ALICE JONES",
    "equipmentDetails": "DIGITAL CAMERA-PROFESSIONAL",
    "userAddress": "12 Oak Street, Apt 3B, Brooklyn, New York, USA"
  },
  {
    "userName": "MICHAEL DAVIS",
    "equipmentDetails": "SMARTPHONE-FLAGSHIP MODEL",
    "userAddress": "21 Maple Avenue, Suite 205, San Francisco, California, USA"
  },
  {
    "userName": "DAVID MILLER",
    "equipmentDetails": "HEADPHONES-NOISE CANCELLING",
    "userAddress": "45 Chestnut Road, Apartment 7D, Seattle, Washington, USA"
  },
  {
    "userName": "CHRISTOPHER WILSON",
    "equipmentDetails": "TABLET-10 INCH DISPLAY",
    "userAddress": "55 Birch Avenue, Dallas, Texas, USA"
  },
  {
    "userName": "OLIVIA MARTIN",
    "equipmentDetails": "GAMING PC-HIGH-END",
    "userAddress": "18 Willow Lane, Chicago, Illinois, USA"
  },
  {
    "userName": "AIDEN ANDERSON",
    "equipmentDetails": "ELECTRIC SCOOTER-FOLDABLE",
    "userAddress": "27 Rose Street, Austin, Texas, USA"
  },
  {
    "userName": "AVA THOMAS",
    "equipmentDetails": "SMART WATCH-WATERPROOF",
    "userAddress": "14 Pine Grove, Orlando, Florida, USA"
  },
  {
    "userName": "MASON GARCIA",
    "equipmentDetails": "DRONE-HD CAMERA",
    "userAddress": "7 Cedar Avenue, Phoenix, Arizona, USA"
  }






]

const DashboardOrderRequests = () => {

  return (
    <div>
      <Helmet title="order-requests" />
      <div style={{ marginBottom: "8%", marginTop: "7%" }}>
        <AppHeader />
        <DashboardNavbar btn_name={'order_requests'} />

        <div style={{ marginTop: "1%", marginBottom: "2%" }}>
          <section>
            <Container>
              <Row className='orderHistory__conatiner'>
                <Row>
                  <Col xs="12" sm="12" lg="12">
                    <Table className="table table-hover borderless responsive striped">
                      <thead>
                        <tr>
                          <th className='table_theader'>User/patient</th>
                          <th className='table_theader'>Equipment DETAILS</th>
                          <th className='table_theader'>ORDER DETAILS</th>
                          <th className='table_theader'>ACCEPT</th>
                          <th className='table_theader'>REJECT</th>
                        </tr>
                      </thead>
                      <tbody className='body__txt'>
                        {userData.map((item, index) => (
                          <tr key={index}>
                            <td className='body__elemnts'>{item.userName}</td>
                            <td className='body__elemnts'>{item.equipmentDetails}</td>
                            <td className='body__elemnts'>{item.userAddress}</td>
                            <td><button className='btn btn-success m-1 pl-4 pr-4' style={{ fontFamily: "Poppins" }}>ACCEPT</button></td>
                            <td> <button className='btn btn-danger m-1 pl-4 pr-4' style={{ fontFamily: "Poppins" }}>REJECT</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Row>
            </Container>
          </section>
        </div>
        <DashboardFooter />
        <AppFooter />

      </div>
    </div>
  )
}

export default DashboardOrderRequests







