
const githubApiUrl = 'https://api.github.com/search/repositories';

export async function searchRepo(language = '', topic = '', url = '') {
	let q = `q=${topic}+language:${language}&sort=&order=asc`;
	let apiUrl = (url == '') ? `${githubApiUrl}?${q}` : url;
	let response = await fetch(apiUrl);
	
	console.log(response);
	
	let headerLinks = response.headers.get('link');
	let links = headerLinks.split(',');
	let paginationLinks = {};
	
	links.forEach((link) => {
		let linkComponent = link.trim().split(';');
		
		let label = linkComponent[1].replace('rel="', '').replace('"', '').trim();
		let linkUrl = linkComponent[0].substring(1, linkComponent[0].length-1).trim();
		
		paginationLinks[label] = linkUrl;
	});	
	
	let data = await response.json();
	let result = {
		data: data,
		pagination: paginationLinks
	};
	return result;
}

export function nextPage(url) {}
export function previousPage(url) {}
export function firstPage(url) {}
export function lastPage(url) {}
export function gotoPage(url, pageNumber) {}