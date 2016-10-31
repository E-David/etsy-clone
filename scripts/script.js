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
		return "https://openapi.etsy.com/v2/listings/" + 
			this._listingId + '.js'
	},
	_listingId: "",
	_shopId: "",
	parse: function(rawData){
		var parsedData = rawData.results[0]
		return parsedData
	}
})

//VIEW
var ListView = Backbone.View.extend({
	el: qs(".listings-container"),
	_render: function(){
		var items = this.collection.models
		var htmlString = ""

		if(items.length !== 0) {
			htmlString += "<div class='items-container'>"
			for(var i = 0; i < items.length; i++){
				var itemModel = items[i],
					listingId = itemModel.get("listing_id"),
					listingImage = itemModel.get("Images")[0].url_170x135

				htmlString += "<div class='details-container'>"
				htmlString += 	"<a href='#details/" + listingId +"'>"
				htmlString += 		"<img src='" + listingImage + "'>"	
				htmlString += 	"</a>"
				htmlString += "</div>"
			}
			htmlString += "</div>"
		} else {
			htmlString += "<p>There doesn't seem to be anything here.</p>"
		}
		this.el.innerHTML = htmlString

	},
	initialize: function(){
		this.collection.on("sync",this._render.bind(this))
	}
})

var DetailsView = Backbone.View.extend({
	el: qs(".listings-container"),
	_render: function(){
		var etsyModel = this.model,
			listingImage = etsyModel.get("Images")[0].url_170x135
		var htmlString = "<div class='details-container listing'>"
			htmlString += 	"<img src='" + listingImage + "'>"	
			htmlString += "</div>"
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

var showGif = function() {
	qs(".listings-container").innerHTML = "<img id='loading' src='./images/loading.gif'>"
}

//CONTROLLER

var Controller = Backbone.Router.extend({
	routes: {
		"home": "handleHome",
		"search/:query": "handleSearch",
		"details/:listingId": "handleDetails",
		"*default": "handleDefault"
	},
	handleHome: function() {
		var etsyCollection = new EtsyCollection()
		showGif()
		etsyCollection.fetch({
		    dataType: 'jsonp',
		    data: {
		    	"api_key": API_KEY,
		    	"includes": "Images,Shop"
	    	}
	    })

	    view = new ListView({
			collection: etsyCollection
		})
	},
	handleSearch: function(query) {
		var etsyCollection = new EtsyCollection()
		showGif()
		etsyCollection.fetch({
		    dataType: 'jsonp',
		    data: {
		    	"api_key": API_KEY,
		    	"tags": query,
		    	"includes": "Images,Shop"
	    	}
	    })

	   	view = new ListView({
			collection: etsyCollection
		})
	},
	handleDetails: function(_listingId){
		var etsyModel = new EtsyModel()
		etsyModel._listingId = _listingId

		showGif()
		etsyModel.fetch({
		    dataType: 'jsonp',
		    data: {
		    	"api_key": API_KEY,
		    	"includes": "Images,Shop"
		    }
	    })
		console.log(etsyModel.url())
	   	view = new DetailsView({
			model: etsyModel
		})
	},
	handleDefault: function() {
		location.hash = "home"
		showGif()
	},
	initialize: function(){
		Backbone.history.start()
	}
})

var controller = new Controller()