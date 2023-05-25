function getAge(dateString) {
	const today = new Date();
	const birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	let d = today.getDate() - birthDate.getDate();

	if (m < 0 || (m === 0 && d < 0)) {
		age--;
		m += 12;
	}
	if (d < 0) {
		m -= 1;
		d = 30 + d;
	}

	return `${age}, ${m}, ${d}`;
}

console.log(getAge("1997/01/12"));
