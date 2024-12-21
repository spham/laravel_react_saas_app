import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { axiosRequest, getConfig } from '../../helpers/config'
import { setChosenPlan } from '../../redux/slices/userSlice'
import { toast } from 'react-toastify'

const SubscriptionForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token, chosenPlan } = useSelector(state => state.user)
    
    //handle subscription
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) return

        setError(null)
        setLoading(true)
        
        const cardElement = elements.getElement(CardElement)

        // Create a PaymentMethod with the CardElement
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        })

        if (paymentMethodError) {
            setError(paymentMethodError.message)
            setLoading(false)
            return
        }

        //send request here
        try {
            const response = await axiosRequest.post('subscribe', {
                plan_id: chosenPlan.id,
                payment_method: paymentMethod.id,
                price_id: chosenPlan.price_id,
            },getConfig(token))

            dispatch(setChosenPlan(null))
            setLoading(false)
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <div className='text-danger my-2'> {error} </div>}
            <button className="btn btn-sm btn-dark mt-4" type="submit" disabled={loading || !stripe}>Subscribe</button>
        </form>
    )
}

export default SubscriptionForm