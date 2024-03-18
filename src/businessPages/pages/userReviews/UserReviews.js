import AppHeader from '../../components/AppHeader/AppHeader'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import AppFooter from '../../components/AppFooter/AppFooter'
import './UserReview.css'
import user1 from '../../../data/assests/download_img/user(1).png'
import { StarRating } from '../../../pages/ratingsScreen/RatingScreen'

const UserReviews = () => {

  return (
  <div>
    <AppHeader />
    <div className='my-review-section'>
    <div className='d-flex flex-row justify-content-end p-3'>
      <label htmlFor='sort-filter'>Sort by:</label>
      <select id='sort-filter' >


        <option value='new to old'>New to old</option>
        <option value='new to old'>Old to New</option>
        <option value='new to old'>Sort by starts</option>
      </select>

    </div>
    <div className='table-reviews'>
    <table className=' table-margin'  >

      <thead className='reviews-header-section'>
        <tr>
          <th className='w-2 t-head-reviews'>USER/PATIENT</th>
          <th className='w-5 ps-3'>STARS</th>
          <th className='w-5 '>RATING MESSAGE</th>
          <th className='w-5'>CHALLENGE RATING/REACH ADMIN</th>
          <th className=''></th>

        </tr>
      </thead>

      <tbody>
        <tr className='border-bottom border-body-secondary'>
          <td className='profile-container'>
            <img src={user1} alt='user profile' />
            <p className='mb-0 ms-2'> JOHN SMITH</p>
          </td>
          <td className='pt-3'>
            <StarRating rating={2.5}/>

          </td>
          <td className='text-wrap'>
            Review from the user, some suggestion....
          </td>
          <td>
            <input className='ps-1 py-2 input-msg' type='text' placeholder='Message to Admin'  />
          </td>
          <td>
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>

          </td>

        </tr>


        <tr className='border-bottom border-body-secondary'>
          <td className='profile-container'>
            <img src={user1} alt='user profile' />
            <p className='mb-0'>JOHN SMITH</p>
          </td>
          <td>
            *****

          </td>
          <td className='text-wrap'>
            Review from the user, some suggestion....
          </td>
          <td>
            <input className='p-5 pt-1 pb-1' type='text' placeholder='Message to Admin' />
          </td>
          <td>
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>

          </td>

        </tr>

        <tr className='border-bottom border-body-secondary'>
          <td className='profile-container'>
            <img src={user1} alt='user profile' />
            <p className='mb-0'> JOHN SMITH</p>
          </td>
          <td>
            *****

          </td>
          <td className='text-wrap'>
            Review from the user, some suggestion....
          </td>
          <td>
            <input className='p-5 pt-1 pb-1' type='text' placeholder='Message to Admin' />
          </td>
          <td>
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>

          </td>

        </tr>

        <tr className='border-bottom border-body-secondary'>
          <td className='profile-container'>
            <img src={user1} alt='user profile' />
            <p>JOHN SMITH</p>
          </td>
          <td>
            *****

          </td>
          <td className='text-wrap'>
            Review from the user, some suggestion....
          </td>
          <td>
            <input className='p-5 pt-1 pb-1' type='text' placeholder='Message to Admin' />
          </td>
          <td>
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>

          </td>

        </tr>


      </tbody>
    </table>

    </div>
    </div>
  



    <DashboardFooter />
    <AppFooter />

  </div>
  )
}

export default UserReviews