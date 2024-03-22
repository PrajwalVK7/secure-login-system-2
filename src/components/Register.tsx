import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUserAPI } from '../services/allAPI';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterData {
    name:String;
    address:String;
    gender:String;
    username:String;
    password:String

}
function Register() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState<RegisterData>({
        name: "",
        address: "",
        gender: "",
        username: "",
        password: ""
    });

    const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name,address,gender,username,password} = formData;

        if(!name||!address||!gender||!username ||!password){
            alert("Please fill the form completely")
        }
        else{
            const result:any =  await registerUserAPI(formData);
            console.log(result)

            if(result.status===200){
                alert(result.data)
                navigate('/')

            }
            else{
                if(result.response.data.errors&&result.response.data.errors.length>0){
                    console.log(result.response.data)
                    const errors = result.response.data.errors.map((error: any) => error.msg).join('\n\n');
                        alert(errors);
                }
                else{
                    alert(result.response.data)
                }
                
            }
        }
    }
    

    return (
        <div className='  login-root d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className='container' style={{  width: '30rem' }}  >
            <h1 className='text-center text-white'>Signu up</h1>

            <Form className="p-3 rounded container" onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e)=>setFormData({...formData,name:e.target.value})} type="text" placeholder="Enter Your Full Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={(e)=>setFormData({...formData,address:e.target.value})}  type="text" placeholder="Enter Your Address" />
                    </Form.Group>
                    <Form.Select onChange={(e)=>setFormData({...formData,gender:e.target.value})} className="mb-3" aria-label="Default select example">
                        <option>Gender</option>
                        <option  value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Select>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={(e)=>setFormData({...formData,username:e.target.value})}  type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>setFormData({...formData,password:e.target.value})}  type="password" placeholder="Password" />
                    </Form.Group>

                    <div className='d-flex justify-content-evenly '>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>

                    <div>
                        <p>Already have account? <span className='text-primary'><Link to={'/'}><a >Login now</a></Link></span></p>
                    </div>
                    </div>
                </Form>
            </div>


        </div>)
}

export default Register