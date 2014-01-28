
allowedToPost = function(userId){
	if(!userId){
		throw new Meteor.Error(401, "You need to login to post");
	}
	else{
		return true;
	}
}

allowedToEdit = function(userId, doc) {
  return doc && doc.userId === userId;
  console.log('ues');
}