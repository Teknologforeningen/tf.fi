This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Developing

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying

There is a Dockerfile that can be built and ran with:

```bash
docker build -t tf150 .
docker run -p 3000:3000 -e BACKEND_URL='http://localhost:1337' tf150
```

## TODO

Check [Taiga](https://taiga.tf.fi/project/neergaa1-tf150-webpage)
