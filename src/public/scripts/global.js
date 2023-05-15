document.documentElement.classList.add('js-enabled')

var socket = io()

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	if (input.value) {
		const payload = { user: socket.id, message: input.value }
		socket.emit('chat', payload)
		input.value = ''
	}
});

socket.on('chat', (chat) => {
	const list = document.getElementById('messages');
	const htmlString = `
		<li class="message message--${chat.user === socket.id ? 'send' : 'recieved'}">
			<span class="message__content">${chat.message}</span>
		</li>
	`
	messages.insertAdjacentHTML('beforeend', htmlString)
	list.scrollTo(0, list.scrollHeight)
});