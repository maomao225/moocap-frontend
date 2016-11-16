define(function(){
	return Backbone.Collection.extend({
		parse: function(response) {
		 	if(response){
		 		this.count = response.count;
		    	return response.results || [];
		 	}

		    return [];
		}
	});
});