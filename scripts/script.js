var API_KEY = "nkpqut8g0cgqpmaixbpsw03c",
	qs = function(node){return document.querySelector(node)}

//url to get https://openapi.etsy.com/v2/listings/active?api_key={YOUR_API_KEY}

// MODEL

var EtsyCollection = Backbone.Collection.extend({
	url: "https://openapi.etsy.com/v2/listings/active.js",
	parse: function(rawData){
		var parsedData = rawData.results
		return parsedData
	}
})

var EtsyModel = Backbone.Model.extend({
	url: function() {
		return "https://openapi.etsy.com/v2/shops/listing/" + 
			this._listingId + '/active.js'
	},
	_listingId: ""
})

//VIEW
var ListView = Backbone.View.extend({
	el: qs(".items-container"),
	_render: function(){
		var items = this.collection.models
		var htmlString = ""

		htmlString += ""
		for(var i = 0; i < items.length; i++){
			var itemModel = items[i]
			console.log(itemModel)
			htmlString += "<div class='details-container"
			htmlString += 	"<p>" + itemModel.get("description") + "</p>"
			// htmlString += 	"<a href='#detail/'>Hello"
			// htmlString += 	"<h3>" + headline + "</h3>"
			// htmlString += 	"</a>"
			htmlString += "</div>"
		}

		this.el.innerHTML = htmlString

	},
	initialize: function(){
		this.collection.on("sync",this._render.bind(this))
	}
})

var DetailsView = Backbone.View.extend({
	el: document.querySelector(".items-container"),
	_render: function(){
		var etsyModel = this.model
		console.log(this)
		var htmlString = ""
		console.log(etsyModel)
		htmlString += "<p>" + etsyModel + "</p>"
		this.el.innerHTML = htmlString
	},
	initialize: function(){
		var boundRender = this._render.bind(this)
		this.model.on("sync", boundRender)
	}
})

var searchBar = qs(".search")

var doSearch = function(eventObject) {
	if(eventObject.keyCode === 13) {
		var inputNode = eventObject.target,
			query = inputNode.value

		location.hash = "search/" + query
		inputNode.value = ""
	}
}
searchBar.addEventListener("keydown", doSearch)

//CONTROLLER

var Controller = Backbone.Router.extend({
	routes: {
		"home": "handleHome",
		"search/:query": "handleSearch",
		"details/:id": "handleDetails",
		"*default": "handleDefault"
	},
	handleHome: function() {
		var etsyCollection = new EtsyCollection()
		etsyCollection.fetch({
		    dataType: 'jsonp',
		    data: {
		    	"api_key": API_KEY
	    	}
	    })

	    view = new ListView({
			collection: etsyCollection
		})
	},
	handleSearch: function(query) {
		var etsyCollection = new EtsyCollection()
		etsyCollection.fetch({
		    dataType: 'jsonp',
		    data: {
		    	"api_key": API_KEY,
		    	"tags": query
	    	}
	    })

	   	view = new ListView({
			collection: etsyCollection
		})
	},
	handleDetails: function(_listingId){
		var etsyModel = new EtsyModel()
		etsyModel._listingId = _listingId

		etsyModel.fetch({
		    dataType: 'jsonp',
		    data: {
		    	"api_key": API_KEY
		    }
	    })
		console.log(etsyModel.url())
	   	view = new DetailsView({
			model: etsyModel
		})
	},
	handleDefault: function() {
		location.hash = "home"
	},
	initialize: function(){
		Backbone.history.start()
	}
})

var controller = new Controller()