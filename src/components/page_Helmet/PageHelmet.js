
import React from 'react'
import { Container, Row } from 'reactstrap'

const PageHelmet = ({pageTitle}) => {
    return (
        <div style={{ marginTop: "10%" }}>
            <div>
                <section>
                    <Container>
                        <Row xs="12" sm="12" lg="12">
                            <div>
                                <h3 className='page__title'>{pageTitle}</h3>
                            </div>
                        </Row>
                    </Container>
                </section>
            </div>
        </div>

    )
}

export default PageHelmet