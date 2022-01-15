const BASEURL = "https://api-rubbiekelvin-portfolio.herokuapp.com"
// const BASEURL = "http://localhost:8000"
// const BASEURL = "http://192.168.43.153:8000"

const url = (path, params) => {
	const url_ = new URL(`${BASEURL}/${path}`)
	params = params || []
	params.forEach(item => {
		url_.searchParams.append(
			item.key,
			item.value
		)
	});
	return url_.toString()
}

export const get_projects = async () => {
	const response = await fetch(url("projects/", [
		{key: "max", value: "10"}
	]));

	const json = await response.json();

	return json;
}

export const one_project = async (id) => {
	const response = await fetch(url(`project/${id}/`));
	if (response.status == 404){
		return null;
	}

	const json = await response.json();
	return json;
}

export const analytic_ping = async (id) => {
	let device = window.localStorage.getItem('d')
	let params = []

	if (device){
		params.push({
			key: "d",
			value: device
		})
	}
	const url_ = url(`ping/${id}/`, params)
	const response = await fetch(url_, {method: 'post'})
	if (response.status !== 200 && response.status !== 404){
		if (response.status == 400){
			const err = await response.json();
			if (err.code === "DEVICE-ID-NOT-REGISTERED"){
				window.localStorage.removeItem('d');
			}
		}
		window.setTimeout(() => analytic_ping(id), 3000);
	}else if (response.status == 200){
		const json = await response.json()
		window.localStorage.setItem('d', json.device_id)
	}
}

export const send_mail = async (email, message) => {
	const headers = new Headers()
	headers.append("Content-Type", "application/json");

	const response = await fetch(
		url('mail/send/'),
		{method: 'post', body: JSON.stringify({email, message}), headers})
	return response.status == 204
}

// export const get_mails = async (page, token) => {
// 	page = page || 1
// 	const headers = new Headers()
// 	headers.append("Authorization", `Token ${token}`)
// 	const response = await fetch(url(`mail/all/?page=${page}&page_size=100`), {headers})

// 	return await response.json()
// }

// export const open_mail = async (mail_id, token) => {
// 	const headers = new Headers()
// 	headers.append("Authorization", `Token ${token}`)
// 	const response = await fetch(url(`mail/read/${mail_id}/`), {headers})
// 	if (response.status==200) return await response.json()
// 	return null
// }