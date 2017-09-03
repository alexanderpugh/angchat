module.exports = ({
  success = false,
  message = '',
  data = null
} = {}) => {
  return {
    success,
    message,
    data
  };
};
