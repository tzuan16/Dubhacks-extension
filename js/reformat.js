window.addEventListener('load', function () {

	var element = document.getElementsByClassName('video-player');
	var videoDiv = document.getElementsByClassName('player-view')[0];
	var videoCoordinates = videoDiv.getBoundingClientRect();

	var f = document.createElement("form");
	f.setAttribute('method', "post");
	f.setAttribute('action', "submit.php");

	var i = document.createElement("input"); //input element, text
	i.setAttribute('id', "comment_text");
	i.setAttribute('type', "text");
	i.setAttribute('name', "username");

	var s = document.createElement("input"); //input element, Submit button
	s.setAttribute('id', "comment_button");
	s.setAttribute('type', "submit");
	s.setAttribute('value', "Submit");

	var b = document.createElement("button");
	b.setAttribute('id', "recording")
	b.innerHTML = "Record"

	f.appendChild(i);
	f.appendChild(s);
	f.appendChild(b)

	//and some more input elements here
	//and dont forget to add a submit button



	element[0].appendChild(f);

	$(f).css({
		position: 'absolute',
		'white-space': 'nowrap',
		height: '20px',
		left: videoCoordinates.left + 'px',
		top: videoCoordinates.bottom + 'px',
		cursor: 'pointer',
		'font-weight': '600',
		'font-size': '48',
		'z-index': '300000',
	});


	f.addEventListener('submit', handleSubmit);
	function handleSubmit(e) {
		writeDataToFireBase(document.getElementById('comment_text').value);
		e.preventDefault();
		document.getElementById('comment_text').value = ''
	}
})

