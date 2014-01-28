var added=1
var chapterFiles=[]
var a= new Array();
Template.postSubmit.events({
	'submit form': function(e){
	e.preventDefault();

	$(e.target).find('.fileUploader').each(function(i,obj){
        var files = obj.files;
        if(obj.value===""){
        chapterFiles.push(obj.value);		
        }
        for (var i = 0, f; f = files[i]; i++) {
        	var fileSubject = $("input[name='subject']").val();
        	var fileGrade = $("input[grade='subject']").val();
        	x=FilesFS.storeFile(f,{name:f.id ,userId:Meteor.user(), subject: fileSubject, grade: fileGrade});
        	chapterFiles.push(x);    			
    	}
    });

	var Chapters=[];

	$(e.target).find('.chapters').each(function(i,obj){
		if(obj.value!="" & chapterFiles[i]!=""){
  			Chapters.push([obj.value,chapterFiles[i],i]);
  		}
	});
	console.log(Chapters);

	setTimeout(1000);

	var post = {
	subject: $(e.target).find('[name=subject]').val(),
	grade: $(e.target).find('[name=grade]').val(),
	description: $(e.target).find('[name=description]').val(),
	chapters: Chapters
	}

	Meteor.call('post', post, function(error, id){
		if(error){
			return alert(error.reason);
		}
		console.log('yes');
		Router.go('postPage', {_id:id});
	});
	},


	'click .chapter':function(){
	added+=1
	chapter=added.toString();
	var adder = '<br><label class="control-label" for="chapter'+chapter+'">chapter '+chapter+'</label><br<br><div class="controls" id="chapter'+chapter+'"><input name="'+chapter+'" type="text" value="" class="form-control chapters" placeholder="Chapter title"></inputxt></div>';
	$(".col9").append(adder);
	var adder2= '<br><input type="file" id="file'+chapter+'" class="fileUploader" multiple>'
	$(".col-md-3").append(adder2);

},
'click .btn-primary':function(){
	
$(".btn-primary").attr("value","loading...");
},
});


/*
Template.postSubmit.events({
    'change .fileUploader': function (e) {
    	console.log('changed file');
        var files = e.target.files;
        for (var i = 0, f; f = files[i]; i++) {
        console.log('for loop file');
        var fileSubject = $("input[name='subject']").val();
        var fileGrade = $("input[grade='subject']").val();
        FilesFS.storeFile(f,{name:f.id ,userId:Meteor.user(), subject: fileSubject, grade: fileGrade});
    }
    }
});

*/