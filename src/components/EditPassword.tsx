import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editPasswordAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';


interface editData {
    oldPassword: String;
    newPassword: String;
    password: String;

}
function EditPassword() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState<editData>({
        oldPassword: "",
        newPassword: "",
        password: ""
    })


    const handleUpdate = async () => {

        const { oldPassword, newPassword, password } = formData;

        if (!oldPassword || !newPassword || !password) {
            alert("Please add complete details")
        } else {
            if (newPassword === password) {
                const token = sessionStorage.getItem("token")
                const reqBody = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result: any = await editPasswordAPI(formData, reqBody)
                if (result.status === 200) {
                    alert("Password updated, Please Login Again")
                    sessionStorage.removeItem("token");
                    navigate('/')
                }
            }
            else {
                alert("Please confirm the new password")
            }
        }

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Password
            </Button>

            <div className='mt-3'>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mt-5 container'>
                            <form action="" className='p-3 rounded container  '>
                                <div className='mb-3 '>
                                    <label htmlFor="oldpwd" >Old Password</label>
                                    <input onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })} className='form-control ' id='oldpwd' placeholder='Enter your old password' />
                                </div>
                                <div className='mb-3 '>
                                    <label htmlFor="newpwd" >New Password</label>
                                    <input type='password' onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} className='form-control ' id='newpwd' placeholder='Enter your new password' />
                                </div>
                                <div className='mb-3 '>
                                    <label htmlFor="cnewpwd" >Confirm new password</label>
                                    <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type='password' className='form-control ' id='cnewpwd' placeholder='Enter New password again' />
                                </div>
                                <button className='btn btn-success' type='button' onClick={handleUpdate}>Update Password</button>
                            </form>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </>
    )
}

export default EditPassword