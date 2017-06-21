module.exports = {
  "extends": "eslint-config-airbnb-base",
  "env": {
    "browser": true
  },
  "globals": {
    "angular": true,
    "window": true
  },
  "rules": {
    "no-console": 0,
    "no-alert":0,
    "comma-dangle": 0,
    "no-param-reassign": 0, // 允许对函数的参数重新进行赋值
    "no-restricted-syntax": 0, // 允许使用某些特定的JavaScript语法
    "linebreak-style": 0, //不统一换行符
    "no-lonely-if":0,
    //"guard-for-in": 0,// 在for-in 循环中要使用if语句
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": false
    }],
    "indent": ["error", 2, {
      "MemberExpression": 1
    }]
  }
};