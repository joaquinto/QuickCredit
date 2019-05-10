import nJwt from 'njwt';

const signToken = (userId, userEmail, isAdmin, key) => {
  const token = nJwt.create({ id: userId, email: userEmail, admin: isAdmin }, key)
    .setExpiration(new Date().getTime() + (60 * 60 * 168000)).compact();
  return token;
};

export default signToken;
