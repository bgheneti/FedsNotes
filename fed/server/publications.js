Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('files', function() {
      return FilesFS.find();
});