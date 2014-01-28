Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function(){
	this.route('postPage', {
		path:'/posts/:_id',
		data: function() {return Posts.findOne(this.params._id); }
	});

	this.route('welcome', {path: '/'});

	this.route('postsList', {path: '/List'});

	this.route('postSubmit',{
		path:'/submit'
	});
	this.route('yourPosts',{
		path:'/yourposts'
	});
	this.route('officialPosts',{
		path:'/featured'
	});
	this.route('fileTest',{
		path:'/files'
	});	
	this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
  });
});

var requireLogin = function(){
	if(! Meteor.user()){
		this.render('accessDenied');
		this.stop();
	}
};

Router.before(requireLogin, {only: ['postSubmit','postsList','yourPosts','officialPosts','postEdit']});