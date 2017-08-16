export default {
  after: (field, [target]) => ` ${field}必须在${target}之后`,
  alpha_dash: (field) => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
  alpha_num: (field) => `${field} 只能包含字母数字字符.`,
  alpha_spaces: (field) => ` ${field} 只能包含字母字符，包括空格.`,
  alpha: (field) => ` ${field} 只能包含字母字符.`,
  before: (field, [target]) => ` ${field} 必须在${target} 之前.`,
  between: (field, [min, max]) => ` ${field} 必须在${min}~${max}之间.`,
  confirmed: (field, [confirmedField]) => ` ${field} 不能和${confirmedField}匹配.`,
  date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间.`,
  date_format: (field, [format]) => ` ${field}必须在在${format}格式中.`,
  decimal: (field, [decimals] = ['*']) => ` ${field} 必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点.`,
  digits: (field, [length]) => ` ${field} 必须是数字，且精确到 ${length}数`,
  dimensions: (field, [width, height]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
  email: (field) => ` ${field} 必须是有效的邮箱.`,
  ext: (field) => ` ${field} 必须是有效的文件.`,
  image: (field) => ` ${field} 必须是图片.`,
  in: (field) => ` ${field} 必须是一个有效值.`,
  ip: (field) => ` ${field} 必须是一个有效的地址.`,
  max: (field, [length]) => ` ${field} 不能大于${length}字符.`,
  mimes: (field) => ` ${field} 必须是有效的文件类型.`,
  min: (field, [length]) => ` ${field} 必须至少有 ${length} 字符.`,
  not_in: (field) => ` ${field}必须是一个有效值.`,
  numeric: (field) => ` ${field} 只能包含数字字符.`,
  regex: (field) => {
    var msg = JSON.parse(sessionStorage.getItem('validateMsg'));
    if (msg && msg[field]['regex']) {
      return msg[field]['regex'];
    }
    return ` ${field} 格式无效.`

  },
  required: (field) => {
    var msg = JSON.parse(sessionStorage.getItem('validateMsg'));
    if (msg && msg[field]['required']) {
      return msg[field]['required'];
    }
    return `${field} 是必须的.`
  },
  size: (field, [size]) => ` ${field} 必须小于 ${size} KB.`,
  url: (field) => ` ${field} 不是有效的url.`,
  money: (field) => ` ${field} 不是有效的金额.`,
  month: (field) => ` ${field} 不是有效的月份.`,
  monthLessNow: (field) => ` ${field} 不能大于当前月份.`,
  rate: (field) => ` ${field} 不是有效利率.`,
  double: (field) => ` ${field} 不是有小数.`,
  mobile: (field) => ` ${field} 必须是11位手机号码.`,
  idNumber: (field) => ` ${field} 身份证格式不正确.`
}
