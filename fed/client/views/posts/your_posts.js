function user(x){
  return Meteor.user()._id==x.userId;
}

var helpers = {
  posts: function(){

  	a=Posts.find({}, {sort: {submitted:-1}}).fetch();

  	if(a){

  	for(var i=0; i<a.length; i++){
  		a[i].num=i;
  	}
    b=a.filter(user);
  	return b;
  }},
};

Template.yourPosts.helpers(helpers);
