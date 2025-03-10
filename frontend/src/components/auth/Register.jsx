import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import MenuItems from '../layouts/MenuItems'
import { axiosRequest } from '../../helpers/config'
import { toast } from 'react-toastify'
import useValidation from '../custom/useValidation'
import Spinner from '../layouts/Spinner'
import { useSelector } from 'react-redux'

export default function Register() {
    const { isLoggedIn } = useSelector(state => state.user)
    const[user, setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    const[loading,setLoading] = useState(false)
    const[validationErrors,setValidationErrors] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    }, [isLoggedIn])

    const registerNewUser = async (e) => {
        e.preventDefault()
        setValidationErrors(null)
        setLoading(true)
        try {
            const response = await axiosRequest.post('user/register',user) 
            setLoading(false)
            toast.success(response.data.message)
            navigate('/login')
        } catch (error) {
            if(error?.response?.status === 422) {
                //display the validation errors
                setValidationErrors(error.response.data.errors)
            }
            console.log(error)
            setLoading(false)
        }
    } 

    return (
        <div 
            className="card main__card border border-dark 
                border-3 bg-white my-5 rounded-0 shadow">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row mt-5">
                            <div className="col-md-6 mx-auto">
                                <div className="card border border-dark border-2 shadow-sm">
                                    <div className="card-header border-dark border-2 bg-white text-center mt-2">
                                        <h5>
                                            Register
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => registerNewUser(e)} className="mt-3">
                                            <div className="mb-3">
                                                <input type="text" 
                                                    name="name" 
                                                    className="form-control p-2 border border-dark border-3 rounded-0"
                                                    value={user.name}
                                                    onChange={(e) => setUser({
                                                        ...user,name: e.target.value
                                                    })}
                                                    placeholder="Name*"
                                                />
                                                { useValidation(validationErrors,'name')}
                                            </div>
                                            <div className="mb-3">
                                                <input type="email" 
                                                    name="email" 
                                                    className="form-control p-2 border border-dark border-3 rounded-0"
                                                    value={user.email}
                                                    onChange={(e) => setUser({
                                                        ...user,email: e.target.value
                                                    })}
                                                    placeholder="Email*"
                                                />
                                                { useValidation(validationErrors,'email')}
                                            </div>
                                            <div className="mb-3">
                                                <input type="password" 
                                                    name="password" 
                                                    className="form-control p-2 border border-dark border-3 rounded-0"
                                                    value={user.password}
                                                    onChange={(e) => setUser({
                                                        ...user,password: e.target.value
                                                    })}
                                                    placeholder="Password*"
                                                />
                                                { useValidation(validationErrors,'password')}
                                            </div>
                                            {
                                                loading ?
                                                    <Spinner />
                                                :
                                                <button type="submit" className='btn btn-sm btn-dark'>
                                                    Submit
                                                </button>
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-white">
                <MenuItems />
            </div>
        </div>
    )
}
