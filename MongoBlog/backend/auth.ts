import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwks from 'jwks-rsa';
import path from 'path';

export const checkJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: false,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-roialwrd57c7a87s.us.auth0.com/.well-known/jwks.json',
  }) as GetVerificationKey,
  audience: 'https://mongoblog-api/',
  issuer: 'https://dev-roialwrd57c7a87s.us.auth0.com/',
  algorithms: ['RS256'],
});
