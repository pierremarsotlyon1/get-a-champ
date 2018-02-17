/**
 * Created by pierremarsot on 15/03/2017.
 */
import StringMask from 'string-mask';

export const MASK_NUMERO_SS = '9-99-99-99-999-999-99';

export function isNumberSSValide(numero_ss) {
  if(!numero_ss)
  {
    return false;
  }

  let replaced = numero_ss.replace(/-/g, '');
  replaced = replaced.replace(/_/g, '');
  if (!replaced || replaced.length !== 15) {
    return false;
  }


  const formatter = new StringMask(MASK_NUMERO_SS);
  const results = formatter.validate(replaced);

  return results === results;
}
