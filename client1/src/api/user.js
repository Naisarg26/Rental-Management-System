export const register = async ({ username, email, password } = {}) => {
	const user = { username, email, password };

	try {
		const res = await fetch("http://localhost:8080/server1/users/Signup", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		return await res.json();
	} catch (err) {
		throw new Error(`Cannot register at this time. ${err}`);
	}
};

export const login = async ({ email, password } = {}) => {
	const user = { email, password };

	try {
		const res = await fetch("http://localhost:8080/server1/users/Login", {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		return await res.json();
	} catch (err) {
		throw new Error(`Cannot login at this time. ${err}`);
	}
};
export const logout = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/server1/users/logout`, {
			method: "GET",
			credentials: "include",
		});
		return await res.json();
	} catch (err) {
		console.log(err);
	}
};
export const getUser = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/server1/users/user`, {
			method: "GET",
			credentials: "include",
		});
		return await res.json();
	} catch (err) {
		throw new Error("Please login to continue");
	}
};