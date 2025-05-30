import React from 'react'
import { fetchHomepage } from '@lib/strapi/homepage'
import { Carousel, SingleBannerImage } from '@components/banner/BannerImages'
import InfoBlock from '@components/banner/InfoBlock'
import Column from '@components/Column'

const MainBanner = async () => {
  const homepage = await fetchHomepage()
  const urls = homepage?.banner?.bannerImages?.map((img) => img.url)
  return (
    <>
      <div className="relative h-[500px] w-full overflow-x-hidden bg-black">
        {urls && urls.length !== 0 ? <Carousel urls={urls} /> : <SingleBannerImage />}
        <div className="absolute left-0 right-0 top-[180px] flex flex-col xl:left-40 xl:right-auto xl:flex-row">
          <svg
            className="xl:block"
            width="100%"
            height={70}
            viewBox="0 0 26 26"
            fill={'white'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M25.1889 14.3492C25.2556 13.7939 25.3 13.2386 25.3 12.6833C25.3 12.1502 25.2556 11.5949 25.1889 11.0396V11.0174L23.0343 11.2839C22.9233 10.351 22.6789 9.48472 22.3235 8.64065L24.3226 7.81878C23.9006 6.79701 23.3453 5.84188 22.6789 4.95338L20.9686 6.26391C20.4132 5.5309 19.7691 4.88674 19.0361 4.33143L20.3466 2.62107C19.4803 1.9547 18.503 1.39938 17.5034 0.977348L16.6816 2.97647C15.8375 2.62107 14.9712 2.39895 14.0383 2.26567L14.327 0.111062C13.7939 0.0444249 13.2386 0 12.6833 0C12.1502 0 11.5949 0.0444249 11.0396 0.111062H11.0174L11.2839 2.26567C10.351 2.37673 9.48472 2.62107 8.64065 2.97647L7.81878 0.977348C6.79701 1.39938 5.84188 1.9547 4.95338 2.62107L6.26391 4.33143C5.5309 4.88674 4.88674 5.5309 4.33143 6.26391L2.62107 4.95338C1.9547 5.81966 1.39938 6.7748 0.977348 7.79657L2.97647 8.64065C2.62107 9.48472 2.39895 10.351 2.26567 11.2839L0.111062 10.9952C0.0444249 11.5283 0 12.0836 0 12.6389C0 13.172 0.0444249 13.7273 0.111062 14.2826L2.26567 14.0161C2.37673 14.949 2.62107 15.8153 2.97647 16.6593L0.977348 17.4812C1.39938 18.503 1.9547 19.4581 2.62107 20.3466L4.33143 19.0361C4.88674 19.7691 5.5309 20.4132 6.26391 20.9686L4.95338 22.6789C5.81966 23.3453 6.7748 23.9006 7.79657 24.3226L8.64065 22.3235C9.48472 22.6789 10.351 22.901 11.2839 23.0343L10.9952 25.1889C11.5505 25.2556 12.1058 25.3 12.6389 25.3C13.172 25.3 13.7273 25.2556 14.2826 25.1889L13.9938 23.0343C14.9268 22.9233 15.7931 22.6789 16.6371 22.3235L17.459 24.3226C18.4808 23.9006 19.4359 23.3453 20.3244 22.6789L19.0139 20.9686C19.7469 20.4132 20.391 19.7691 20.9463 19.0361L22.6567 20.3688C23.3231 19.5025 23.8784 18.5474 24.3004 17.5256L22.3013 16.6816C22.6567 15.8375 22.901 14.9712 23.0121 14.0383L25.1889 14.3492ZM13.7273 20.8575C9.21817 21.435 5.06444 18.2586 4.48692 13.7273C3.90939 9.21817 7.08577 5.06444 11.6171 4.48692C16.1262 3.90939 20.28 7.08577 20.8575 11.6171C21.435 16.1262 18.2586 20.2578 13.7273 20.8575Z" />
            <path d="M12.3057 7.95203H7.4856V10.1511H11.5727V19.3026H13.7717V15.1489H16.0596V12.9498H14.327H14.1938H13.7717V10.1511H17.8588V7.95203H12.7055H12.3057Z" />
          </svg>
          <Column className="flex justify-center text-center md:text-left">
            <p className="font-display text-xl font-bold uppercase text-white xxs:text-2xl md:text-4xl">
              Teknologföreningen
            </p>
            <p className="text-m text-white md:text-xl">Den svenskspråkiga nationen vid Aalto universitetet</p>
          </Column>
        </div>
        <InfoBlock />
      </div>
    </>
  )
}

export default MainBanner
