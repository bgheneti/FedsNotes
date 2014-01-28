Template.fileTest.helpers = ({
	files:function() {
    //show all files that have been published to the client, with most recently uploaded first
    return FilesFS.find({}, { sort: { uploadDate:-1 } });
	}
});