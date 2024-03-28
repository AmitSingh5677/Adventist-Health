import React,{useState,useEffect} from 'react'
import './Analytics.css'
import AppFooter from '../../components/AppFooter/AppFooter'
import AppHeader from '../../components/AppHeader/AppHeader'
import PatientAnalytics from './PatientAnalytics'
import BusinessAnalytics from './BusinessAnalytics'
import Transactions from './TransactionAnalytics'

const Analytics = () => {
    const [tab,setTab] = useState("patient")
  return (
    <div>
    <AppHeader />
   <div className='analytics-section'>
    <div className='analytics-tab-section'>
<button onClick={()=>setTab("patient")} className={tab=="patient"? "active" : "deactive"} >Patients</button>
<button className={tab=="business"? "active ms-3" : "deactive ms-3"} onClick={()=>setTab("business")} >Businesses</button>
<button className={tab=="transaction"? "active ms-3" : "deactive ms-3"} onClick={()=>setTab("transaction")}>Transactions</button>
    </div>
    {tab == "patient" && <PatientAnalytics/> }
    {tab == "business" && <BusinessAnalytics/> }
    {tab == "transaction" && <Transactions/> }
   </div>

    <AppFooter />
  </div>
  )
}

export default Analytics
