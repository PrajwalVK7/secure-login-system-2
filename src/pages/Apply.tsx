import React, { useState } from 'react';
import Header from '../components/Header';
import { Col, Row, Form } from 'react-bootstrap';

interface FormData {
    title: string;
    description: string;
    file: File | null;
    days: string;
    dob: string;
    password: string;
    email: string;
    scheme: string;
    category: string;
}

function Apply() {
    const [eventData, setEventData] = useState<FormData>({
        title: "",
        description: "",
        file: null,
        days: "",
        dob: "",
        password: "",
        email: "",
        scheme: "",
        category: "",
    });
    const [isChecked, setIsChecked] = useState(false);

    console.log(eventData)

    console.log(isChecked)

    const handleSubmit = ()=>{
alert("zxdfghjk")
        const {title,description,file,days,dob,password,email,scheme,category}= eventData;

        if(isChecked){
            if(!title){
                alert("blah")
            }
            else{
                alert("Proceed")
            }
        }
        else{
            alert("Checkbox")
        }
    }
    return (
        <>
            <Header />
            <div>
                <div className="main container-fluid mt-5 container">
                    <Row>
                        <Col lg={12} sm={12} xs={12} md={12}>
                            <Form className='container mt-3 mb-5 p-3'  id='form-submit'>
                                <h2 className='text-center'>Submit Your Idea</h2>
                                <div>
                                    <div id='content '>
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter the title"
                                                    required
                                                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <textarea
                                                    className='form-control'
                                                    name="description"
                                                    id="formDescription"
                                                    required
                                                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                                                ></textarea>
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3" controlId="formFile">
                                                <Form.Label>Upload File</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept=".pdf, .doc, .docx"
                                                    required

                                                    onChange={(e) => {
                                                        const files = (e.target as HTMLInputElement).files;
                                                        setEventData({ ...eventData, file: files ? files[0] : null });
                                                    }}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div id='other' className='mt-3 mb-3'>
                                        <div>
                                            <Form.Group className="mb-3" controlId="formTime">
                                                <Form.Label>No of days required</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="No of days required to complete"
                                                    required
                                                    onChange={(e) => setEventData({ ...eventData, days: e.target.value })}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    required
                                                    onChange={(e) => setEventData({ ...eventData, dob: e.target.value })}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter Your Email"
                                                    required
                                                    onChange={(e) => setEventData({ ...eventData, email: e.target.value })}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3" controlId="formPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter Your Password"
                                                    required
                                                    onChange={(e) => setEventData({ ...eventData, password: e.target.value })}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3" controlId="formRadio">
                                                <Form.Label>Scheme</Form.Label>
                                                <div>
                                                    <Form.Check
                                                        type="radio"
                                                        label="A"
                                                        name="scheme"
                                                        value="A"
                                                        required
                                                        onChange={(e) => setEventData({ ...eventData, scheme: e.target.value })}
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="B"
                                                        name="scheme"
                                                        value="B"
                                                        required
                                                        onChange={(e) => setEventData({ ...eventData, scheme: e.target.value })}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3" controlId="formDropdown">
                                                <Form.Label>Select Category</Form.Label>
                                                <Form.Select
                                                    aria-label="Select option"
                                                    required
                                                    onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                                                >
                                                    <option value="">Choose...</option>
                                                    <option value="AB">AB</option>
                                                    <option value="BC">BC</option>
                                                    <option value="DE">DE</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>

                                        <div className="mb-5">
                                        <Form.Group className="mb-5" controlId="formCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                label="I agree to the terms and conditions"
                                                required
                                                onChange={(e)=>setIsChecked(e.target.checked)}
                                            />
                                        </Form.Group>
                                    </div>

                                        <div className='d-flex justify-content-center mb-5'>
                                            <button className='btn btn-warning me-5'>Reset</button>
                                            <button type='submit' className='btn btn-success me-5'onClick={handleSubmit}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Apply;
