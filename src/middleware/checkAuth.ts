import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const requireAuthMiddleware =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await getSession({ req }) // Pass the cookies from the request
      if (session) {
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
