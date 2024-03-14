import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import InquiriesCard from "../../components/InquiriesCard"

const InquiriesBusiness = ()=>{
    return <div>
       <AppHeader />
       <div className="p-3">
        <div className="rounded bg-dark-subtle p-3 m-1">
           <div className="bg-light rounded p-3">
            <h5>All Inquiries</h5>
            <InquiriesCard />
            <InquiriesCard />
           </div>
        </div>
       </div>
       <AppFooter />
    </div>
}

export default InquiriesBusiness