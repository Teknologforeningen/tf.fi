import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Post} from "../types";
import Link from "next/link";

interface Props {
    post: Post
}

const PostPage: NextPage<Props> = ({ post }) => {
    return (
        <div>
            <Link href={'/'}><a>Go Back</a></Link>
            <h2>{post.Title}</h2>
            <p>{post.Content}</p>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/posts`)
    const posts: Post[] = await res.json()

    const paths = posts.map(post => ({
        params: { slug: post.Slug }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(`${process.env.BACKEND_URL}/posts?Slug=${params?.slug}`)
    const data = await res.json()
    const post = data[0]

    return {
        props: { post }
    }
}

export default PostPage;
