import type {GetServerSideProps, NextPage} from 'next'
import TF150Logo from "../components/TF150Logo";

const Home: NextPage = () => {
  return (
    <div className={"logo"}>
        <TF150Logo />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // get posts from api
    const res = await fetch(`${process.env.BACKEND_URL}/events`)
    const events = await res.json()
    return {
        props: { events }
    }
}

export default Home
