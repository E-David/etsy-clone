var API_KEY = "nkpqut8g0cgqpmaixbpsw03c"

//url to get https://openapi.etsy.com/v2/listings/active?api_key={YOUR_API_KEY}
var base_url = "https://openapi.etsy.com/v2/listings/active"

var EtsyModel = Backbone.Model.extend({
	url: "https://openapi.etsy.com/v2/listings/active.js"
})

// MODEL

//VIEW

//CONTROLLER

var Controller = Backbone.Router.extend({
	routes: {
		"home": "handleHome",
		"*default": "handleDefault"
	},
	handleHome: function() {
		var etsyModel = new EtsyModel()
		etsyModel.fetch({
		    dataType: 'jsonp',
		    data: {
		    	"api_key": API_KEY
	    	}
	    })
	    console.log(etsyModel)
	},
	handleDefault: function() {
		location.hash = "home"
	},
	initialize: function(){
		Backbone.history.start()
	}
})

var controller = new Controller()