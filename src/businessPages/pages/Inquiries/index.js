import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import InquiriesCard from "../../components/InquiriesCard"
import './index.css'

const InquiriesBusiness = ()=>{
    return <div>
      <div>
       <AppHeader />

      </div>

       <div className="inquiry-section">
        <div className="rounded bg-dark-subtle p-3 m-1">
           <div className="bg-light rounded p-3">
            <h1>All Inquiries</h1>
            <div className="mt-3">
            <InquiriesCard/>

            </div>
            <InquiriesCard />
           </div>
        </div>
       </div>
       <AppFooter />
    </div>
}

export default InquiriesBusiness