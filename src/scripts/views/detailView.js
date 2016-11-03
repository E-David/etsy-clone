import React from "react"
import Header from "./header.js"

var DetailView = React.createClass({
	render: function() {
		return (
			<div className="detail-view">
				<Header />
				<ListingContainer model={this.props.model}/>
			</div>
			)
	}
})

var ListingContainer = React.createClass({
	render: function() {
		console.log(this)
		return (
			<div className="listing-container">
				<ListingLeftCol model={this.props.model}/>
				<ListingRightCol model={this.props.model}/>
			</div>
			)
	}
})

var ListingLeftCol = React.createClass({
	_getListingImage: function() {
		return this.props.model.get("MainImage").url_570xN
	},
	render: function() {
		return (
			<div className="listing-left-col">
				<img src={this._getListingImage()} />
				<p>{this.props.model.get("description")}</p>
			</div>
			)
	}
})

var ListingRightCol = React.createClass({
	render: function() {
		var model = this.props.model
		return (
			<div className="listing-right-col">
				<h3>{model.get("title")}</h3>
				<p>{"$" + model.get("price")}</p>
				<ul className="overview">
					<li>Overview</li>
					{model.get("who_made") === "i_did" ? <li>Handmade item</li> : ""}
					{model.get("materials").length > 0 ? (model.get("materials").length > 1 ? <li>Materials: {model.get("materials").join(", ")}</li> : <li>Material: {model.get("materials")}</li>) : "" }
					<li>Viewed by: {model.get("views") + (model.get("views") === "1" ? " person" : " people")}</li>
					<li>Favorited by: {model.get("num_favorers") + (model.get("views") === "1" ? " person" : " people")}</li>
				</ul>
			</div>
			)
	}
})

export default DetailView