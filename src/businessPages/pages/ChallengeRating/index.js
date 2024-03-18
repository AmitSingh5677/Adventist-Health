import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"
import ChallengeCard from "../../components/ChallengeCard"
import './index.css'
const ChallengeRating = ()=>{
    return <div className="challenge-rating-page">
       <AppHeader />
       <div className="p-3 challenge-section">
        <div className="rounded bg-dark-subtle p-3 m-1">
           <div className="bg-light rounded p-3">
            <h1 className="my-1">Challenge Rating</h1>
            <ChallengeCard />
            <ChallengeCard />
           </div>
        </div>
       </div>
       <AppFooter />
    </div>
}

export default ChallengeRating