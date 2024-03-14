import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import ChallengeCard from "../../components/ChallengeCard"
const ChallengeRating = ()=>{
    return <div>
       <AppHeader />
       <div className="p-3">
        <div className="rounded bg-dark-subtle p-3 m-1">
           <div className="bg-light rounded p-3">
            <h5>Challenge Rating</h5>
            <ChallengeCard />
            <ChallengeCard />
           </div>
        </div>
       </div>
       <AppFooter />
    </div>
}

export default ChallengeRating