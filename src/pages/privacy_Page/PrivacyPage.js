import React from 'react';
import "../term&Conditions/TermConditions.css"
import Helmet from '../../components/helmet/Helmet';
import { Col, Container, Row } from 'reactstrap';
import mainLogo from "../../data/assests/logo/DmeCART.png";
import AppFooter from '../../components/footer/AppFooter';


const PrivacyPage = () => {
  return (
    <Helmet title="Privacy Policy">
      <Container fluid className="p-0">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" md="6">
            <div className='sticky-header'>
              <div style={{ background: '#007D8A', padding: '20px', marginBottom: '0', width: '100%' }}>
                <img src={mainLogo} alt='mainLogo' className='logo-terms' />
              </div>
              <div style={{ background: '#062F2D', padding: '10px', marginBottom: '20px', width: '100%' }}>
                <h3 className='termTxt'>Privacy Policy</h3>
              </div>
            </div>
            {/* Terms && Condition */}

            <div className='mainText'>
              <h2>Privacy Policy</h2>
              <p>At Adventist Health, we are committed to maintaining your privacy and delivering a website that provides you with quality, timely information about our organization. Please read our website privacy policy (the “Privacy Policy”) below to understand how information collected through our website is used and disclosed.

                To understand how your protected health information may be used or disclosed by us, we invite you to read the applicable Notice of Privacy Practices (the “Notice”). The Notice also describes your rights with regard to such information. If you have further questions about the Privacy Policy or the Notice, please contact our Corporate Privacy Officer at (916) 406-0000.

                Adventist Health is a faith-based not-for-profit system of health care providers which takes your privacy and security very seriously. While we are not subject to the California Consumer Privacy Act, we do have significant privacy and security protections that we have put in place for our patients and employees. These protections are designed utilizing the HIPAA privacy and security rules and privacy best practices to ensure your personal information is protected.</p>
              <br />
              <h2>Acceptance of Privacy Policy</h2>
              <p>Adventist Health is committed to maintaining the privacy of your personal information collected through this website, adventisthealth.org (the “Website”). This Privacy Policy discloses Adventist Health’s information collection and dissemination practices in connection with the Website and applies solely to the information that we collect through the Website. This Privacy Policy does not address personal information that you provide to us in other contexts (e.g., through a business or investment relationship not handled through the Website).</p>
              <br />
              <h2>What This Privacy Policy Covers</h2>
              <p>By using the Website, you signify your acceptance of this Privacy Policy. If you do not agree to the terms of this Privacy Policy, please do not use this Website. Your continued use of the Website following the posting of changes to these terms will mean that you accept those changes. </p>
            </div>
            {/* <button>Accept</button> */}

          </Col>
        </Row>
      </Container>

      <AppFooter />
    </Helmet>
  );
}

export default PrivacyPage;
