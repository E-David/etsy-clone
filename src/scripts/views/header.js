import React from "react"

var Header = React.createClass({
	_doSearch: function(eventObject) {
			var inputNode = document.querySelector(".search"),
				query = inputNode.value

			location.hash = "search/" + query
			inputNode.value = ""
	},
	render: function() {
		return (
			<header>
				<a href="#home">Etsy</a>
				<input className="search" placeholder="What are you shopping for?" />
				<input className="search-button" type="button" value="Search" onClick={this._doSearch} />
			</header>
			)
	}
})

export default Header