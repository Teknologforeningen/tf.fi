import React from 'react'
import Column from '../Column'

const BasicInfo = () => (
  <Column className="text-white">
    <p className="text-l font-bold">Kontakt</p>
    <Column className="items-center text-sm">
      <p>Otsvängen 22 02150 Esbo</p>
      <p>Styrelsen: tfs@tf.fi</p>
      <p>Kansli: kansli@tf.fi</p>
    </Column>
    <p>&#169; {new Date().getFullYear()}</p>
  </Column>
)

export default BasicInfo
