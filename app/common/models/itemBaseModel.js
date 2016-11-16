define(function(){
	return Backbone.Model.extend({

		initialize: function(){
			this.on('invalid', function(model, error){
				alert(error);
			});

			this.on('error', function(model, error){
				var response = error.responseText;
				try{
					response = JSON.parse(response);
					if(response && response.error_code !== undefined){
						alert(response.message);
					}else{
						alert(response);
					}
				}catch(e){
					alert(response);
				}
			});
		},

		validate: function(response, options){
			if(response && response.error_code !== undefined){
				return response.message;
			}
		}
	});
});