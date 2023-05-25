const inputs = document.querySelectorAll("input");
const h1Year = document.querySelector("#h1-year");
const h1Month = document.querySelector("#h1-month");
const h1Day = document.querySelector("#h1-day");
const form = document.querySelector("form");
const error = document.querySelectorAll(".error");
const label = document.querySelectorAll("label");

const date = new Date();
const yearAtual = date.getFullYear();
const dayAtual = date.getDate();
const monthAtual = date.getMonth() + 1;

let day = 0;
let month = 0;
let year = 0;
let cont = 0;

form.addEventListener("submit", (event) => {
	event.preventDefault();
	day = parseInt(inputs[0].value);
	month = parseInt(inputs[1].value);
	year = parseInt(inputs[2].value);

	if (!fieldEmpty()) return;
	if (!fieldsInvalid()) return;
	if (!trintaDays()) return;

	let dados = [];

	getAge(day, month, year)
		.split(",")
		.forEach((item) => {
			dados.push(item.trim());
		});

	h1Year.innerHTML = `<span>${dados[0]}</span> years`;
	h1Month.innerHTML = `<span>${dados[1]}</span> months`;
	h1Day.innerHTML = `<span>${dados[2]}</span> days`;
	wipeData();
});

const fieldEmpty = () => {
	cont = 0;
	for (let i = 0; i < inputs.length; i++)
		if (!inputs[i].value) {
			error[i].textContent = "This field is required";
			inputs[i].style.border = "1px solid var(--light-red)";
			label[i].style.color = "var(--light-red)";
			cont++;
			continue;
		} else {
			error[i].textContent = "";
			inputs[i].style.border = "2px solid var(--light-grey)";
			label[i].style.color = "var(--smokey-grey)";

			continue;
		}
	return cont == 0;
};

const fieldsInvalid = () => {
	cont = 0;
	if (day > 31 || day < 1) {
		error[0].textContent = "Must be a valid day";
		cont++;
	}
	if (month > 12 || month < 1) {
		error[1].textContent = "Must be a valid month";
		cont++;
	}
	if (year > yearAtual) {
		error[2].textContent = "Must be in the past";
		cont++;
	}
	if (year === yearAtual && month > monthAtual) {
		error[0].textContent = "Must be a valid day";
		error[1].textContent = "Must be a valid month";
		cont++;
	}
	if (year === yearAtual && month === monthAtual) {
		if (day > dayAtual) {
			error[0].textContent = "Must be a valid day";
			cont++;
		}
	}
	return cont === 0;
};

const trintaDays = () => {
	const monthTrintaDays = [4, 6, 9, 11];
	for (let item of monthTrintaDays) {
		if (item === month) {
			if (day >= 31) {
				error[0].textContent = "Must be a valid date";
			} else {
				error[0].textContent = "";
			}
			return day < 31;
		}
	}
	return true;
};

const wipeData = () => {
	inputs.forEach((item) => (item.value = ""));
	error.forEach((item) => {
		item.textContent = "";
	});
};

function getAge(day, month, year) {
	const dateString = `${year}/${month}/${day}`;
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

	return `${age},${m},${d}`;
}
