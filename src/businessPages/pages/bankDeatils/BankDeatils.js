

import React from 'react';
import "./BankDeatils.css"
import Helmet from '../../components/helmet/Helmet'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import LeftSection from '../../components/leftSidePannel/LeftSideSection'

const BankDeatils = () => {
    return (
        <Helmet title="Bank Account Details">
            <Row>
                <LeftSection />

                <Col lg="5" md="6" className="d-flex align-items-center justify-content-center">
                    <div style={{ maxWidth: "90%", margin: "0 auto" }}>
                        <h6 className='bankDeatils__HeadingTxt'>Bank Account Details </h6>
                        <Form>
                            <Row>
                                <Col md={10}>
                                    <FormGroup>
                                        <Input
                                            className="form-control shadow-none"
                                            id="exampletext"
                                            name="text"
                                            placeholder="Bank Name"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={10}>
                                    <FormGroup>
                                        <Input
                                            className="form-control shadow-none"
                                            id="exampletext"
                                            name="text"
                                            placeholder="Account Name"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={10}>
                                    <FormGroup>
                                        <Input
                                            className="form-control shadow-none"
                                            id="exampletext"
                                            name="text"
                                            placeholder="Account Number"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                        <Input
                                            className="form-control shadow-none"
                                            id="exampletext"
                                            name="text"
                                            placeholder="Routing Number"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                        <Input
                                            className="form-control shadow-none"
                                            id="exampletext"
                                            name="text"
                                            placeholder="IBAN"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={10}>
                                    <FormGroup>
                                        <Input
                                            className="form-control shadow-none"
                                            id="exampletext"
                                            name="text"
                                            placeholder="SWIFT"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                        <div>
                            <button className='bankDeatils__btn'>Save</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Helmet>
    )
}

export default BankDeatils