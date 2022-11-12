import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwks from 'jwks-rsa';
import path from 'path';

export const checkJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: path.resolve(process.env.AUTH0_DOMAIN as string, '/.well-known/jwks.json'),
  }) as GetVerificationKey,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ['RS256'],
});
