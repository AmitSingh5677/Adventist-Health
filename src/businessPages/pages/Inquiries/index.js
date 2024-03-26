import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import InquiriesCard from "../../components/InquiriesCard"
import './index.css'
import React,{useState} from 'react';

const InquiriesBusiness = ()=>{
   const[inquiryData,setInquiryData]=useState([])
  
   React.useEffect(() => {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const userid =  parseInt(sessionStorage.getItem("userid"));
      console.log(userid,"userid")
    
      const fetchData = async () => {
          try {
            
              const response = await fetch(`https://dmecart-38297.botics.co/business/inquiries/${userid}/`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Token ${token}`
                  },
              });
    
              const data = await response.json();
              if (data) {
                console.log(data,"data")
               // setOrderData(data)
               setInquiryData(data)
    
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
    
      fetchData();
    
    }, []);
    return <div>
      <div>
       <AppHeader />
      
      </div>

       <div className="inquiry-section">
        <div className="rounded bg-dark-subtle p-3 m-1">
           <div className="bg-light rounded p-3">
            <h1>All Inquiries</h1>
            <div className="mt-3">
            <InquiriesCard  inquiryData={inquiryData}/>

            </div>
           
           </div>
        </div>
       </div>
       <AppFooter />
    </div>
}

export default InquiriesBusiness