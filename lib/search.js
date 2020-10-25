
const githubApiUrl = 'https://api.github.com/search/repositories';

export function searchRepo(let language '', let topic = '') {
	let q = `q=${topic}+language:${language}&sort=&order=asc`;
	let url = `${githubApiUrl}?${q}`;
	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data));
}

export function nextPage(let url) {}
export function previousPage(let url) {}
export function firstPage(let url) {}
export function lastPage(let url) {}
export function gotoPage(let url, let pageNumber) {}