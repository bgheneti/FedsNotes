function user(x){
  return "xrzBvsYztiLkrwMcs"==x.userId;
}

var helpers = {
  posts: function(){
  	a=Posts.find({}, {sort: {submitted:-1}}).fetch();

  	for(var i=0; i<a.length; i++){
  		a[i].num=i;
  	}
    b=a.filter(user);
  	return b;
  }
};

Template.officialPosts.helpers(helpers);