
import React from 'react';
import "./RedirectPage.css"
import SpinLoader from '../spin_loader/SpinLoader';
import { Spinner } from 'reactstrap';

const RedirectPage = ({countdown}) => {
   

    return (
        <div>
            <div className="loader-container">
                <Spinner color="success" style={{ width: '7rem', height: '7rem' }} />
            </div>
            <p className='redirect_content'> You are Redirect to Stripe Account with in {countdown} and Complete the Process</p>
        </div>
    )
}

export default RedirectPage