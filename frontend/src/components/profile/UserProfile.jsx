import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { axiosRequest, getConfig } from '../../helpers/config'
import { setCurrentUser } from '../../redux/slices/userSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router'

export default function UserProfile() {
    const { user, isLoggedIn, token } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(!isLoggedIn) navigate('/login')
    }, [isLoggedIn])

    //unsubscribe the user from a plan
    const unsubscribe = async (stripe_subscription_id) => {
        try {
            const response = await axiosRequest.post('cancel', {
                stripe_subscription_id
            },getConfig(token))
            if(response.data.error) {
                toast.error(response.data.error)
            }else {
                dispatch(setCurrentUser(response.data.user))
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div 
            className="card main__card border border-dark 
                border-3 bg-white my-5 rounded-0 shadow">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item border border-2 border-dark
                                text-center mb-2">
                                <i className="bi bi-person"></i> { user?.name }
                            </li>
                            <li className="list-group-item border border-2 border-dark
                                text-center mb-2">
                                <i className="bi bi-envelope"></i> { user?.email }
                            </li>
                            <li className="list-group-item border border-2 border-dark
                                text-center mb-2">
                                <i className="bi bi-heart-fill"></i> { user?.number_of_hearts }
                            </li>
                        </ul>
                    </div>
                    {
                        user?.subscriptions?.length > 0 && 
                            <div className="col-md-6 d-flex justify-content-between align-items-center">
                                <h5>
                                    You are subscribed to {" "}
                                    {
                                        user?.subscriptions?.length > 1 ? 'plans' : 'plan'
                                    }
                                </h5>
                                <div className="d-flex flex-column">
                                    {
                                        user.subscriptions.map(subscription => (
                                            <div key={subscription.id}>
                                                <span className="badge bg-dark p-2 mx-2 mb-2">
                                                    { subscription.plan.name }
                                                </span>
                                                <button 
                                                    onClick={() => unsubscribe(subscription.stripe_subscription_id)}
                                                    className="btn btn-danger rounded-0 me-1 mb-1">
                                                    <i className="bi bi-x-circle"></i> Unsubscribe
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="card-footer bg-white">
                <div className="row">
                    <div className="col-md-1 mx-auto">
                        <Link to="/" className="btn btn-white border border-dark 
                            border-2 rounded-0 shadow-sm d-flex flex-column align-items-center">
                                <span className="fw-bold">Home</span>
                                <i className="bi bi-house-door"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
