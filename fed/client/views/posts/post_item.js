helpers = ({

	date: function(){
	time=new Date(this.submitted);
	months=['January ','February ','March ','April ','May' ,'June ','July ','August ','September ','October ','November ','December '];
	date=time.getDate().toString();
	month=months[time.getMonth()];
	year=time.getFullYear().toString();
	return month.concat(date,', ',year);	
	},
	allowedToEdit: function(){
		return this.userId == Meteor.userId();
	},
	FBurl: function(){
		return document.URL;
	}

});

 Template.postItem.helpers(helpers);
 Template.postItemPage.helpers(helpers);


