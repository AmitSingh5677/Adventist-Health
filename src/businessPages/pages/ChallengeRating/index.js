import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import ChallengeCard from "../../components/ChallengeCard"
import './index.css'
import React,{useState} from 'react';

const ChallengeRating = ()=>{

   const[ratingData,setratingData]=useState([])
   React.useEffect(() => {
       const token = JSON.parse(sessionStorage.getItem("token"));
       const userid =  parseInt(sessionStorage.getItem("userid"));
      
       const fetchData = async () => {
           try {
             
               const response = await fetch(`https://dmecart-38297.botics.co/patients/ratings/${userid}/`, {
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
                setratingData(data)
     
               }
           } catch (error) {
               console.error('Error fetching data:', error);
           }
       };
     
       fetchData();
     
     }, []);

    //  const[challangeRating,setchallangeRating]=useState([])
    //  React.useEffect(() => {
    //      const token = JSON.parse(sessionStorage.getItem("token"));
    //      const userid =  parseInt(sessionStorage.getItem("userid"));
        
    //      const fetchData = async () => {
    //          try {
               
    //              const response = await fetch(`https://dmecart-38297.botics.co/business/challenge_rating/${userid}/`, {
    //                  method: 'GET',
    //                  headers: {
    //                    'Content-Type': 'Application/json',
    //                    'Authorization': `Token ${token}`
    //                  },
    //              });
       
    //              const data = await response.json();
    //              if (data) {
    //               setchallangeRating(data)
       
    //              }
    //          } catch (error) {
    //              console.error('Error fetching data:', error);
    //          }
    //      };
       
    //      fetchData();
       
    //    }, []);

    return <div className="challenge-rating-page">
       <AppHeader />
       <div className="p-3 challenge-section">
        <div className="rounded bg-dark-subtle p-3 m-1">
           <div className="bg-light rounded p-3">
            <h1 className="my-1">Challenge Rating</h1>
            <ChallengeCard  ratingData={ratingData} />
           </div>
        </div>
       </div>
       <AppFooter />
    </div>
}

export default ChallengeRating