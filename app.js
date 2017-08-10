function getPersonData(newPerson) {
	const personResults = newPerson.results[0];
	const personData = {
		firstName: personResults.name.first,
		lastName: personResults.name.last,
		email: personResults.email,
		city: personResults.location.city,
		phone: personResults.phone
	}
	return personData;
}

function getNewPerson() {
	$.ajax({
		url: 'https://randomuser.me/api/',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			const newPersonData = data;
			getPersonData(newPersonData);
		}
	});
}



function Person(firstName, lastName, email, city, phone){
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.city = city;
	this.phone = phone;

};

var firstPerson = new Person(getPersonData().firstName, getPersonData().lastName, getPersonData().email, getPersonData().city, getPersonData().phone);