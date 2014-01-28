var addinit=0
var chapterFiles = []

Template.postEdit.events({
	'submit form': function(e){
	e.preventDefault();


	$(e.target).find('.fileUploader').each(function(i,obj){
		console.log('changed file');
        var files = obj.files;
        if(obj.value===""){
       	console.log("fuck");
        chapterFiles.push(obj.value);		
        }
        for (var i = 0, f; f = files[i]; i++) {
        	console.log('for loop file');
        	var fileSubject = $("input[name='subject']").val();
        	var fileGrade = $("input[grade='subject']").val();
        	x=FilesFS.storeFile(f,{name:f.id ,userId:Meteor.user(), subject: fileSubject, grade: fileGrade});
        	chapterFiles.push(x);    			
    	}
    });

	var currentPostId = this._id;

    var Chapters=Posts.findOne({_id:currentPostId})["chapters"];

	console.log('here');
	$(e.target).find('.chapters').each(function(i,obj){
		if(obj.value!="" & chapterFiles[i]!=""){
  			Chapters.push([obj.value,chapterFiles[i],i]);
  		}
	});
	console.log(Chapters);

	setTimeout(1000);


	var postProperties = {
		subject: $(e.target).find('[name=subject]').val(),
		title:$(e.target).find('[name=title]').val(),
		description:$(e.target).find('[name=description]').val(),
		chapters:Chapters
	}
	Posts.update(currentPostId,{$set:postProperties}, function(error){
		if(error){
			alert(error.reason);
		}
		else{
			Router.go('postPage',{_id:currentPostId})
		}
	});
},

'click .delete':function(e){
	if(confirm("Delete this post?")){
	var currentPostId=this._id;
	Posts.remove(currentPostId);
	Router.go('postsList');

	}
},

'click .chapter':function(e){
	addinit+=1;

	var currentPostId=document.URL.toString().slice(-22,-5);
	var chapterList = Posts.findOne({_id:currentPostId})["chapters"];
	console.log;
	var chapterLength = chapterList.length;
	console.log(chapterLength);
	added=addinit+chapterLength;

	chapter=added.toString();
	var adder = '<br><label class="control-label" for="chapter'+chapter+'">chapter '+chapter+'</label><br<br><div class="controls" id="chapter'+chapter+'"><input name="'+chapter+'" type="text" value="" class="form-control chapters" placeholder="Chapter title"></inputxt></div>';
	$(".col9").append(adder);
	var adder2= '<br><input type="file" id="file'+chapter+'" class="fileUploader" multiple>'
	$(".col-md-3").append(adder2);
},


});


Template.chapterEdit.helpers({
	chapter:function(){
		return this[0];
	}
})