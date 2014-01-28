var helpers={
	chapter:function(){
		return this[0];
	},
	fileUrl:function() {
    return FilesFS.find({_id:this[1]}, { sort: {uploadDate:-1} });
	},
	file:function(){
		return this[1];
	},
	chapterId:function(){
		return this[2];
	},
};

Template.chapter.helpers(helpers);
Template.chapterEdit.helpers(helpers);
