import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { axiosRequest } from '../../helpers/config'
import Spinner from '../layouts/Spinner'
import { setChosenPlan } from '../../redux/slices/userSlice'
import StripeSubscription from '../subscriptions/StripeSubscription'

export default function Plans() {
    const[plans, setPlans] = useState([])
    const[loading, setLoading] = useState(false)
    const {chosenPlan, isLoggedIn, user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const getPlans = async () => {
            setLoading(true)
            try {
                const response = await axiosRequest.get('plans',user) 
                setPlans(response.data.plans)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        } 
        if(!isLoggedIn) {
            navigate('/login')
        }else if(user?.number_of_hearts > 0) {
            navigate('/')
        }else {
            getPlans()
        }
    }, [])


    return (
        <div 
            className="card main__card border border-dark 
                border-3 bg-white my-5 rounded-0 shadow">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row my-5">
                            {
                                loading ?
                                    <Spinner />
                                :
                                plans?.map(plan => (
                                    <div className="col-md-4" key={plan.id}>
                                        <div className="card border border-dark border-2 bg-white shadow">
                                            <div className="card-header border-bottom 
                                                border-dark border-2 fw-bold text-center bg-white">
                                                    { plan.name }
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <span className="fw-bold">$</span>
                                                        <h1> {plan.price} </h1>
                                                        <span className="text-danger fw-bold mx-1">/</span>
                                                        Month
                                                    </div>
                                                    <div>
                                                        <span className="fw-bold">
                                                            { plan.number_of_hearts } <i className="text-danger bi bi-heart-fill"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer border-top border-dark border-2 bg-white text-center">
                                                <button className="btn btn-danger rounded-0"
                                                    onClick={() => dispatch(setChosenPlan(plan))}
                                                >
                                                    <i className="bi bi-check2-circle me-1"></i>
                                                    Choose a plan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    chosenPlan && <div className="row mt-3">
                        <div className="col-md-6 mx-auto">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <StripeSubscription />
                                </div>
                            </div>
                        </div>
                    </div>
                }
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
