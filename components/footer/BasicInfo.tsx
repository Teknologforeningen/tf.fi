import React from 'react'
import Column from '../Column'

const BasicInfo = () => {
  return (
    <Column>
      <p className="text-l font-bold text-white">Kontakt</p>
      <Column className="items-center text-sm text-white">
        <p>Otsvängen 22 02150 Esbo</p>
        <p>Styrelsen: tfs@tf.fi</p>
        <p>Kansli: kansli@tf.fi</p>
      </Column>
      <p className="text-white">© {new Date().getFullYear()}</p>
    </Column>
  )
}

export default BasicInfo
