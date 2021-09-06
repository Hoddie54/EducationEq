import { getPaymentIntent } from "../../utils/firebase/cloud"
import { useState, useEffect } from "react"
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"
import "./checkout-form.styles.scss"

export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")
  const [amount, setAmount] = useState()
  const stripe = useStripe()
  const elements = useElements()

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handleAmountChange = (event) => {
    if (event.target.value < 0) return
    setAmount(Math.round(event.target.value * 100) / 100)
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)
    console.log(props.email)

    const paymentIntent = await getPaymentIntent(amount * 100)
    setClientSecret(paymentIntent.data.client_secret)

    const payload = await stripe.confirmCardPayment(
      paymentIntent.data.client_secret,
      {
        receipt_email: props.currentUser.email,
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    )
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        value={amount}
        onChange={handleAmountChange}
        type="number"
        placeholder="Enter amount (£)"
        min={0}
        required={true}
      />
      <input type="text" placeholder="Cardholder name" />
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      {/* <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement /> */}
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
      <p className="refund-message">
        For withdrawing money and refunds contact us at
        amir@educationequation.co.uk
      </p>
    </form>
  )
}
