import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  const [data,setData] = useState(null)

  const id = sessionStorage.getItem("userid");
  const token = JSON.parse(sessionStorage.getItem("token"));

  const fetchRatings = async()=>{
    const response = await fetch(
      `https://dmecart-38297.botics.co/patients/ratings/${id}/`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "Application/json",
          Authorization: ` Token ${token}`,
        },
      }
    );
  const resData = await response.json()
  setData(resData)
  }
  console.log(data,"geg")

  useEffect(()=>{
    fetchRatings()
  },[])

  return (<div>
    <Helmet title="All Reviews" />
    <AppHeader />
    <div style={{ marginTop: "7%", marginBottom: "5%" }}>
      <DashboardNavbar btn_name={'reviews'} />

      <div style={{ marginTop: "2%" }}>
        <section>
          <Container>
            <Row className=''>
              <Row>
                <Col xs="12" sm="12" lg="12">
                  <Table className="table table-hover borderless responsive striped">
                    <thead >
                      <tr >
                        <th className='table_theader'>USER/PATIENT</th>
                        <th className='table_theader ps-4'>STARS</th>
                        <th className='table_theader ps-2'>REVIEW MESSAGE</th>
                        <th className='table_theader '></th>
                      </tr>
                    </thead>
                    <tbody className='body__txt'>
                      {data?.map((item, index) => (
                        <tr key={item.id}>
                          <td className='body__elemnts cursor' style={{width:"25vw"}} onClick={()=>navigate(`/b/patient-profile-screen/${item.user}`)}>{item.patient_name}</td>
                          <td className='body__elemnts'> <StarRating rating={item?.stars} /></td>
                          <td className='body__elemnts'>{item?.message}</td>
                          <td className='body__elemnts button-view'>
                           <span className='button-view' onClick={()=>navigate("/b/my-reviews")}>VIEW ALL <MdKeyboardArrowRight /></span>  
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