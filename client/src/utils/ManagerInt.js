/**
 * Created by pierremarsot on 24/03/2017.
 */
class ManagerInt{
  static stringToInt(str){
    return Number.parseInt(str);
  }

  static isInt(i){
    return Number.isInteger(i);
  }

  static intToString(i){
    return i.toString();
  }
}

export default ManagerInt;