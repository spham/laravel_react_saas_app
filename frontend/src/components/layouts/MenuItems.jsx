import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { axiosRequest, getConfig } from '../../helpers/config'
import { setMessage, setWordDetails } from '../../redux/slices/wordDetailsSlice'
import { setCurrentUser, setToken, setLoggedInOut, decrementUserHearts } from '../../redux/slices/userSlice'
import { toast } from 'react-toastify'

export default function MenuItems() {
    const { user, isLoggedIn, token} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        //get the currently logged in user function
        const getLoggedInUser = async () => {
            try {
                const response = await axiosRequest.get('user',getConfig(token)) 
                dispatch(setCurrentUser(response.data.user))
            } catch (error) {
                if(error?.response?.status === 401) {
                    dispatch(setCurrentUser(null))
                    dispatch(setToken(''))
                    dispatch(setLoggedInOut(false))
                }
                console.log(error)
            }
        } 
        if(token) getLoggedInUser()
    },[token])

    //logout function
    const logoutUser = async () => {
        try {
            const response = await axiosRequest.post('user/logout',null,getConfig(token)) 
            dispatch(setCurrentUser(null))
            dispatch(setToken(''))
            dispatch(setLoggedInOut(false))
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    } 

    //generate a random word
    const generateRandomWord = async () => {
        dispatch(setMessage(''))
        try {
            const response = await axiosRequest.get('random/word') 
            dispatch(setWordDetails(response.data.data))
            dispatch(decrementUserHearts(token))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Link to="/" className="btn btn-white border border-dark 
                border-2 rounded-0 shadow-sm d-flex flex-column align-items-center">
                    <span className="fw-bold">Home</span>
                    <i className="bi bi-house-door"></i>
            </Link>
            {
                isLoggedIn ?
                <>
                    <Link to="/profile" className="btn btn-white border border-dark 
                        border-2 rounded-0 shadow-sm d-flex flex-column align-items-center ms-1">
                            <span className="fw-bold">
                                { user?.name }
                            </span>
                            <i className="bi bi-person"></i>
                    </Link>
                    <button  
                        onClick={() => logoutUser()}
                        className="btn btn-white border border-dark 
                        border-2 rounded-0 shadow-sm d-flex flex-column align-items-center ms-1">
                            <span className="fw-bold">Logout</span>
                            <i className="bi bi-person-fill-down"></i>
                    </button>
                </>
                :
                <>
                    <Link to="/register" className="btn btn-white border border-dark 
                        border-2 rounded-0 shadow-sm d-flex flex-column align-items-center ms-1">
                            <span className="fw-bold">Register</span>
                            <i className="bi bi-person-add"></i>
                    </Link>
                    <Link to="/login" className="btn btn-white border border-dark 
                        border-2 rounded-0 shadow-sm d-flex flex-column align-items-center ms-1">
                            <span className="fw-bold">Login</span>
                            <i className="bi bi-person-fill-up"></i>
                    </Link>
                </>
            }
            <Link to="/browse/words" className="btn btn-white border border-dark 
                border-2 rounded-0 shadow-sm d-flex flex-column align-items-center ms-1">
                    <span className="fw-bold">Browse</span>
                    <i className="bi bi-binoculars-fill"></i>
            </Link>
            <button className="btn btn-white border border-dark 
                border-2 rounded-0 shadow-sm d-flex flex-column align-items-center ms-1"
                onClick={() => generateRandomWord()}    
                disabled={!isLoggedIn || isLoggedIn && user?.number_of_hearts === 0}
            >
                    <span className="fw-bold">Random</span>
                    <i className="bi bi-shuffle"></i>
            </button>
        </div>
    )
}
