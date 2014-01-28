helpers=({
  posts: function(){

    a=Posts.find({}, {sort: {submitted:-1}}).fetch();
    
    if(a){
   
  	return a;

  }},

});



Template.postItemPage.helpers(helpers);
Template.postsList.helpers(helpers);