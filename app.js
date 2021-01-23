/* **********************************************
--------------- Create Container ----------------
********************************************** */
$('<div>').attr('id', 'container').appendTo('body');

/* **********************************************
------------------ Create Form ------------------
********************************************** */

// create movieform and append to container
$('<form>').attr('id', 'movieform').appendTo($('#container'));

// create titlelabel and titleinput and append to movieform
$('<h2>',{text:'Movie Ratings'}).appendTo('#movieform')

$('<label>', { text: 'Title:' }).attr({ id: 'titlelabel', for: 'titleinput' }).appendTo($('#movieform'));

$('<input>').attr({id:'titleinput',placeholder:'what are you watching?'}).appendTo($('#titlelabel'));

// create ratinglabel, ratinginput, and ratingresult and append to movieform
$('<div>').attr('id', 'ratingdiv').appendTo('#movieform');

$('<label>', { text: 'Rating:' })
	.attr({ id: 'ratinglabel', for: 'ratinginput' })
	.appendTo($('#ratingdiv'));

$('<input>')
	.attr({ id: 'ratinginput', type: 'range', min: 0, max: 10 }).on('change',function(){
		$('#ratingp').text($('#ratinginput').val())
	})
	.appendTo($('#ratingdiv'));

$('<div>').attr('id', 'ratingresult').appendTo($('#ratingdiv'));
$('<p>').attr('id','ratingp').appendTo('#ratingresult')

// create addbutton and append to movieform
$('<button>', { text: 'Add Movie Rating' }).attr('id', 'addbutton').appendTo($('#movieform')).on('click', function(e) {
	e.preventDefault();
	addRatingToList();
});

/* **********************************************
------------------ Create List ------------------
********************************************** */

createListDiv=()=>{
	// create div, title, and ul for submitted movie ratings and append to container
	$('<div>').attr('id', 'listdiv').appendTo('#container');

	$('<h2>', { text: 'My Ratings' }).attr('id', 'listh2').appendTo('#listdiv');

	$('<ul>').attr('id', 'listul').appendTo('#listdiv');
}

/* **********************************************
--------------- Adding lis to ul ----------------
********************************************** */
addRatingToList = () => {
	// show alert if title input is less than 2 characters long
	if ($('#titleinput').val().length<2) {
		alert("Title must be at least 2 characters long.")
		return
	}

	// use inputs to create li
	const title = $('#titleinput').val();
	const rating = $('#ratinginput').val();
	createNewLi(title, rating);

	// clear inputs
	clearMovieInputs();
};

createNewLi = (title, rating) => {
	const newLi = $('<li>'); // create li
	newLi.text(title + ': ' + rating).appendTo($('#listul')); // add text to li and append to list
	newLi.append(createRemoveButton()); // append remove button to li
};

createRemoveButton = () => {
	return $('<button>', { text: 'X' }).addClass('removebutton').on('click', function(e) {
		$(e.target).parent().remove();
	});
};

clearMovieInputs = () => {
	$('#titleinput').val('');
	$('#ratinginput').val(5);
	$('#ratingp').text('5');
};

/* **********************************************
--------------- When DOM is Ready ---------------
********************************************** */

$(function () {
	$('#ratinginput').val(5);
	$('#ratingp').text('5')
	createListDiv()
})