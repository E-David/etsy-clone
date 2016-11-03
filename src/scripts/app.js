import React from "react"
import ReactDOM from "react-dom"
import Backbone from "backbone"
import ListView from "./views/listView.js"
import DetailView from "./views/detailView.js"


var app = function() {
	
	// MODEL

	var EtsyCollection = Backbone.Collection.extend({
		url: "https://openapi.etsy.com/v2/listings/active.js",
		_apiKey: "nkpqut8g0cgqpmaixbpsw03c",
		parse: function(rawData){
			var parsedData = rawData.results
			return parsedData
		}
	})

	var EtsyModel = Backbone.Model.extend({
		url: function() {
			return "https://openapi.etsy.com/v2/listings/" + this._listingId + ".js"
		},
		_apiKey: "nkpqut8g0cgqpmaixbpsw03c",
		_listingId: "",
		parse: function(rawData){
			var parsedData = rawData.results[0]
			return parsedData
		}
	})

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
			// showGif()
			etsyCollection.fetch({
			    dataType: 'jsonp',
			    data: {
			    	"api_key": etsyCollection._apiKey,
			    	"includes": "MainImage,Shop"
		    	}
	    	}).then(function(){
				ReactDOM.render(<ListView collection={etsyCollection} />, document.querySelector(".container"))
			})
		},
		handleSearch: function(query) {
			var etsyCollection = new EtsyCollection()
			// showGif()
			etsyCollection.fetch({
			    dataType: 'jsonp',
			    data: {
			    	"api_key": etsyCollection._apiKey,
			    	"tags": query,
			    	"includes": "MainImage,Shop"
		    	}
		    }).then(function(){
				ReactDOM.render(<ListView collection={etsyCollection} />, document.querySelector(".container"))
			})
		},
		handleDetails: function(_listingId){
			var etsyModel = new EtsyModel()
			etsyModel._listingId = _listingId

			// showGif()
			etsyModel.fetch({
			    dataType: 'jsonp',
			    data: {
			    	"api_key": etsyModel._apiKey,
			    	"includes": "MainImage,Shop"
			    }
		    }).then(function(){
		    	ReactDOM.render(<DetailView model={etsyModel} />, document.querySelector(".container"))
			})
		},
		handleDefault: function() {
			location.hash = "home"
			// showGif()
		},
		initialize: function(){
			Backbone.history.start()
		}
	})
	var controller = new Controller()
}
app()