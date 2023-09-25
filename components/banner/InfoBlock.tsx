'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import classNames from 'classnames'
import Link from 'next/link'
import links from '@utils/links'
import Row from '@components/Row'
import TaffaABLogo from '@components/header/navbar/TaffaABLogo'
import DagsenLogo from '@components/header/navbar/DagsenLogo'

const InfoBlock = () => {
  const { status: authStatus } = useSession()
  const [infoVisible, setInfoVisible] = useState(
    authStatus === 'unauthenticated'
  )

  useEffect(() => {
    const timeout = setTimeout(() => setInfoVisible(false), 15000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={classNames(
        'duration-400 absolute bottom-0 right-0 w-full rounded-md bg-darkgray p-4 text-white transition ease-in-out xxs:w-fit',
        infoVisible ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <p className="mb-2 inline-flex items-center border-b-4 border-teknologröd">
        Tänkte du besöka?
      </p>
      <Row>
        <div className="mr-2 border-r-[1px] border-r-white pr-2">
          <Link
            href={links.täffäab}
            className="link link-text inline-flex items-center"
          >
            <TaffaABLogo textHidden={false} />
          </Link>
          <div className="mt-2 text-sm">Catering och barverksamhet</div>
        </div>
        <div>
          <Link
            href={links.lunch}
            className="link link-text inline-flex flex-row items-center"
          >
            <DagsenLogo textHidden={false} />
          </Link>
          <div className="mr-2 mt-2 text-sm">Nationens lunchrestaurang</div>
        </div>
      </Row>
    </div>
  )
}

export default InfoBlock
