import AppHeader from '../../components/AppHeader/AppHeader'
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import AppFooter from '../../components/AppFooter/AppFooter'
import { MdKeyboardArrowRight } from "react-icons/md";
import 'bootstrap';
import Helmet from '../../components/helmet/Helmet';
import { Col, Container, Row, Table } from 'reactstrap';
import { StarRating } from '../../components/starRating/StarRating';
import './UserReviews.css'

const userReviews = [
  {
    userName: "JOHN SMITH",
    userRating: 3,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 1.5,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 4.5,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 1.75,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 5,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 4.5,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 3,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 2,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 1.5,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 3.5,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },
  {
    userName: "JOHN SMITH",
    userRating: 4.5,
    userDeatils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim consequat,"
  },


]

const DashBoardReviews = () => {

  return (<div>
    <Helmet title="All Reviews" />
    <AppHeader />
    <div style={{ marginTop: "7%", marginBottom: "5%" }}>
      <DashboardNavbar btn_name={'reviews'} />

      <div style={{ marginTop: "2%" }}>
        <section>
          <Container>
            <Row className='orderHistory__conatiner'>
              <Row>
                <Col xs="12" sm="12" lg="12">
                  <Table className="table table-hover borderless responsive striped">
                    <thead>
                      <tr>
                        <th className='table_theader'>User/patient</th>
                        <th className='table_theader ps-4'>STARS</th>
                        <th className='table_theader ps-2' >REVIEW MESSAGE</th>
                        <th className='table_theader '></th>
                      </tr>
                    </thead>
                    <tbody className='body__txt'>
                      {userReviews.map((item, index) => (
                        <tr key={index}>
                          <td className='body__elemnts'>{item.userName}</td>
                          <td className='body__elemnts'> <StarRating rating={item.userRating} /></td>
                          <td className='body__elemnts'>{item.userDeatils}</td>
                          <td className='body__elemnts button-view'>
                           <span className='button-view'>VIEW ALL <MdKeyboardArrowRight /></span>  
                          </td>
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
    </div>
    <AppFooter />

  </div>
  )
}

export default DashBoardReviews