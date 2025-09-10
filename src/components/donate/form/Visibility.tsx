'use client'

import { useState } from 'react'
import RadioInput from './RadioInput'
import classNames from 'classnames'
import TextInput from './TextInput'

export enum VisibilityType {
  visible = 'visible',
  pseudonym = 'pseudonym',
  anonymous = 'anonymous',
}

export type Visibility =
  | { type: VisibilityType.visible }
  | { type: VisibilityType.pseudonym; value: string }
  | { type: VisibilityType.anonymous }

const VisibilitySelection = ({ visibility, visibilityText }: { visibility?: Visibility; visibilityText?: string }) => {
  const [showPseudonymInput, setShowPseudonymInput] = useState(visibility?.type === VisibilityType.pseudonym)

  return (
    <>
      <label className="text-lg pt-6 italic">Synlighet</label>
      <p className="pt-3">{visibilityText}</p>
      <RadioInput
        id="visibility-visible"
        name="donate-visibility"
        value={VisibilityType.visible}
        label="Jag samtycker och donerar under eget namn"
        defaultChecked={visibility?.type === VisibilityType.visible}
        onChange={() => setShowPseudonymInput(false)}
        required
      />
      <RadioInput
        id="visibility-pseudonym"
        name="donate-visibility"
        value={VisibilityType.pseudonym}
        label="Jag samtycker och donerar under följande pseudonym"
        defaultChecked={visibility?.type === VisibilityType.pseudonym}
        onChange={() => setShowPseudonymInput(true)}
      />
      <TextInput
        placeholder="Pseudonym"
        id="donate-pseudonym"
        name="donate-pseudonym"
        className={classNames('border-t-0 w-full', { hidden: !showPseudonymInput })}
        required={showPseudonymInput}
      />
      <RadioInput
        id="visibility-anonym"
        name="donate-visibility"
        value={VisibilityType.anonymous}
        label="Jag donerar anonymt"
        defaultChecked={visibility?.type === VisibilityType.anonymous}
        onChange={() => setShowPseudonymInput(false)}
      />
    </>
  )
}

export default VisibilitySelection
