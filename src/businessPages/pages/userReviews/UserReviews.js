import AppHeader from '../../components/AppHeader/AppHeader'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import AppFooter from '../../components/AppFooter/AppFooter'

const UserReviews = () => {

  return (
  <div>
    <AppHeader />
    <div className='d-flex flex-row justify-content-end p-3'>
      <label htmlFor='sort-filter'>Sort by:</label>
      <select id='sort-filter' >


        <option value='new to old'>New to old</option>
        <option value='new to old'>Old to New</option>
        <option value='new to old'>Sort by starts</option>
      </select>

    </div>
    <table className=' table-margin'  >

      <thead className='bg-body-secondary'>
        <tr>
          <th className='w-2'>USER/PATIENT</th>
          <th className='w-5'>STARS</th>
          <th className='w-5'>RATING MESSAGE</th>
          <th className='w-5'>CHALLENGE RATING/REACH ADMIN</th>

        </tr>
      </thead>

      <tbody>
        <tr className='border-bottom border-body-secondary'>
          <td>
            <img src='' alt='user profile' />
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
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>
          </td>

        </tr>


        <tr className='border-bottom border-body-secondary'>
          <td>
            <img src='' alt='user profile' />
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
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>
          </td>

        </tr>

        <tr className='border-bottom border-body-secondary'>
          <td>
            <img src='' alt='user profile' />
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
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>
          </td>

        </tr>

        <tr className='border-bottom border-body-secondary'>
          <td>
            <img src='' alt='user profile' />
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
            <button type='button' className='btn btn-success m-1'>CHALLENGE</button>
          </td>

        </tr>


      </tbody>
    </table>



    <DashboardFooter />
    <AppFooter />

  </div>
  )
}

export default UserReviews