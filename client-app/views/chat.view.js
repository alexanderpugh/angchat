export default `
<div class="container">
   <div class="row">
      <div class="col col-sm-12">
         <!-- messages start -->
         <div id="msg-area" class="messages">
            <div class="msg" ng-repeat="m in vm.messages track by $index" ng-style="{'font-family': m.user.font, 'color': m.user.fontColor, 'background-color': m.user.backgroundColor, 'outline': '1px solid' + m.user.outlineColor}">
               <div ng-style="{'background-image': 'url(' + m.user.avatar + ')'}"></div>
               <p>
                  <strong>{{m.user.nickName}}</strong>
                  at
                  <strong>{{m.posted | date:"h:m:s"}}</strong> said:<br>
                  "{{m.content}}"
               </p>
            </div>
            <div id="scroll-to"></div>
         </div>
         <!-- messages end -->
      </div>
   </div>
   <div class="row">
      <div class="col col-sm-12">
         <!-- message type start -->
         <div class="form-group">
          <textarea class="form-control" placeholder="HIT ENTER TO SEND MESSAGE" ng-model="vm.tempMessage.content" ng-enter="vm.sendMessage()"></textarea>
         </div>
         <!-- message type end -->
      </div>
   </div>
</div>

<style>
	#send-btn{
		margin-top: 5px;
		margin-left: 5px;
	}

	#msg-area{
		height: 64vmin;
		margin-bottom: 15px;
    margin-top: 20px;
		overflow-y: scroll;
    box-shadow: 0px 0px 5px #666;
	}

	#activity-area, #online-area{
		height: 23vmin;
		margin-bottom: 15px;
		overflow-y: scroll;
	}

	.msg{
		margin-bottom:10px;
	}

	.msg div{
		width: 40px;
    height: 40px;
    background-size: cover;
    margin-top: 5px;
    margin-left: 5px;
    display: inline-block;
    border-radius: 100%;
    background-position: center;
	}

  .msg p {
    display: inline-block;
    padding: 5px 0px 0px 10px;
    max-width: 90%;
  }
</style>
`;
