import bcrypt from 'bcrypt';

const saltRount = 10;
export function hashPassword(password, callback){
  bcrypt.hash(password, saltRount, function(err, hash){
    if(err)
    {
      return callback('Erreur lors du hashage du mot de passe');
    }

    return callback(null, hash);
  });
};

export function decryptPassword(password, passwordHash, callback)
{
  bcrypt.compare(password, passwordHash, function(err, res) {
    return callback(!err && res);
  });
}