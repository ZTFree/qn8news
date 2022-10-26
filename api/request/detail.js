import {
	http
} from '@/api/http.js';

export const getDetail = (newsMsg) => {

	return http.request({
		url: "https://ku.qingnian8.com/dataApi/news/detail.php",
		data: newsMsg
	})
}
