// 暂时修改为生产和线上一样 没必要不一样
const gbs = {
  host: 'http://lshao.cn',
  lockr_prefix: 'LAOSHIHAO_',
  secret_key: '^#rwd6Ffz$X5alRN',
  domain: '.lshao.cn',
  secret: {
    key_str: '^#rwd6Ffz$X5alRN',
    iv_str: '^#rwd6Ffz$X5alRN'
  }
};
const cbs = {};

if (process.env.NODE_ENV === 'production') {
  // gbs.domain = '.paascloud.net';
  gbs.domain = '.lshao.cn';
} else {
  // gbs.domain = '.paascloud.net';
  gbs.domain = '.lshao.cn';
  // gbs.lockr_prefix += 'DEV_';
}

const enums = {
  USER: {
    LOGIN_NAME: 'LOGIN_NAME',
    MENU_LIST: 'MENU_LIST',
    REMEMBER_ME: 'REMEMBER_ME',
    AUTH_TOKEN: 'AUTH_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    REDIRECT_URI: 'REDIRECT_URI'
  }
};

export {
  gbs,
  cbs,
  enums
};
