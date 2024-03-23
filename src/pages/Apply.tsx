import React, { useState } from 'react';
import Header from '../components/Header';
import { Col, Row, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ReCAPTCHA from "react-google-recaptcha";
import { recaptchaAPI } from '../services/recaptchaAPI';
import { registerEvent } from '../services/allAPI';
import Swal from 'sweetalert2';

interface FormData {
    title: string;
    description: string;
    file: File | null;
    days: number;
    dob: string;
    password: string;
    email: string;
    scheme: string;
    category: string;
}
interface Error {
    emailError: string;
    daysError: String;
    dobError: String;
    generalError: String;
}

function Apply() {
    const [eventData, setEventData] = useState<FormData>({
        title: "",
        description: "",
        file: null,
        days: 1,
        dob: "",
        password: "",
        email: "",
        scheme: "",
        category: "",
    });
    const [isChecked, setIsChecked] = useState(false);
    const [iscaptchaVerified, setIsCaptchaVerified] = useState(false)

    console.log(eventData)

    console.log(isChecked)
    const [inputError, setInputError] = useState<Error>({
        emailError: "",
        daysError: "",
        dobError: "",
        generalError: ""
    })
    const formatDate = (dateString: string): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setEventData({ ...eventData, [name]: value });

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                setInputError({ ...inputError, emailError: "Invalid email address" })
                // console.log(inputError.emailError)
            }
            else {
                setInputError({ ...inputError, emailError: "" })

            }
        }
        if (value === "dob") {
            const dobRegex = /^(19[0-9]{2}|200[0-5])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
            if (!dobRegex.test(value)) {
                setInputError({ ...inputError, dobError: "Invalid date, only age above 19,are eligible" });
            } else {
                setInputError({ ...inputError, dobError: "" });
            }
        }
        if (name === "days") {
            const daysValue = parseInt(value);

            if (isNaN(daysValue) || daysValue < 1 || daysValue > 10) {
                setInputError({ ...inputError, daysError: "Invalid, Number of days must be between 1 and 10" });
            } else {
                setInputError({ ...inputError, daysError: "" });
            }
        }


        console.log(inputError)


    };

    const onChange = (value: any | null) => {
        if (value) {
            setIsCaptchaVerified(true)
        }
        else {
            setIsCaptchaVerified(false)
        }
    }
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { title, description, file, days, dob, password, email, scheme, category } = eventData;

        if (!title || !description || !file || !days || !dob || !password || !email || !scheme || !category) {
            alert("Please Fill the form completely")
        } else {
            if (!isChecked) {
                alert("Please agree terms and conditions")
            } else {
                if (iscaptchaVerified) {
                    const reqBody = new FormData();
                    reqBody.append("title", title);
                    reqBody.append("description", description);
                    reqBody.append("file", file);
                    reqBody.append("days", days.toString());
                    reqBody.append("dob", dob);
                    reqBody.append("password", password);
                    reqBody.append("email",email);
                    reqBody.append("scheme",scheme);
                    reqBody.append("category",category);

                    const token = sessionStorage.getItem("token");
                    const reqHeader = {
                        "Content-Type": "multipart/form-data",
                        "Authorization":`Bearer ${token}`
                    }
                        const result:any = await registerEvent(reqBody,reqHeader);
                        console.log(result)
                        if(result.status===200){
                            Swal.fire({
                                icon: "success",
                                title: "hey hey",
                                text: "Content submitted",
                              });    
                                              
                            } 
                                               
                        else{
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: result.response.data,
                              });    
                                              
                            }





                }
                else{
                    alert("Please, follow the reCaptch")
                }
            }
        }

    };
const resetForm = ()=>{
    setEventData({
        title:"",
        description:"",
        password:"",
        days:1,
        dob:"",
        scheme:"",
        category:"",
        email:"",
        file:null,

    })
    
}


    return (
        <>
            <Header />
            <div>
                <div className="main container-fluid mt-5 container">
                    <Row>
                        <Col lg={12} sm={12} xs={12} md={12}>
                            <Form className='container mt-3 mb-5 p-3 rounded shadow' id='form-submit' onSubmit={handleSubmit}>
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
                                                    name='title'
                                                    value={eventData.title}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3">
                                                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder="description"
                                                        style={{ height: '100px' }}
                                                        name='description'
                                                        value={eventData.description}
                                                        onChange={handleChange}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3" controlId="formFile">
                                                <Form.Label>Upload File (only pdf,doc,docx) are allowed</Form.Label>
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
                                                    name='days'
                                                    value={eventData.days}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                            {inputError && inputError.daysError && (
                                                <span className='text-danger'>error: {inputError.daysError}</span>
                                            )}
                                        </div>
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    required
                                                    name='dob'
                                                    value={eventData.dob}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            {inputError && inputError.dobError && (
                                                <span className='text-danger'>error: {inputError.dobError}</span>
                                            )}
                                        </div>

                                        <div>
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter Your Email"
                                                    required
                                                    name='email'
                                                    value={eventData.email}
                                                    onChange={handleChange} />
                                                {inputError && inputError.emailError && (
                                                    <span className='text-danger'>error: {inputError.emailError}</span>
                                                )}                                            </Form.Group>
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
                                                        onChange={handleChange} />
                                                    <Form.Check
                                                        type="radio"
                                                        label="B"
                                                        name="scheme"
                                                        value="B"
                                                        required
                                                        onChange={handleChange} />
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
                                        <div>
                                            <Form.Group className="mb-3" controlId="formPassword">
                                                <Form.Label>Enter Yor Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter Your Password "
                                                    required
                                                    name='password'
                                                    value={eventData.password}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                        </div>
                                        <div className="mb-5">
                                            <Form.Group className="mb-5" controlId="formCheckbox">
                                                <Form.Check
                                                    type="checkbox"
                                                    label="I agree to the terms and conditions"
                                                    required
                                                    onChange={(e) => setIsChecked(e.target.checked)}
                                                />
                                            </Form.Group>
                                        </div>
                                        <ReCAPTCHA
                                            sitekey={recaptchaAPI}
                                            onChange={onChange}
                                        />,
                                        <div className='d-flex justify-content-center mb-5'>
                                            <button className='btn btn-warning me-5' onClick={resetForm}>Reset</button>
                                            <button type='submit' className='btn btn-success me-5' >Submit</button>
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
