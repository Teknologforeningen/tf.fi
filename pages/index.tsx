import type {GetServerSideProps, NextPage} from 'next'
import styles from '../styles/Home.module.css'
import { Chrono } from 'react-chrono'
import {Post} from "../types";
import Link from "next/link";

interface Props {
    posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
        <Chrono
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
            {posts.map(post => (
                <Link href={post.Slug ?? '/'} passHref={true} key={post.id}>
                    <div>
                        {post.Title}
                    </div>
                </Link>
            ))}
        </Chrono>
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
