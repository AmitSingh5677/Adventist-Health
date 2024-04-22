import React from "react";
import "../term&Conditions/TermConditions.css";
import Helmet from "../../components/helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import mainLogo from "../../data/assests/logo/DmeCART.png";
import AppFooter from "../../components/footer/AppFooter";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const naviagte = useNavigate()
  
  const role = JSON.parse(sessionStorage.getItem("role"))
  const handleClick=()=>{
 if (role == "patient"){
  naviagte("/HomePage")
 }
 if (role == "business"){
  naviagte("/b/allorders")
 }
  } 
  return (
    <Helmet title="Privacy Policy">
      <Container fluid className="p-0">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" md="6">
            <div className="sticky-header">
              <div
                style={{
                  background: "#ECECEC",
                  padding: "20px",
                  marginBottom: "0",
                  width: "100%",
                }}
              >
                <img src={mainLogo} alt="mainLogo" className="logo-terms" onClick={handleClick} />
              </div>
              <div
                style={{
                  background: "#062F2D",
                  padding: "10px",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                <h3 className="termTxt">Privacy Policy</h3>
              </div>
            </div>
            {/* Terms && Condition */}

            <div className="mainText">
              <h2>Website Privacy Policy </h2>
              <p>
                At Adventist Health, we are committed to maintaining your
                privacy and delivering a website that provides you with quality,
                timely information about our organization. Please read our
                website privacy policy (the “Privacy Policy”) below to
                understand how information collected through our website is used
                and disclosed. To understand how your protected health
                information may be used or disclosed by us, we invite you to
                read the applicable Notice of Privacy Practices (the “Notice”).
                The Notice also describes your rights with regard to such
                information. If you have further questions about the Privacy
                Policy or the Notice, please contact our Corporate Privacy
                Officer at (916) 406-0000. Adventist Health is a faith-based
                not-for-profit system of health care providers which takes your
                privacy and security very seriously. While we are not subject to
                the California Consumer Privacy Act, we do have significant
                privacy and security protections that we have put in place for
                our patients and employees. These protections are designed
                utilizing the HIPAA privacy and security rules and privacy best
                practices to ensure your personal information is protected.
              </p>
              <br />
              <h2>Website Privacy Policy </h2>
              <p>
                Adventist Health is committed to maintaining the privacy of your
                personal information collected through this
                website, adventisthealth.org (the “Website”). This Privacy
                Policy discloses Adventist Health’s information collection and
                dissemination practices in connection with the Website and
                applies solely to the information that we collect through the
                Website. This Privacy Policy does not address personal
                information that you provide to us in other contexts
                (e.g., through a business or investment relationship not handled
                through the Website).
              </p>
              <br />
              <h2>Acceptance of Privacy Policy </h2>
              <p>
                By using the Website, you signify your acceptance of this
                Privacy Policy. If you do not agree to the terms of this Privacy
                Policy, please do not use this Website. Your continued use of
                the Website following the posting of changes to these terms will
                mean that you accept those changes.{" "}
              </p>
              <br />
              <h2>What This Privacy Policy Covers </h2>
              <p>
                This Privacy Policy covers how Adventist Health treats
                personally identifiable information (“PII”) that it collects and
                receives through this Website. PII is information about you that
                is personally identifiable (e.g., your name, address, e-mail
                address or phone number) and is not otherwise publicly
                available.{" "}
              </p>
              <br />
              <h4>How Personal Information Provided By You May Be Used </h4>
              <p>
                Except as described in this Privacy Policy, Adventist Health
                only collects your PII through this Website when you choose to
                provide such information, such as when you enter your e-mail
                address to use the “Contact Us” feature. Adventist Health may
                use your PII to:{" "}
                <ul>
                  <li>
                    Address your requests for information or services; or{" "}
                  </li>
                  <li>
                    Respond to your inquiries and send you administrative
                    communications{" "}
                  </li>
                </ul>
                Adventist Health will not sell, rent, license, or trade your PII
                to third parties for their own direct marketing use unless we
                receive your express consent to do so. Unless you give us
                permission to do so, Adventist Health will not share your PII
                other than as specified in this Privacy Policy.
              </p>
              <br />
              <h4>Disclosures to Third Parties Assisting In Our Operations </h4>
              <p>
                Adventist Health may share your PII under confidentiality
                agreements with other companies that work with, or on behalf of,
                Adventist Health, to provide products and services. These
                companies may use your PII to assist Adventist Health in its
                operations. These companies do not, however, have any
                independent right to share this information{" "}
              </p>
              <br />
              <h4>Third Party Marketing </h4>
              <p>
                Adventist Health may contract with third parties in order to
                provide you with content which you may be interested in. As a
                result, these third parties will observe your interests and
                navigation history across the web via the use of cookies and
                other tracking technologies. By making these observations of
                your browsing history, these third parties can offer you more
                relevant content which you may be interested in. This content
                includes content from the Adventist Health website, or other
                similarly related websites. Should you wish to opt-out of this
                kind of retargeting, you may visit the Network Advertising
                Initiative’s “opt-out” page available
                at https://optout.networkadvertising.org. In the alternative,
                you may set your browser to refuse third-party cookies. However,
                if you do not accept cookies on your browser, some of the
                features of the website may not work. Nor will cookie-based
                opt-outs (like the NAI opt-out just discussed) work.{" "}
              </p>
              <br />
              <h4>Disclosures Under Special Circumstances </h4>
              <p>
                We may disclose your PII to respond to subpoenas, court orders,
                legal process or governmental regulations, or to establish or
                exercise our legal rights or defend against legal claims. We may
                also disclose your PII if we believe it is necessary to share
                information in order to investigate, prevent or take action
                regarding illegal activities, suspected fraud, situations
                involving potential threats to the physical safety of any
                person, or as otherwise required by law.{" "}
              </p>
              <br />
              <h4>Business Transfers </h4>
              <p>
                We may share your PII with other business entities in connection
                with the sale, assignment, merger or other transfer of all or a
                portion of Adventist Health’s business to such business entity.
                We will require any such successor business entity to honor the
                terms of this Privacy Policy.{" "}
              </p>
              <br />
              <h2>
                Automatically Collected Information and Anonymous Information{" "}
              </h2>
              <p>
                Each time a visitor comes to the Website, Adventist Health
                collects some information to improve the overall quality of the
                visitor’s online experience.{" "}
              </p>
              <br />
              <h4>Aggregated Data </h4>
              <p>
                Adventist Health collects aggregate queries for internal
                reporting and also counts, tracks, and aggregates the visitor’s
                activity into Adventist Health’s analysis of general
                traffic-flow at the Website. Adventist Health may also remove
                personal identifiers from PII and maintain it in aggregate form
                that may later be combined with other information to generate
                anonymous, aggregated statistical information. Adventist Health
                may share, publicly or privately, anonymized or aggregated
                information from the Website. For example, we may match our user
                information, such as gender, age, and interests, with data of
                these third parties to help develop additional products and
                services to offer through our or the third parties’ websites. If
                Adventist Health shares aggregate information, it will do so in
                a manner that no individual can be identified.{" "}
              </p>
              <br />
              <h4>Web Server Logs and IP Addresses </h4>
              <p>
                AAn Internet Protocol (“IP”) address is a number that
                automatically identifies the computer or device you have used to
                access the Internet. The IP address enables our server to send
                you the web pages that you want to visit, and it may disclose
                the server owned by your Internet Service Provider. Adventist
                Health may use IP addresses to conduct website analyses and
                performance reviews and to administer the Website.{" "}
              </p>
              <br />
              <h4>Cookies and Web Beacons </h4>
              <p>
                Cookies are pieces of information that a website transfers to a
                user’s computer for purposes of storing information about a
                user’s preferences. Cookies in and of themselves do not
                personally identify users, although they do identify a user’s
                computer. Many websites use cookies as a standard practice to
                provide useful features when a user visits the website and most
                web browsers are set up to accept cookies. Adventist Health uses
                cookies to improve your online experience when visiting the
                Website. You can set your browser to refuse cookies, but some
                portions of the Website may not work properly if you refuse
                cookies. Some of the Website’s web pages may use web beacons in
                conjunction with cookies to compile aggregate statistics about
                website usage. A web beacon is an electronic image (also
                referred to as an “action tag,” “single-pixel,” or “clear GIF”)
                that is commonly used to track the traffic patterns of users
                from one web page to another in order to maximize web traffic
                flow and to otherwise analyze the effectiveness of websites.
                Some web beacons may be unusable if you elect to reject their
                associated cookies.{" "}
              </p>
              <br />
              <h2>Referrals/links </h2>
              <p>
                The Website may contain links to third-party websites that may
                offer information of interest. This Privacy Policy does not
                apply to those websites, and Adventist Health recommends
                reviewing those websites’ privacy policies individually.
                Adventist Health assumes no responsibility for any material
                outside of the Website, including any website that may be
                accessed through a link from the Website.{" "}
              </p>
              <br />
              <h2>Security </h2>
              <p>
                Adventist Health takes measures it believes are reasonably
                designed to protect the PII it receives from you from
                unauthorized access, use and alteration. We believe, however,
                that a persistent attacker with sufficient resources would be
                able to defeat our security measures. Therefore, we provide no
                guarantee that your PII will remain secure.{" "}
              </p>
              <br />
              <h2>Response to “Do Not Track” Signals </h2>
              <p>
                Some Internet browsers include the ability to transmit “Do Not
                Track” signals. Since uniform standards for “Do Not Track”
                signals have not yet been adopted, Adventist Health does not
                process or respond to “Do Not Track” signals.{" "}
              </p>
              <br />
              <h2>Children’s Privacy Protection </h2>
              <h4>Children’s Privacy Protection </h4>
              <p>
                Adventist Health understands the importance of protecting
                children’s privacy in the interactive online world. The Website
                is not designed for, or intentionally targeted at, children 13
                years of age or younger. It is not our policy to intentionally
                collect or maintain information about anyone under the age of
                13. No one under the age of 13 should submit any PII to
                Adventist Health and/or the Website, and if we learn that we
                have collected or received PII from a child under 13, we will
                delete that information. If your child has sent us personal
                information and you would like it removed, please send an e-mail
                to corpcomp@ah.org requesting removal.{" "}
              </p>
              <br />
              <h4>Under Age 18 </h4>
              <p>
                Minors under 18 years of age may request removal of any PII that
                they have provided to Adventist Health through this Website by
                sending an e-mail to corpcomp@ah.org requesting deletion. Please
                note that, while we make reasonable efforts to comply with such
                requests, deletion of your PII does not ensure complete and
                comprehensive removal of that data from all systems.{" "}
              </p>
              <br />
              <h2>California </h2>
              <p>
                California Civil Code Section 1798.83 permits users of our
                Website that are California residents to request certain
                information regarding our disclosure of PII to third parties for
                their direct marketing purposes. To make such a request, you may
                contact us by e-mail at corpcomp@ah.org.{" "}
              </p>
              <br />
              <h2>Changes </h2>
              <p>
                You may review and request changes to your PII that Adventist
                Health has collected, including the removal of your PII from
                Adventist Health’s databases in order to prevent receipt of
                future communications, using any of the following options: You
                can send your request via e-mail to: corpcomp@ah.org You can
                mail your request to the following postal address:{" "}
              </p>
              <br />
              <p>
                <b>Adventist Health</b>
              </p>
              <p>ATTN: Compliance Department</p>
              <p>ONE Adventist Health Way</p>
              <p>Roseville, CA 95661</p>
              <br />
              <p>
                This Privacy Policy may be revised from time to time as we add
                new features and services, as laws change, and as industry
                privacy and security best practices evolve. We display a version
                number and a date on the policy in the upper right corner of
                this Privacy Policy so that it will be easier for you to know
                when there has been a change. If we make any change to this
                Privacy Policy regarding use or disclosure of PII, we will
                provide advance notice on this Website. Small changes or changes
                that do not significantly affect individual privacy interests
                may be made at any time and without prior notice.{" "}
              </p>
              <br />
              <h2>Questions? </h2>
              <p>
                If you have any questions about this Privacy Policy or about
                Adventist Health’s handling of your information, please contact
                us and we will respond promptly.{" "}
              </p>
            </div>
            {/* <button>Accept</button> */}
          </Col>
        </Row>
      </Container>

      <AppFooter />
    </Helmet>
  );
};

export default PrivacyPage;
