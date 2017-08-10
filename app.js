const $avatarHTML = $('.avatar');
const $phoneHTML = $('.phone');
const $cityHTML = $('.location');
const $addressHTML = $('.address');
const $emailHTML = $('.email');
const $nameHTML = $('.name');


function Person(name, email, city, phone, avatar, address){
	this.name = name;
	this.email = email;
	this.city = city;
	this.phone = phone;
	this.avatar = avatar;
	this.address = address;
};

Person.prototype.writeUserCard = function(){
	$avatarHTML.attr('src', this.avatar);
	$phoneHTML.html(this.phone);
	$cityHTML.html(this.city);
	$addressHTML.html(this.address);
	$emailHTML.html(this.email);
	$nameHTML.html(this.name);
};

function getContact() {
	$.ajax({
		url: 'https://randomuser.me/api/',
		dataType: 'json',
		success: function(data) {
			console.log('success');
			const newPerson = data;

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
			var firstPerson = new Person(getPersonData().name, getPersonData().email, getPersonData().city, getPersonData().phone, getPersonData().avatar, getPersonData().address)

			firstPerson.writeUserCard();
		}
	});
}




