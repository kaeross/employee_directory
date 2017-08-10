
const $userCards = $('.user');
let newPerson;

//Get new contact data from random user generator api
//function getContact(card) {
	$.ajax({
		url: 'https://randomuser.me/api/?results=12',
		dataType: 'json',
		//if successful store relevent data about user
		success: function(data) {
			console.log(data);
			newPerson = data;
			return newPerson;			
		}
	});


//}

//function to get data and store in object
function getPersonData() {
	const personResults = newPerson.results[0];
	const personData = {
		name: personResults.name.first + ' ' + personResults.name.last,
		email: personResults.email,
		city: personResults.location.city,
		phone: personResults.phone,
		avatar: personResults.picture.large,
		address: personResults.location.street + ', ' + personResults.location.postcode
	}
	return personData;
}

//create person
function Person(name, email, city, phone, avatar, address){
	this.name = name;
	this.email = email;
	this.city = city;
	this.phone = phone;
	this.avatar = avatar;
	this.address = address;
};

//write contact to user card
Person.prototype.writeUserCard = function(card){
	const $avatarHTML = $('> .avatar', card);
	const $phoneHTML = $('> div > .phone', card);
	const $cityHTML = $('> div > .location', card);
	const $addressHTML = $('> div > .address', card);
	const $emailHTML = $('> div > .email', card);
	const $nameHTML = $('> div > .name', card);

	$avatarHTML.attr('src', this.avatar);
	$phoneHTML.html(this.phone);
	$cityHTML.html(this.city);
	$addressHTML.html(this.address);
	$emailHTML.html(this.email);
	$nameHTML.html(this.name);
};
//create newPerson and add content to user card
var getPerson = new Person(getPersonData().name, getPersonData().email, getPersonData().city, getPersonData().phone, getPersonData().avatar, getPersonData().address)
getPerson.writeUserCard(card);

function writeEachCard() {
	for (let i = 0; i < $userCards.length; i++) {
		getContact($userCards[i]);
	}
}



