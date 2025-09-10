'use client'

import classNames from 'classnames'
import TextInput from './TextInput'
import React, { ChangeEventHandler, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { DonationLevels as Levels } from '@payload-types'

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

const donationFormatter = new Intl.NumberFormat('en', { notation: 'compact' })
function formatDonationLevel(level: number) {
  return donationFormatter.format(level).toLowerCase()
}

const DonationLevels = ({
  value,
  setValue,
  levels,
}: {
  value: number
  setValue: (n: string) => void
  levels?: Levels
}) => (
  <div className="flex items-center pt-6">
    {levels?.map((level) => (
      <React.Fragment key={level.threshold}>
        {level.threshold > 0 && (
          <Button
            value={value}
            setValue={setValue}
            threshold={level.threshold}
            text={formatDonationLevel(level.threshold)}
          />
        )}
        <Line value={value} threshold={level.threshold} />
      </React.Fragment>
    ))}
  </div>
)

const Amount = ({ defaultValue, levels }: { defaultValue?: number; levels?: Levels }) => {
  const [amount, setAmount] = useState(defaultValue?.toString() ?? '')
  // Separate the string input from the number value to be able to have empty values.
  // It makes the user experience nicer.
  const amountParsed = parseFloat(amount)
  const amountNumber = !isNaN(amountParsed) ? amountParsed : 0.0

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAmount(e.target.value)
  }

  const sortedLevels = levels?.toSorted((a, b) => a.threshold - b.threshold)
  const description = sortedLevels?.findLast((level) => level.threshold <= amountNumber)?.description ?? ''

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
      <DonationLevels value={amountNumber} setValue={setAmount} levels={levels} />
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
