Posts = new Meteor.Collection('posts');
FilesFS = new CollectionFS('files');

Posts.allow({
  update:allowedToEdit,
  remove:allowedToEdit
});

FilesFS.allow({
  insert: allowedToPost,
  update: allowedToEdit,
  remove: allowedToEdit
});

FilesFS.filter({
    allow: {
        contentTypes: ['application/pdf','application/zip','application/vnd','application/x-latex']
    }
});


Meteor.methods({

	post: function(postAttributes){
			user=Meteor.user();
			samePost=Posts.findOne({subject: postAttributes.subject, grade: postAttributes.grade, author: postAttributes.author});
			if(!user)
				throw new Meteor.Error(401, "You need to login to post");

			if(!postAttributes.subject)
				throw new Meteor.Error(422, 'Please fill in a subject');

			if(!postAttributes.grade)
				throw new Meteor.Error(422, 'Please fill in a grade');
			
			if(postAttributes.subject && samePost){
						throw new Meteor.Error(30.2,
						"You have already posted this subject",
						samePost._id);
					}

			var post= _.extend(_.pick(postAttributes, 'subject','description','grade','chapters'),
			{
				userId: user._id,
				author:user.username,
				submitted: new Date().getTime(),
			});

			if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.return();
      }, 5 * 1000);
      future.wait();
    }

	var postId = Posts.insert(post);

	return postId;
	}
});