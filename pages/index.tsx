import type {GetServerSideProps, NextPage} from 'next'
import TF150Logo from "../components/TF150Logo";
import VerticalLine from "../components/verticalLine";
import VerticalLineLong from '../components/verticalLineLong';
import Row from "../components/row";

const Home: NextPage = () => {
  return (
      <>
        <div className={"logo"}>
            <TF150Logo />
        </div>
          <Row>

              {[...Array(15)].map((x, i) => (<VerticalLine key={i}/>))}
              <VerticalLineLong/>
          </Row>
      </>

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
