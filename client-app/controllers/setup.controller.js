export default ['$scope', 'user', '$location', function ($scope, user, $location) {
  const vm = this;

  function userNameValid () {
    if (vm.user.info.nickName.length === 0) {
      return false;
    }

    return true;
  }

  vm.enterChat = function () {
    if (userNameValid()) {
      $location.url('/online');
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
