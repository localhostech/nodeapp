var socket = io.connect('http://localhost:3000');
socket.on('newmsg', function(data) {
	var date = new Date();
	console.log(data);
     $('.chat-messages').append('<div class="message-item"><div class="username">'+data.username+
				'</div><div class="text">'+data.text+'</div><div class="date">'
				+date.getHours()+':'+(date.getMinutes()<10?'0':'') + date.getMinutes()+'</div></div>');
     $(".chat-messages").animate({ scrollTop: $('.chat-messages').prop("scrollHeight")}, 300);
 });
	$(".chat-messages").animate({ scrollTop: $('.chat-messages').prop("scrollHeight")}, 300);
socket.on('newtotal', function(data) {
	$('.total-online').text(data);
 });
$(function() {
	$('#messageForm').on('submit', function() {
		var text = $(this).find('.chat-input').val();
		var username = $(this).find('button').data('user');
		var date = new Date();
		if (text.length > 0) {
			$.post('/send', {text:text}, function() {
				console.log('Sent!');
			});
			socket.emit('messages', {text: text, username: username});
			$('.chat-messages').append('<div class="message-item"><div class="username">'+username+
				'</div><div class="text">'+text+'</div><div class="date">'
				+date.getHours()+':'+(date.getMinutes()<10?'0':'') + date.getMinutes()+'</div></div>');

			$(".chat-messages").animate({ scrollTop: $('.chat-messages').prop("scrollHeight")}, 300);

			$(this).find('.chat-input').val('');
		}
		return false;
	});
	$('#regForm').on('submit', function() {
		var form = $(this);
		$.ajax( {
	      type: "POST",
	      url: form.attr('action'),
	      data: form.serialize(),
	      success: function( response ) {
	        console.log( response );
	        if (!response.result.success) {
	        	form.find('.status-line').text('Возникла ошибка!');
	        } else {
	        	window.location.reload();
	        }
	      },
	      error: function() {
	      	form.find('.status-line').text('Возникла ошибка!');
	      	console.log('Error');
	      }
	    });
	    return false;
	});
	$('#loginForm').on('submit', function() {
		var form = $(this);
		$.ajax( {
	      type: "POST",
	      url: form.attr('action'),
	      data: form.serialize(),
	      success: function( response ) {
	        console.log( response );
	        if (!response.result.success) {
	        	form.find('.status-line').text('Возникла ошибка!');
	        } else {
	        	window.location.reload();
	        }
	      },
	      error: function() {
	      	form.find('.status-line').text('Возникла ошибка!');
	      	console.log('Error');
	      }
	    });
	    return false;
	});
})