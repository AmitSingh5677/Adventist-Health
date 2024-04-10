import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from 'reactstrap';
import "./HelpCenterModule.css";
import ToastMessage from '../toast/ToastMessage';
import SucessMessage from '../successToast/SuccessToast';

const reportOptions = [
    'Spam',
    'Pornography',
    'Hatred and Bullying',
    'Self-harm',
    'Violent, Gory, and harmful content',
    'Child Porn',
    'Illegal Activities (e.g. drug use)',
    'Deceptive Content',
    'Copyright and Trademark Infringement',
];

const HelpCenterModel = ({ isOpen, toggle }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [userDesc, setuserDesc] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [sucessToast, setSucessToast] = useState(false)
    const [isError, setIsError] = useState("");
    const [isSuccess, setIsSuccess] = useState("")


    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        console.log(`Selected option: ${option}`);
    };

    // report Handler function
    const reportHandler = async () => {
        try {
            // if (!selectedOption) {
            //     setShowToast(true);
            //     setIsError("Please select an option for Report");
            //     return;
            // }
            if (!selectedOption && !userDesc) {
                setShowToast(true);
                setIsError("Please select an option for Report");
                return;
            }

            const trimmedUserDesc = userDesc.trim();

            if (userDesc && trimmedUserDesc.length < 6) {
                setShowToast(true);
                setIsError("Please enter a valid description (at least 6 characters).");
                return;
            }
            if(trimmedUserDesc || selectedOption){
                
                const bussiness_id = JSON.parse(sessionStorage.getItem("bussiness_id"));
                const token = JSON.parse(sessionStorage.getItem("token"));
    
                const response = await fetch('/patients/report/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "business": bussiness_id,
                        "reason": selectedOption,
                        "description": userDesc,
                    }),
                });
    
                const data = await response.json();
                if (data) {
                    setSucessToast(true);
                    setIsSuccess("Your feedback has been successfully recorded.");
                    toggle(true)
                } else {
                    // Handle other cases
                    setShowToast(true);
                    setIsError("There was an issue recording your feedback.");
                }
                setuserDesc("")
                setSelectedOption("")
            } 
            }

        catch (error) {
            setShowToast(true);
            setIsError("Please try again later. Thank you for your patience.");
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} keyboard={false} backdrop="static" backdropClassName="modal-backdrop-dark">
                <ModalHeader toggle={toggle} style={{ height: "25px", position: "relative", top: "10px" }}>
                    <span style={{ fontSize: "18px" }}>Report</span>
                </ModalHeader>
                <hr />
                <ModalBody style={{ textAlign: "center" }} className='bodyText'>
                    <ul style={{ listStyleType: 'none', padding: 0, textAlign: "center" }}>
                        <li>Why are you reporting this ?</li>
                        <p style={{ fontSize: "11px" }}>Your report is anonymous, except if you’re reporting an intellectual property infringement.</p>
                    </ul>
                    <div>
                        {reportOptions.map((option, index) => (
                            <div key={index} onClick={() => handleOptionSelect(option)}
                                className={selectedOption === option ? 'selectedOption' : ''} >
                                {option}
                            </div>
                        ))}
                    </div>
                    <div>
                        <input placeholder='Others' className='othersInput' onChange={(e) => setuserDesc(e.target.value)} />
                    </div>
                    <Button className='confirmBtn' onClick={reportHandler}>
                        Confirm
                    </Button>
                </ModalBody>
            </Modal>
            {showToast ? <ToastMessage show={showToast} message={isError} onClose={() => setShowToast(false)} /> : <SucessMessage show={sucessToast} message={isSuccess} onClose={() => setSucessToast(false)} />}

        </div>
    );
};

export default HelpCenterModel;
