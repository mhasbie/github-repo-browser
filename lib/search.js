
const githubApiUrl = 'https://api.github.com/search/repositories';

export async function searchRepo(language = '', topic = '', url = '') {
	let qParam = [];
	
	if (topic != '') {
		qParam.push(topic);
	}
	if (language != '') {
		qParam.push(`language:${language}`);
	}
	
	let q = `q=${qParam.join('+')}`;
	let apiUrl = (url == '') ? `${githubApiUrl}?${q}&sort=&order=asc` : url;
	
	let response = await fetch(apiUrl);
	
	let headerLinks = response.headers.get('link');
	let links = headerLinks ? headerLinks.split(',') : [];
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