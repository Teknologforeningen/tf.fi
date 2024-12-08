'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { STRAPI_URL } from '@lib/strapi'
import defaultBannerPic from '../../public/images/banner/banner.jpg'

export const Carousel = ({ urls }: { urls: string[] }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % urls.length)
    }, 5000)

    return () => clearInterval(interval)
  })

  return (
    <motion.div
      animate={{ x: `-${index * 100}%` }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      // @ts-expect-error https://github.com/motiondivision/motion/issues/2929
      className="flex h-full max-h-full"
    >
      {urls.map((url, i) => (
        <div key={url} className="relative h-full w-full shrink-0">
          <Image
            src={`${STRAPI_URL}${url}`}
            alt=""
            className="bg-black object-cover opacity-50"
            loading={i > 2 ? 'lazy' : 'eager'}
            fill
            quality={100}
          />
        </div>
      ))}
    </motion.div>
  )
}

export const SingleBannerImage = () => {
  return (
    <Image
      src={defaultBannerPic}
      alt="banner"
      style={{ objectFit: 'cover', opacity: 0.5, backgroundColor: 'black' }}
      fill
      loading="eager"
      quality={100}
    />
  )
}
