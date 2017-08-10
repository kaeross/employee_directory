const $userCards = $('.user');
let newPerson;

$userCards.hide();

/***********************************************************
	Get Data from API and store relevent contact details
***********************************************************/

//function to get data and store in object
function getPersonData(i) {
	const personResults = newPerson.results[i];
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

//writes each user to each card
function writeEachCard() {
	//write contact to user card
	function writeUserCard(num){
		const $avatarHTML = $('> .avatar', $userCards[num]);
		const $phoneHTML = $('> div > .phone', $userCards[num]);
		const $cityHTML = $('> div > .location', $userCards[num]);
		const $addressHTML = $('> div > .address', $userCards[num]);
		const $emailHTML = $('> div > .email', $userCards[num]);
		const $nameHTML = $('> div > .name', $userCards[num]);

		$avatarHTML.attr('src', getPersonData(num).avatar);
		$phoneHTML.html(getPersonData(num).phone);
		$cityHTML.html(getPersonData(num).city).css('textTransform', 'capitalize');
		$addressHTML.html(getPersonData(num).address).css('textTransform', 'capitalize');
		$emailHTML.html(getPersonData(num).email);
		$nameHTML.html(getPersonData(num).name).css('textTransform', 'capitalize');

		$userCards.show();
	}

	for (let i = 0; i < $userCards.length; i++) {
		writeUserCard(i);
	}
}

//Ajax request to get new contact data from random user generator api
$.ajax({
	url: 'https://randomuser.me/api/?results=12',
	dataType: 'json',
	//if successful store relevent data about user
	success: function(data) {
		console.log(data);
		newPerson = data;
		writeEachCard();			
	}
});

/***********************************************************
	Get Data from API and store relevent contact details
***********************************************************/
