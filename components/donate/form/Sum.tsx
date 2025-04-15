'use client'

import classNames from 'classnames'
import TextInput from './TextInput'
import React, { ChangeEventHandler, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const Line = ({ value, threshold }: { value: number; threshold: number }) => {
  const backgroundColor = threshold < value ? '#b20738' : '#222'
  return <motion.span className="flex-1 h-1" initial={{ backgroundColor: '#222' }} animate={{ backgroundColor }} />
}

const Button = ({
  value,
  setValue,
  threshold,
  text,
}: {
  value: number
  setValue: (n: string) => void
  threshold: number
  text: string
}) => {
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setValue(threshold.toString())
  }

  return (
    <button
      onClick={onClick}
      className={classNames('w-12 h-12 rounded-full text-white bg-darkgray hover:bg-teknologröd transition-colors', {
        'bg-teknologröd': threshold <= value,
      })}
    >
      {text}
    </button>
  )
}

const DonationLevel = ({ value, setValue }: { value: number; setValue: (n: string) => void }) => (
  <div className="flex items-center pt-6">
    <Line value={value} threshold={0} />
    <Button value={value} setValue={setValue} threshold={1000} text="1k" />
    <Line value={value} threshold={1000} />
    <Button value={value} setValue={setValue} threshold={5000} text="5k" />
    <Line value={value} threshold={5000} />
    <Button value={value} setValue={setValue} threshold={10000} text="10k" />
    <Line value={value} threshold={10000} />
  </div>
)

function donationLevelText(value: number): string {
  if (value < 1000) {
    return 'En plats i det nya nationshuset väntar dig med och uppdateringar från nationen. Alla som gjort en kontribution till det nya nationshuset bjuds in för öppningsceremonierna. Ett donationsmärke tillges alla som bidragit med över ett studiestöd (268,23€).'
  } else if (value < 5000) {
    return 'Du får en personlig plakett i det nya huset. Därtill får du en inbjudan till de första festligheterna i samband med öppningsceremonierna.'
  } else if (value < 10000) {
    return 'Förutom det tidigare nämnda får du ett listigt tack i det nya huset och en VIP-service på första festligheterna kopplat till öppningsceremonierna. Listiga tack kan vara garderobslister, dansgolvslister, playlist i baren, klister, eller något helt annat.'
  } else {
    return 'Tillträde till ett särskilt sällskap med exklusiva TF-evenemang och VIP-kontakt till nationen. Ju större bidrag, desto personligare koncept bygger vi upp.'
  }
}

const Amount = ({ defaultValue }: { defaultValue?: number }) => {
  const [amount, setAmount] = useState(defaultValue?.toString() ?? '')
  // Separate the string input from the number value to be able to have empty values.
  // It makes the user experience nicer.
  const amountParsed = parseFloat(amount)
  const amountNumber = !isNaN(amountParsed) ? amountParsed : 0.0

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAmount(e.target.value)
  }

  const description = donationLevelText(amountNumber)

  return (
    <div className="flex flex-col">
      <TextInput
        label="Summa"
        id="donate-amount"
        name="donate-amount"
        type="number"
        placeholder="00,00"
        min={0}
        step={0.01}
        value={amount}
        onChange={handleInputChange}
      />
      <DonationLevel value={amountNumber} setValue={setAmount} />
      <AnimatePresence initial={false} mode="wait">
        <motion.p
          className="pt-4"
          key={description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {description}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default Amount
