module.exports = {
  extends: [require.resolve('@redneckz/react-lib-config/.eslintrc.js')],
  rules: {
    'no-param-reassign': ['error', { 'props': false }],
  },
};
