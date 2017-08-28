export default `
  <div class='main container'>
    <div class="row">
      <h1>Angularjs Chat Application</h1>
      <h3>fill out the information below to join the conversation</h3>
    </div>
    <div class='row'>
      <div class='col-sm-12'>
        <div class="form-group">
          <label>Nickname:</label>
          <input type='text' class='form-control' ng-model='vm.user.info.nickName'>
        </div>
        <p class="error" ng-show='vm.showError'>* Give yourself a nickname</p>
      </div>
    </div>
    <div class='row'>
      <div class='col col-sm-12'>
        <div class="form-group">
          <label>Font:</label>
          <select class='form-control' ng-model='vm.user.info.font'>
            <option value='inherit'>inherit</option>
            <option value='Times New Roman'>Times New Roman</option>
            <option value='impact'>impact</option>
            <option value='Monospace'>Monospace</option>
            <option value='Courier New'>Courier New</option>"Comic Sans MS", "Comic Sans", cursive;
            <option value='Comic Sans MS", "Comic Sans", cursive;'>Comic Sans</option>
          </select>
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col col-sm-12'>
        <div class="form-group">
          <label>Font color:</label>
          <input type='color' class='form-control' ng-model='vm.user.info.fontColor' />
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col col-sm-12'>
        <div class="form-group">
          <label> Background color:</label>
          <input type='color' class='form-control' ng-model='vm.user.info.backgroundColor' />
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col col-sm-12'>
        <div class="form-group">
          <label>Outline color:</label>
          <input type='color' class='form-control' ng-model='vm.user.info.outlineColor' />
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col col-sm-12'>
        <div class="form-group">
          <label>Avatar url:</label>
          <input type='text' class='form-control' ng-model='vm.user.info.avatar' />
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col col-sm-12'>
        <div ng-style="{'background-image' : 'url(' + vm.user.info.avatar + ')'}" style='background-size: cover; width: 15em; height: 10em; outline: 4px dotted white; margin-bottom: 15px;'></div>
      </div>
    </div>

    <div class='row'>
      <div class='col col-sm-6 col-md-4'>
        <button type='button' class='btn btn-default' ng-click='vm.enterChat()'>Join Conversation</button>
      </div>
      <div class='col col-sm-6 col-md-4'>
        <button type='button' class='btn btn-danger' ng-click='vm.resetUserInfo()'>Reset Info</button>
      </div>
    </div>
  </div>

  <style>
    .main{
      padding-top: 15px;
      padding-bottom: 15px;
    }

    h1, h3{
      text-align: center;
    }

  </style>
`;
