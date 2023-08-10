import { NextApiRequest, NextApiResponse } from 'next'

const checkIfLoggedIn = async (cookies?: string) => {
  const fetchHeaders = new Headers()
  fetchHeaders.append('Cookie', cookies || '') // Add the cookie header if cookies exist

  const kcRes = await fetch(`${process.env.STRAPI_URL}/keycloak/isLoggedIn`, {
    headers: fetchHeaders,
  })
  const isLoggedIn = await kcRes.json()

  return isLoggedIn === true
}

const requireAuthMiddleware =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const isLoggedIn = await checkIfLoggedIn(req.headers.cookie) // Pass the cookies from the request

      if (isLoggedIn) {
        // User is logged in, proceed to the next middleware or route handler
        await handler(req, res)
      } else {
        // User is not logged in, send an unauthorized response
        res.status(401).json({ error: 'Unauthorized' })
      }
    } catch (error) {
      console.error('Authentication error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

export default requireAuthMiddleware
