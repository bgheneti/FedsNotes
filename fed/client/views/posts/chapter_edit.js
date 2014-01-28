

Template.chapterEdit.events({
	'click .undoEdit':function(){

	history.go(0);

	},


	'click .normEdit':function(){


var toggleOne= '<div><h4>{{chapter}}</h4></div><div style="text-align:center; margin:0 auto"><h5 style="text-align:center; margin:0 auto">{{#each fileUrl}}{{cfsDownloadButton "FilesFS" class="btn btn-primary btn-mini" content=filename}}{{else}}No files to load.{{/each}}</h5></div>';
var toggleTwo= '<div class="control-group"><input name="chapter'+this[2].toString()+'" type="text" value='+this[0]+' placeholder='+this[0]+' class="form-control"/><input type="file" class="fileUploader chapter'+this[2].toString()+'" Text="change files"><br><div class="controls"><a class="btn btn-danger chapter-change form-control" href="#" style="background-color:green; border-color:green">change chapter</a></div><br><div class="controls"><a class="btn btn-danger chapter-delete form-control" href="#">Delete chapter</a></div></div>';


var chapterId = (this[2]);


$("."+chapterId).toggleClass("toggleA toggleB");
$(".edit-toggle").toggleClass("normEdit undoEdit");


$("."+chapterId+".toggleB").html(toggleTwo);

$("."+chapterId+".toggleA").html(toggleOne);

$(".undoEdit").html("undo");

$(".normEdit").html("edit");
},





'click .chapter-delete':function(e){
	var chapterId = (this[2]);
	console.log(chapterId);
	if(confirm("Delete this chapter?")){
	var currentPostId=document.URL.toString().slice(-22,-5);
	var chapterList = Posts.findOne({_id:currentPostId})["chapters"];
	chapterId+=1;
	console.log(chapterList.slice(chapterId));	
	var chapterListB = chapterList.slice(chapterId);
	console.log(chapterListB);
	postProperties={chapters:chapterListB};
	Posts.update(currentPostId,{$set:postProperties}, function(error){
		if(error){
			alert(error.reason);
			window.location.reload();

		}
		else{
			window.location.reload();		
		}
	});

	}
},


'click .chapter-change':function(e){
	var chapterId = (this[2]);
	console.log(chapterId);
	if(confirm("Change this chapter?")){
	var currentPostId=document.URL.toString().slice(-22,-5);
	var chapterList = Posts.findOne({_id:currentPostId})["chapters"];

	var nameFind = "[name='chapter".concat((chapterId.toString()),"']");
	console.log(nameFind);

	chapterName=$(".toggled").find(nameFind).val();
	console.log(chapterName);

	chapterList[chapterId][0]= chapterName;


	$(".toggled").find('.fileUploader'+'.'+'chapter'+chapterId.toString()).each(function(i,obj){
		console.log('changed file');
        var files = obj.files;
        console.log("fuckno");
        if(obj.value===""){
       	console.log("fuck");
        chapterFiles.push(obj.value);		
        }
        for (var i = 0, f; f = files[i]; i++) {
        	console.log('for loop file');
        	var fileName=FilesFS.storeFile(f,{name:f.id ,userId:Meteor.user(), subject: Posts.findOne({_id:currentPostId})["subject"], grade: Posts.findOne({_id:currentPostId})["grade"]});    			
        	chapterList[chapterId][1]=fileName;

    	}
    });

	
		postProperties={chapters: chapterList};


	Posts.update(currentPostId,{$set:postProperties}, function(error){
		if(error){
			alert(error.reason);
			window.location.reload();

		}
		else{
			window.location.reload();		
		}
	});



}
}


});




Template.chapterEdit.helpers({

	})
