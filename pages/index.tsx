import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Chrono } from 'react-chrono'

const Home: NextPage = () => {
    const items = [
        {
            title: 'Januari 2022',
            cardTitle: 'Jubileumsåret startar',
            cardSubtitle: 'Någon text. En länk.',
        },
        {
            title: 'Februari 2022',
            cardTitle: 'En sitz',
            cardSubtitle: 'En rolig text. En länk.',
        },
        {
            title: 'Mars 2022',
            cardTitle: 'Roligt evenemang',
            cardSubtitle: 'En rolig text. En länk.',
        }
    ];

  return (
    <div className={styles.container}>
        <Chrono
            items={items}
            mode='VERTICAL_ALTERNATING'
            hideControls
            theme={{
                primary: 'red',
                secondary: 'dark-red',
                titleColor: 'red'
            }}
            cardWidth={500}
            onItemSelected={x => console.log(x)}
        >
            <div>
                TEXT
            </div>
            <div>
                <div>Annan text</div>
                <div><a href="sits-lank">Länk till sitzen</a></div>
            </div>
        </Chrono>

    </div>
  )
}

export default Home
