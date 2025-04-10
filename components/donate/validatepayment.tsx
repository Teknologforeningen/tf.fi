import React from "react"
import { CheckoutHeaders } from "./donate"
import styles from "./validatepayment.module.css"

const ValidatePayment: React.FC<{
  checkoutHeaders: CheckoutHeaders
}> = () => {
  return (
    <div className={styles.container}>
      <h2>Tack för ditt stöd!</h2>
      <p>Donationen har mottagits.</p>
    </div>
  )
}

export default ValidatePayment
