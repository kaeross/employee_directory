const $userCards = $('.user');
const $userModal = $('.user-modal');
var currentUserIndex;
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
		address: personResults.location.street + ', ' + personResults.location.state + ' ' + personResults.location.postcode,
		dob: personResults.dob,
		user: personResults.login.username
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
		const $usernameHTML = $('> div > .username', $userCards[num]);
		const $dobHTML = $('> div > .dob', $userCards[num]);

		$avatarHTML.attr('src', getPersonData(num).avatar);
		$phoneHTML.html(getPersonData(num).phone);
		$cityHTML.html(getPersonData(num).city).css('textTransform', 'capitalize');
		$addressHTML.html(getPersonData(num).address).css('textTransform', 'capitalize');
		$emailHTML.html(getPersonData(num).email);
		$dobHTML.html('Birthday: ' + getPersonData(num).dob);
		$usernameHTML.html('User: ' + getPersonData(num).user);
		$nameHTML.html(getPersonData(num).name).css('textTransform', 'capitalize');

		$userCards.show();
	}
	//create modal window for user card
	function createUserModal(num) {
		
		const phone = $('> div > .phone', $userModal.eq(num));
		//get inner HTML of Target
		const $userModalHTML = $userCards.eq(num).html();
		//set as HTML of $userModal
		$userModal.eq(num).html($userModalHTML);
		//add hr above phone
	}
	for (let i = 0; i < $userCards.length; i++) {
		writeUserCard(i);
		createUserModal(i);
	}
}

/***********************************************************
	Flick between modal windows
	***********************************************************/
$('div.user').featherlightGallery({
		previousIcon: '«',
		nextIcon: '»',
		galleryFadeIn: 300,

		openSpeed: 300
});

/***********************************************************
	Search box and function
***********************************************************/

//Append search input to header
function searchBox() {
	let searchHTML = '<div class="user-search">';
	searchHTML += '<input placeholder="Search for users">';
	searchHTML += '</div>';

	return searchHTML;
}
$('.page-header').append(searchBox());


function notFound() {
	let notFoundText = '<div class="not-found"><h4>No users match your query... Please try again</h4><button class="not-found-button">See all users</button></div>';
	return notFoundText;
}

//Add search function
function searchList() {
	//clear matched if searchList has already been called
	let matched = [];
	//obtain value of search input
	const searchInput = $('.user-search > input');
	let searchInputVal = searchInput.val().toUpperCase();

	//if search has already been performed and no results, remove .not-found so does not show twice
	if ($('.not-found').is(":visible")) {
		$('.not-found').remove();
	}

	// Check if each user name contains search query
	$userCards.each( function() {
		var $nameHTML = $('> div > .name', this);
		var $usernameHTML = $('> div > .name', this);
		if( $nameHTML.text().toUpperCase().indexOf(searchInputVal) > -1 || $usernameHTML.text().toUpperCase().indexOf(searchInputVal) > -1 ) {
			// add this user to list of “matched” student
			matched.push(this);
		} 
	});

	// if not found display message
	if (matched.length === 0) {
		$userCards.hide();
		$('.page-header').append(notFound);
		const notFoundButton = $('.not-found-button');
		notFoundButton.on('click', function() {
			console.log('click click');
			$userCards.show();
			$('.not-found').remove();
		});
		$('.not-found').css({'margin': '2em', 'text-align': 'center', 'font-size': '1em','padding': '3em 0'});
		searchInput.val('');
	} else {
		//show only matched users
		$userCards.hide();
		$(matched).show();
	}
}

/***********************************************************
	Run Ajax request and then call functions
	***********************************************************/
	
//Ajax request to get new contact data from random user generator api
$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=gb,us,dk,fr,nz',
	dataType: 'json',
	//if successful store relevent data about user
	success: function(data) {
		console.log(data);
		newPerson = data;
		writeEachCard();
		$('.user-search > input').on('keyup keypress', searchList);			
	}
});
