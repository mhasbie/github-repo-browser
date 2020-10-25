import React from 'react';
import Head from 'next/head';

import { searchRepo } from '../lib/search';

class Home extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.search = this.search.bind(this);
		this.gotoPage = this.gotoPage.bind(this);
		this.updateLanguage = this.updateLanguage.bind(this);
		this.updateTopic = this.updateTopic.bind(this);
		
		this.state = {
			language: '',
			topic: '',
			searchResult: null,
			resultItems: []
		};
	}
	
	async search(e, pageUrl = '') {
		e.preventDefault();
		
		if (this.state.topic == '') {
			alert('Please enter search keyword for `Topic`.');
		}
		
		let result = await searchRepo(this.state.language, this.state.topic, pageUrl);
		let items = (result && result.data && result.data.items) ? result.data.items : [];
		
		this.setState({ searchResult: result, resultItems: items });
	}
	
	gotoPage(e) {
		e.preventDefault();
		
		let searchResult = this.state.searchResult;
		let pageUrl = searchResult.pagination[e.target.id];
		
		this.search(e, pageUrl);
	}
	
	updateLanguage(e) {
		this.setState({
			language: e.target.value
		});
	}
	
	updateTopic(e) {
		this.setState({
			topic: e.target.value
		});
	}
	
	renderSearchResult() {
		let searchResult = this.state.searchResult;
		let resultItems = this.state.resultItems;
		
		if (resultItems.length <= 0) {
			return (
				<div className="grid">
					<p>
						No result.
					</p>
				</div>
			);
		}
		
		let firstButton = searchResult.pagination['first'] ? '' : ''
		
		let resultCards = resultItems.map((item) => {
			return (
				<a key={item.id} href={item.html_url} className="card">
					<h3>{item.name}</h3>
					<p>
						{item.description}
					</p>
				</a>
			);
		});
		
		return (
			<div>
				<div className="grid">
					{ this.renderPagination() }
				</div>
				<div className="grid">
					
					{ resultCards }
				</div>
			</div>
		);
	}
	
	renderPagination() {
		let searchResult = this.state.searchResult;
		
		let firstButton = searchResult.pagination['first'] ? <input type="button" id="first" value="First" onClick={this.gotoPage} /> : '';
		let previousButton = searchResult.pagination['prev'] ? <input type="button" id="prev" value="Previous" onClick={this.gotoPage} /> : '';
		let nextButton = searchResult.pagination['next'] ? <input type="button" id="next" value="Next" onClick={this.gotoPage} /> : '';
		let lastButton = searchResult.pagination['last'] ? <input type="button" id="last" value="Last" onClick={this.gotoPage} /> : '';
		
		return (
			<span>
				{ firstButton }
				{ previousButton }
				{ nextButton }
				{ lastButton }
			</span>
		);
	}
	
	render() {
		return (
			<div className="container">
				<Head>
					<title>Search Github Repo</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<div className="main">
					<h1 className="title">
						Search Github Repo
					</h1>

					<p className="description">
						Enter your query below
					</p>

					<div className="grid">
						<div>
							<form className="form-horizontal">
								<p><label >Language</label></p>
								<p><input type="text" name="language" value={this.state.language} onChange={this.updateLanguage} /></p>
								<p><label >Topic</label></p>
								<p><input type="text" name="topic" value={this.state.topic} onChange={this.updateTopic} /></p>
								<p><input type="button" value="Search" onClick={this.search} /></p>
							</form>
						</div>
					</div>
					
					{ this.renderSearchResult() }
				</div>

				<div className="footer">
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered by{' '}
						<img src="/vercel.svg" alt="Vercel Logo" className="logo" />
					</a>
				</div>
			</div>
		)
	}
}

export default Home;
