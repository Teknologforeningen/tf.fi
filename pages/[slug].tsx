import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Event} from "../types";
import Link from "next/link";

interface Props {
    event: Event
}

const EventPage: NextPage<Props> = ({ event }) => {
    return (
        <div>
            <Link href={'/'}><a>Go Back</a></Link>
            <h2>{event?.title}</h2>
            <p>{event?.content}</p>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/events`)
    const events: Event[] = await res.json()

    const paths = events.map(event => ({
        params: { slug: event.slug }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(`${process.env.BACKEND_URL}/events?slug=${params?.slug}`)
    const data = await res.json()
    const event = data[0]

    return {
        props: { event }
    }
}

export default EventPage;
