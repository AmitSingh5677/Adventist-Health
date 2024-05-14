import React from "react";
import "./TermConditions.css";
import Helmet from "../../components/helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import mainLogo from "../../data/assests/logo/DmeCART.png";
import AppFooter from "../../components/footer/AppFooter";
import DmeCartLogo from "../../businessPages/data/assests/downloaded__imgs/DmeCART.png"
import { useNavigate } from "react-router-dom";
import AppHeader from "../../businessPages/components/AppHeader/AppHeader";
import AppHeader1 from "../../components/header/AppHeader";
import BackButton from "../../components/Button/BackButton";

const TermConditions = () => {
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
    <Helmet title="Terms and Conditions">
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
                <img src={DmeCartLogo} alt="mainLogo" className="logo-terms" onClick={handleClick}/>
              </div>
              <div
                style={{
                  background: "#062F2D",
                  padding: "10px",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
              {role == "business" && <AppHeader/> }  
              { role == "patient" && <AppHeader1/>}
                <h3 className="termTxt">Terms of use</h3>
              </div>
            </div>
            {/* Terms && Condition */}

            <div className="mainText">
              <h2>Website Terms of Use </h2>
              <p>
                These Terms of Use (the “Terms of Use” or the “Agreement”)
                describe the terms on which you may access and use
                www.adventisthealth.org (the “Website”), which is owned and
                operated by Adventist Health. By using this Website, you signify
                that you have read, understand and agree to be bound by this
                Agreement. Your continued use of this Website following the
                posting of any changes to the Terms of Use constitutes
                acceptance of those changes. In the event of any inconsistency
                between the Adventist Health Privacy Policy (the “Privacy
                Policy”) and this Agreement, this Agreement shall control.
              </p>
              <p>
                We may revise the Terms of Use from time to time by updating
                this posting, with the new terms taking effect on the date of
                posting. You should review these Terms of Use every time you use
                the Adventist Health website because they are binding on you.
              </p>
              <p>
                <b>
                  IF YOU DO NOT AGREE TO THE TERMS AND CONDITIONS SET FORTH
                  HERE, PLEASE DO NOT USE THIS WEBSITE
                </b>
              </p>
              <br />
              <h4>Notice of Waiver of Jury Trial and Class Actions </h4>
              <p>
                If you are a resident of the United States (including its
                possessions and territories), by accepting these Terms of Use,
                you are agreeing to the waiver of jury trial and class actions
                as set forth below to resolve any disputes with Adventist Health
                regarding the subject of these Terms of Use.
              </p>
              <br />
              <h4>Termination </h4>
              <p>
                Adventist Health reserves the right, in its sole discretion, to
                terminate your access to all or part of this Website, with or
                without notice. Examples of activity that may lead to a
                termination of your use of the Website include your breach of
                any of these Terms of Use.
              </p>
              <br />
              <h4>This Website Does Not Provide Medical Advice </h4>
              <p>
                Material on this Website is provided for general informational
                purposes only. Inclusion of information on this site does not
                imply any medical advice, recommendation or warranty.
                Information provided is not a substitute for the advice of an
                appropriate health professional. Always seek the advice of your
                physician or other qualified health provider regarding any
                medical condition. If you think you may have a medical
                emergency, call your doctor or 911 immediately. While all
                attempts will be made to keep this site current, information may
                become outdated over time or superseded by subsequent
                disclosure. This Website could also include technical or other
                inaccuracies or typographical errors. Adventist Health assumes
                no liability for accuracy, completeness or usefulness of the
                information contained on this Website. Changes may be
                periodically added to the information and these changes will be
                incorporated in new editions of this Website.
              </p>
              <br />
              <h4>Your Rights to Use the Website </h4>
              <p>
                Subject to your compliance with this Agreement, Adventist Health
                grants you a limited, personal, non-exclusive, revocable,
                non-assignable and non-transferable right and license to use the
                Website and any products, services, information, or other
                materials available on or through the Website, subject to the
                limitations described in the remainder of this section and
                elsewhere in this Agreement.
                <p>
                  The rights granted to you in the paragraph above and elsewhere
                  in this Agreement are subject to the following limitations:{" "}
                </p>
                <ul>
                  <li>
                    You agree to use the Website and any products, services,
                    information or other materials available on or through the
                    Website only for lawful, personal and informational
                    purposes. You agree that you will not use any resource made
                    available on the Website in any manner that is malicious or
                    that violates any applicable local, state, national or
                    international law, or the intellectual property or
                    proprietary rights of any third party;{" "}
                  </li>
                  <li>
                    You agree not to copy, reproduce, distribute, display
                    portions of, or link to the Website or any products,
                    services, information or other materials available on or
                    through the Website for commercial purposes without the
                    prior express written consent of Adventist Health;
                  </li>
                  <li>
                    You agree not to post on or transmit onto the Website any
                    information that you know to be untrue, that is unlawful,
                    fraudulent, threatening, malicious, harassing, abusive,
                    libelous, defamatory, obscene, or otherwise objectionable or
                    harmful, or that contains or links to a virus, bug, worm,
                    malware, Trojan horse or other harmful or disruptive
                    element;
                  </li>
                  <li>
                    You agree not to use any automated tool, such as a web
                    scraping tool, a bot or web robot or web automation, to mine
                    the Website or any products, services, information or other
                    materials available on or through the Website for
                    information or to fill out forms on the Website, that you
                    will not circumvent any technical measures implemented to
                    prevent or limit such access, and that you will comply with
                    the restrictions in any robot exclusion header; and
                  </li>
                  <li>
                    You will not circumvent or attempt to circumvent any
                    security or access control technology implemented on the
                    Website, or any servers, network or associated systems or
                    physical premises operated by or for the benefit of
                    Adventist Health.
                  </li>
                </ul>
                Adventist Health reserves the right to view, monitor and record
                activity on the Website without notice or permission. We may
                monitor use to optimize the site, understand what is of interest
                to visitors, and otherwise to enhance the operation of the site,
                assure its availability, and prevent misuse of the Website. Any
                information obtained by monitoring, reviewing or recording
                activity on the Website is subject to review by us or on our
                behalf as well as by law enforcement organizations in connection
                with investigation or prosecution of possible criminal activity
                on the Website. Adventist Health will comply with all court
                orders involving requests for such information.
              </p>

              <br />
              <h4>Proprietary Rights in Website Content </h4>
              <p>
                Adventist Health retains all copyright and other proprietary
                rights in the contents of this Website (the “Content”). Elements
                of this Website are protected by copyright, trade dress and
                other laws, and may not be copied or imitated in whole or in
                part. Nothing shall be construed as granting you any license
                under any patent, trademark or copyright of Adventist Health or
                any third party. Certain portions of this Website contain
                information supplied by third parties or include links to
                third-party sites. Adventist Health is not responsible for, and
                makes no warranty as to the accuracy of, such information or
                sites.
              </p>
              <p>
                You are not permitted to use the trademarks displayed on this
                Website without the prior written consent of Adventist Health or
                the third party that may own the trademarks. No Content may be
                modified, copied, distributed, framed, reproduced, republished,
                downloaded, displayed, transmitted or sold in any form or by any
                means, in whole or in part, without Adventist Health’s prior
                written permission. You may download or print a copy of any
                portion of the Content solely for your personal, noncommercial
                use, provided that you keep all copyright or other proprietary
                notices intact. You may not republish Content on any Internet,
                Intranet or Extranet website or incorporate the information in
                any other database or compilation. Any other use of the Content
                is strictly prohibited.
              </p>

              <br />
              <h4>Links to Other Websites </h4>
              <p>
                This Website may contain links to other websites. We are not
                responsible for the content, accuracy or opinions expressed in
                such websites, and such websites are not investigated, monitored
                or checked for accuracy or completeness by us. Inclusion of any
                linked website on or through this Website does not imply
                approval or endorsement of the linked website by us. If you
                decide to leave this Website and access these third party
                websites, you do so at your own risk.
              </p>

              <br />
              <h4>Limitation of Liability</h4>
              <p>
                Adventist Health, its affiliates and any of its, or their,
                directors, officers, employees, or agents shall not, under any
                circumstances, be liable for direct, consequential, incidental,
                indirect or special damages of any kind, or any other damages
                whatsoever, including those resulting from loss of use, data or
                profits, and whether resulting from the use or inability of use
                of any contents of this Website (or a website linked to this
                Website), or any other cause and even if caused by negligence or
                if we have been apprised of the likelihood of such damages
                occurring.
              </p>
              <p>
                The above limitation, or exclusion, may not apply to you to the
                extent that applicable law prohibits the limitation or exclusion
                of liability for incidental or consequential damages. Adventist
                Health’s total liability to you here under shall not, in any
                event, exceed your online charges for accessing this Website.
              </p>

              <br />
              <h4>Disclaimer of Warranties </h4>
              <p>
                YOU UNDERSTAND AND AGREE THAT THIS WEBSITE IS PROVIDED ON AN “AS
                IS” AND “AS AVAILABLE” BASIS AND THAT ADVENTIST HEALTH DOES NOT
                ASSUME ANY RESPONSIBILITY FOR PROMPT AND PROPER DELIVERY OR
                RETENTION OF ANY PERSONAL INFORMATION. ADVENTIST HEALTH
                EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS
                OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. ADVENTIST
                HEALTH MAKES NO WARRANTY THAT (1) THE WEBSITE WILL MEET YOUR
                REQUIREMENTS; (2) THE WEBSITE WILL BE UNINTERRUPTED, TIMELY,
                SECURE OR ERROR-FREE; (3) THE QUALITY OF ANY INFORMATION OR
                OTHER MATERIAL OBTAINED BY YOU THROUGH THE WEBSITE WILL MEET
                YOUR EXPECTATIONS; AND (4) ANY ERRORS IN THE SOFTWARE WILL BE
                CORRECTED.
              </p>
              <p>
                ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF
                THE WEBSITE IS DONE AT YOUR OWN DISCRETION AND RISK AND YOU WILL
                BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR
                LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH
                MATERIAL.
              </p>
              <p>
                NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY
                YOU FROM ADVENTIST HEALTH OR THROUGH OR FROM THE WEBSITE SHALL
                CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS OF USE.
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN
                WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR
                INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE
                ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
              </p>

              <br />
              <h4>Waiver of Jury Trial and Class Actions </h4>
              <p>
                BY ENTERING INTO THESE TERMS OF USE, YOU AND ADVENTIST HEALTH
                ACKNOWLEDGE AND AGREE TO WAIVE CERTAIN RIGHTS TO LITIGATE
                DISPUTES IN COURT, TO RECEIVE A JURY TRIAL OR TO PARTICIPATE AS
                A PLAINTIFF OR AS A CLASS MEMBER IN ANY CLAIM ON A CLASS OR
                CONSOLIDATED BASIS OR IN A REPRESENTATIVE CAPACITY. YOU AND
                ADVENTIST HEALTH BOTH AGREE TO RESOLVE ANY DISPUTES REGARDING
                THE SUBJECT OF THESE TERMS OF USE IN ARBITRATION AND THAT ANY
                ARBITRATION WILL BE CONDUCTED ON AN INDIVIDUAL BASIS AND NOT A
                CONSOLIDATED, CLASS-WIDE OR REPRESENTATIVE BASIS AND THE
                ARBITRATOR SHALL HAVE NO AUTHORITY TO PROCEED WITH AN
                ARBITRATION ON A CLASS OR REPRESENTATIVE BASIS. THE ARBITRATOR
                MAY AWARD INJUNCTIVE RELIEF ONLY IN FAVOR OF THE INDIVIDUAL
                PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE
                RELIEF WARRANTED BY THAT PARTY’S INDIVIDUAL CLAIM. IF FOR ANY
                REASON THE ARBITRATION CLAUSE SET FORTH IN THESE TERMS OF USE IS
                DEEMED INAPPLICABLE OR INVALID, OR TO THE EXTENT THE ARBITRATION
                CLAUSE ALLOWS FOR LITIGATION OF DISPUTES IN COURT, YOU AND
                ADVENTIST HEALTH BOTH WAIVE, TO THE FULLEST EXTENT ALLOWED BY
                LAW, ANY RIGHT TO PURSUE OR TO PARTICIPATE AS A PLAINTIFF OR AS
                A CLASS MEMBER IN ANY CLAIM ON A CLASS OR CONSOLIDATED BASIS OR
                IN A REPRESENTATIVE CAPACITY.
              </p>

              <br />
              <h4>Indemnification </h4>
              <p>
                By accepting these Terms of Use, you agree to indemnify and
                otherwise hold harmless Adventist Health and its officers,
                employees, agents, subsidiaries, affiliates, licensors,
                suppliers and other partners from any direct, indirect,
                incidental, special, consequential or exemplary damages
                resulting from your use of this Website. Without limitation of
                the terms and conditions set forth in our Privacy Policy, you
                understand and agree that Adventist Health may disclose
                personally identifiable information if required to do so by law
                or in the good faith belief that such disclosure is reasonably
                necessary to comply with legal process, enforce this Agreement,
                or protect the rights, property, or safety of Adventist Health
                and the public.
              </p>

              <br />
              <h4>Jurisdiction </h4>
              <p>
                This Website (excluding linked sites) is controlled by Adventist
                Health from its offices in the State of California in the United
                States. By accessing this Website, you and Adventist Health
                agree that all matters relating to your access to, or use of,
                this Website shall be governed by the statutes and laws of the
                State of California, without regard to its conflicts of laws
                principles. If for any reason a claim proceeds in court rather
                than in arbitration, you and Adventist Health also agree and
                submit to the exclusive personal jurisdiction and venue of the
                courts of the State of California with respect to such matters.
                Adventist Health makes no representation that materials on this
                Website are appropriate or available for use in other locations,
                and accessing them from territories where their contents are
                illegal is prohibited. Those who choose to access this site from
                other locations do so on their own initiative and are
                responsible for compliance with local laws.
              </p>
              <br />
              <h4>Notices </h4>
              <p>
                Adventist Health may deliver notice to you under these Terms of
                Use by means of e-mail, a general notice posted on this Website,
                or by written communication delivered by first class U.S. mail
                to the address that you have provided to Adventist Health. You
                may give notice to, or submit comments or questions to,
                Adventist Health at any time online or by letter delivered by
                first-class postage prepaid U.S. mail or overnight courier to
                the following address:
              </p>
              <p>
                <b>Adventist Health </b>
              </p>
              <p>ATTN: Compliance Department </p>
              <p> ONE Adventist Health Way </p>
              <p> Roseville, CA 9566 </p>

              <br />
              <h4>Survival </h4>
              <p>
                The provisions of these Terms of Use entitled “Limitation of
                Liability,” “Disclaimer of Warranties,” “Indemnification,”
                “Jurisdiction” and “General Provisions” will survive the
                termination of this Agreement.
              </p>
              <br />
              <h4>General Provisions </h4>
              <p>
                Except as provided in a particular “Legal Notice” on this
                website, these Terms of Use, along with the Privacy Policy,
                constitute the entire agreement and understanding between you
                and Adventist Health with respect to use of this Website,
                superseding all prior or contemporaneous communications with
                Adventist Health. These Terms of Use are severable, and in the
                event any provision is determined to be invalid or
                unenforceable, such invalidity or unenforceability shall not in
                any way affect the validity or enforceability of the remaining
                provisions. A printed version of these Terms of Use shall be
                admissible in judicial or administrative proceedings based upon
                or relating to use of the Website to the same extent and subject
                to the same conditions as other business documents and records
                originally generated and maintained in printed form. The section
                titles of this Agreement are displayed for convenience only and
                have no legal effect. Nothing in this Agreement shall be deemed
                to confer any third-party rights or benefits.
              </p>
              <br />
              <h4>Google Translate Disclaimer </h4>
              <p>
                The official language used for the content of the Adventist
                Health website is English. Using Google Translate, you can
                obtain a free, automated translation of our web pages.
              </p>
              <p>
                Because Google Translate is a third-party service provided by
                Google through its website, Adventist Health does not control or
                guarantee the quality or accuracy of the translated content.
                Automated translations rely on data and technology, and are only
                an approximation of the original content from our website. The
                automated translation you obtain from Google Translate may
                contain errors, including incorrect or inappropriate language.
                In addition, some applications, files, or items cannot be
                translated, including graphs, photos, and PDF files.
              </p>
              <p>
                If you use Google Translate to obtain an automated translation,
                you do so at your own risk. Adventist Health disclaims all
                liability for any loss, damage, or other problem arising from or
                in connection with any use of the Google Translate service
                provided by Google. By using Google Translate, you understand
                and agree to this disclaimer. If there are any questions
                regarding the accuracy of the information presented within an
                automated translation obtained from Google Translate, please
                refer back to our official English-language website.
              </p>
              <div>
     { role &&
     <BackButton width={"150px"}/>
     }  
     </div>
            </div>
            {/* <button>Accept</button> */}
          </Col>
        </Row>
     
      </Container>

      <AppFooter />
    </Helmet>
  );
};

export default TermConditions;
