var app = angular.module('chatApp', [
	'btford.socket-io',
	'ngRoute'
]);

// set up socket factory
app.factory('io', function(socketFactory){
	return socketFactory();
});

// configure routes
app.config(function($routeProvider){

	$routeProvider
		.when('/', 
			{controller: 'setUpController',
			 templateUrl: '/app/partials/set-up-view.html'})
	
		.when('/online', 
			{controller: 'chatController',
			 templateUrl: '/app/partials/chat-view.html'})
		
		.otherwise({redirectTo : '/'})
});

// create temp user info service

app.service('userInfo', function(){
	
	// gives the user a random image but they can change it
	var sampleImages = [
		'https://upload.wikimedia.org/wikipedia/commons/6/6a/Anonymous_mask.jpg',
		'http://s0.geograph.org.uk/geophotos/02/31/21/2312131_1386e45b.jpg',
		'https://upload.wikimedia.org/wikipedia/commons/b/b0/Bunny_in_zoo.jpg',
		'https://upload.wikimedia.org/wikipedia/commons/b/b6/Two_bulls_matching_testosterone_levels..jpg',
		'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
		'http://img00.deviantart.net/d3db/i/2010/051/9/3/outer_space_maybe_not_by_anklesneeze.jpg',
		'https://pixabay.com/static/uploads/photo/2015/09/22/20/37/fruit-952425_960_720.jpg',
		'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/See_you_at_the_beach!.jpg/1024px-See_you_at_the_beach!.jpg'
	];
	
	var info = {
		nickName: "anonymous",
		font: 'inherit',
		fontColor: '#000000',
		backgroundColor: '#ffffff',
		outlineColor: '#000000',
		imageUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)]
	};
	
	return{
		getInfo: function(){
			return info;
		},
		
		setInfo: function(inserted){
			info = inserted;
		},
		resetInfo: function(){
			return info = {
				nickName: "",
				font: 'inherit',
				fontColor: '#000000',
				backgroundColor: '#ffffff',
				outlineColor: '#000000',
				imageUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)]
			};
		}
	}
});




















