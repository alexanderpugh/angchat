export default ['user', '$location', function (user, $location) {
  const vm = this;

  function userNameValid () {
    if (vm.user.info.nickName.length === 0) {
      return false;
    }

    return true;
  }

  vm.enterChat = function () {
    if (userNameValid()) {
      user.joinChat((err) => {
        if (!err) {
          $location.url('/online');
        }
      });
    } else {
      vm.showError = true;
    }
  };

  vm.resetUserInfo = function () {
    user.clear();
    vm.showError = false;
  };

  function init() {
    vm.user = user;
    vm.showError = false;
  }

  init();
}];
