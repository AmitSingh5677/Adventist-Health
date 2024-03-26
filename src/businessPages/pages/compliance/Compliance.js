import React from 'react';
import "./Compliance.css"
import AppFooter from "../../components/AppFooter/AppFooter"
import AppHeader from "../../components/AppHeader/AppHeader"

const Compliance = () => {
     const token = sessionStorage.getItem('token')


    return <div >
        <AppHeader />
        <div className='top-section'>
            <div className="title_Header">
            <h3 className='ms-5'>HIPAA and compliance</h3>

            </div>
            <div className="compliance__txt">
                <p >Random data dump . This is a random sentemce tp be filled with the guidelines Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines


                    Random data dump . This is a random sentemce tp be filled with the guidelines

                    Random data dump . This is a random sentemce tp be filled with the guidelinesRandom data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelinesRandom data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines
                    Random data dump . This is a random sentemce tp be filled with the guidelines

                </p>
                {/* <input type="checkbox" className="m-2" id='agreement' />
                <label htmlFor="agreement">I agree to the given text.</label> */}
              {token &&
               <div className="d-flex justify-content-around" style={{marginTop:"25px"}}>
               {/* <button  className="back_btn">Back</button> */}
               {/* <button className="continu_txt">Continue</button> */}
           </div> }
               
            </div>
        </div>

        <AppFooter />
    </div>
}

export default Compliance