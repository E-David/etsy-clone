import React from "react"
import Header from "./header.js"

var ListView = React.createClass({
	render: function() {
		return (
			<div className="list-view">
				<Header />
				<ListingsContainer collection={this.props.collection}/>
			</div>
			)
	}
})

var ListingsContainer = React.createClass({
	_makeListings: function() {
		var jsxArr = [],
			etsyModels = this.props.collection.models

		for(var i =0; i < etsyModels.length; i++){
			var etsyModel = etsyModels[i]
			jsxArr.push(<Listing model={etsyModel} />)
		}
		if(jsxArr.length === 0){
			return <h2>No items found.</h2>
		} else {
			return jsxArr;
		}
	},
	render: function() {
		return (
			<div className="listings-container">
				{
					this._makeListings()
				}
			</div>
			)
	}
})

var Listing = React.createClass({
	_getDetailsUrl: function(){
		var model = this.props.model, 
			listingId = model.get("listing_id")

		return "#details/" +  listingId
	},
	_getListingImage: function() {
		if(this.props.model.get("MainImage").url_170x135) {
			return this.props.model.get("MainImage").url_170x135
		} else {
			return "google.com"
		}
	},
	render: function() {
		return (
			<div className="listing">
				<a href={this._getDetailsUrl()}>
					<img src={this._getListingImage()} />
				</a>
				<ListingDetails model={this.props.model}/>
			</div>
			)
	}
})

var ListingDetails = React.createClass({
	render: function() {
		var model = this.props.model
		return (
			<div className="listing-details">
				<p>{model.get("title").slice(0,25) + "..."}</p>
				<Details model={this.props.model}/>
			</div>
			)
	}
})

var Details = React.createClass({
	render: function() {
		var model = this.props.model
		return (
			<div className="details">
				<span>{model.get("Shop").shop_name}</span>
				<span>{"$" + model.get("price")}</span>
			</div>)
	}
})

export default ListView