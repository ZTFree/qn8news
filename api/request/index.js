import {
	http
} from '@/api/http.js';

export const getNavData = () => {
	return http.request({
		url: 'https://ku.qingnian8.com/dataApi/news/navlist.php',
		method: 'GET'
	})

}

export const getNewsData = (cid, num, page) => {

	return http.request({
		url: 'https://ku.qingnian8.com/dataApi/news/newslist.php',
		method: 'GET',
		data: {
			cid,
			num,
			page
		}
	})

}
