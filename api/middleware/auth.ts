import { OAuth2Client } from 'google-auth-library';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await getDecodedOAuthJwtGoogle(token);
    console.log('DECODED', decodedToken);
    next();
    // if (req.body.userId && req.body.userId !== userId) {
    //   throw 'Invalid user ID';
    // } else {
      
    // }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

const getDecodedOAuthJwtGoogle = async token => {

    const CLIENT_ID_GOOGLE = process.env.BOOTERS_GOOGLE_CLIENT_ID
  
    try {
      const client = new OAuth2Client(CLIENT_ID_GOOGLE)
  
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID_GOOGLE,
      })
  
      return ticket
    } catch (error) {
      return { status: 500, data: error }
    }
  }

  export default auth;