import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Event} from "../types";
import Link from "next/link";

interface Props {
    event: Event
}

/** Page for a single event */
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
    // Get all events
    const res = await fetch(`${process.env.BACKEND_URL}/events`)
    const events: Event[] = await res.json()

    // Create a path for each event
    const paths = events.map(event => ({
        params: { slug: event.slug }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Get a specific event
    const res = await fetch(`${process.env.BACKEND_URL}/events?slug=${params?.slug}`)
    const data = await res.json()
    // slug is unique field, thus only one can be found
    const event = data[0]

    return {
        props: { event }
    }
}

export default EventPage;
