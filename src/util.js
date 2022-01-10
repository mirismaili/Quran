/**
 * Created on 1400/10/17 (2022/1/7).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

class EnArNumConvertor {
  static diff = '٠'.charCodeAt(0) - '0'.charCodeAt(0) // Arabic-Zero minus English-Zero
  
  static en2arNumber(num) { 
    return String(num).replace(/[0123456789]/g, EnArNumConvertor.shiftChar.bind(null, EnArNumConvertor.diff)) 
  }
  
  static ar2enNumber(arabicNum) {
    return arabicNum.replace(/[٠١٢٣٤٥٦٧٨٩]/g, EnArNumConvertor.shiftChar.bind(null, -EnArNumConvertor.diff)) 
  }
  
  static shiftChar(diff, char) {
    return String.fromCharCode(char.charCodeAt(0) + diff)
  }
}

export const {en2arNumber, ar2enNumber} = EnArNumConvertor

export const range = ({start = 0, end, step = 1, length = Math.ceil((end - start) / step)}) =>
  Array.from({length}, (_, i) => start + i * step)
