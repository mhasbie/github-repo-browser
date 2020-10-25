
const githubApiUrl = 'https://api.github.com/search/repositories';

export function searchRepo(language = '', topic = '') {
	let q = `q=${topic}+language:${language}&sort=&order=asc`;
	let url = `${githubApiUrl}?${q}`;
	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data));
}

export function nextPage(url) {}
export function previousPage(url) {}
export function firstPage(url) {}
export function lastPage(url) {}
export function gotoPage(url, pageNumber) {}