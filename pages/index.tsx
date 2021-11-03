import type {GetServerSideProps, NextPage} from 'next'
import styles from '../styles/Home.module.css'
import { Chrono } from 'react-chrono'
import {Post} from "../types";
import {postToTimelineItemModel} from "../utils";
import {useRouter} from "next/router";

interface Props {
    posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
    const router = useRouter()
    const items = posts?.map(postToTimelineItemModel)

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
        />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // get posts from api
    const res = await fetch(`${process.env.BACKEND_URL}/posts`)
    const posts = await res.json()
    return {
        props: { posts }
    }
}

export default Home
