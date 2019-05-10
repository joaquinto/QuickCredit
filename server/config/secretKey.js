import crypto from 'crypto';
import secureRandom from 'secure-random';

export default {
  sessionSecret: crypto.randomBytes(256).toString('hex'),
  signingKey: secureRandom(256, { type: 'Buffer' }),
};
