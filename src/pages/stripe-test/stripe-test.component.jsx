import "./stripe-test.styles.scss"
import CheckoutForm from "../../components/checkout-form/checkout-form.component"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { IconSVG } from "../../components/icon-svg"

const promise = loadStripe(process.env.REACT_APP_stripe_public_key)

function StripeTest(props) {
  return (
    <>
      {/* <div>
        <button>Button for banter</button>
      </div> */}
      <div className="stripe-wrapper">
        <div className="stripe-title-wrapper">
          <div className="stripe-title">Top up your account</div>
          <div className="x-container" onClick={props.cancel}>
            <IconSVG name="close-circle" />
          </div>
        </div>
        <Elements stripe={promise}>
          <CheckoutForm currentUser={props.currentUser} />
        </Elements>
      </div>
    </>
  )
}

export default StripeTest
