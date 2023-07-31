import { OAuth2Client } from 'google-auth-library';
import Users, { UserResource } from '../services/Users';
import constants from '../db/constants.json';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await getDecodedOAuthJwtGoogle(token) as any;
    console.log('DECODED', decodedToken);
    if (!decodedToken.payload) {
      throw "Bad Token";
    } else {

      const u: UserResource = {
        name: decodedToken.payload.name,
        firstName: decodedToken.payload.given_name,
        lastName: decodedToken.payload.family_name,
        email: decodedToken.payload.email,
        providerId: constants.provider.google,
        providerRef: decodedToken.payload.sub,
        photo: decodedToken.payload.picture,
      };

      const thisUser = await Users.findOrCreate(u);
      req.user = thisUser;
      next();
    }
    
    
  } catch(e) {
    console.log('e is ', e);
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