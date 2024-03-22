import React from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import { Form } from 'react-router-dom'

function Apply() {
  return (
    <>
    <Header/>
    <div>
        <div className="main container-fluid mt-5 p-2 ">
            <Row>
                <Col lg={12} sm={12} xs={12} md={12}>
                    <Form>
                        <h2>Submit Your, Idea</h2>
                    </Form>
                </Col>

            </Row>
        </div>
    </div>
    </>
  )
}

export default Apply