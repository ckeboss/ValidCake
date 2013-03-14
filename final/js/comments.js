var catchAllMessage = 'There was an error loading your comments. Blame it on Sonny.';
$(function()
{
	$.get('getComments.php', {}, function(json, textStatus)
	{
		if (textStatus == 'success')
		{
			if(json['status'] == 'success')
			{
				$c = $('#comments_area');
				$.each(json['data'], function(index, value)
				{
					$chalupa = makeComment(value);
					$c.append($chalupa);
				});
			}
			else
			{
				if (json['message'] != undefined)
					alert(json['message']);
				else alert(catchAllMessage);
			}
		}
		else alert(catchAllMessage);
	}, 'json');
	$('#addCommentForm').submit(function(e)
	{
		var data = {name: $('#commentName').val(), email: $('#commentEmail').val(), comment: $('#commentComment').val()};
		$.post('addComment.php', data, function(json, textStatus)
		{
			if (textStatus == 'success')
			{
				if (json['status'] == 'success')
				{
					$comment = makeComment(json['data']);
					$('#comments_area').prepend($comment.hide().fadeIn(1200));
					$('#commentName,#commentEmail,#commentComment').val('');
					$('#commentAdded').show().fadeOut(5000);
				}
				else
				{
					//validation problems
					if (json['data'].constructor == Object)
					{
						$.each(json['data'], function(index, value)
						{
							$('#'+index+'Msg').html(value);
						});
					}
					else
					{
						if (json['message'] != undefined)
							alert(json['message']);
						else alert(catchAllMessage);
					}
				}
			}
			else alert(catchAllMessage);
		}, 'json');
		return false;
	});
	$('#commentComment').keypress(function()
	{
		$('#commentMsg').text(255 - $('#commentComment').val().length + '');
	});
	$('#commentEmail').focus(function()
	{
		$(this).css({'backgroundImage': 'none'});
	}).blur(function()
	{
		if ($(this).val() == '')
		{
			//alert('test');
			$(this).css({'backgroundImage': 'url(images/gravatar-enabled.png)'});
		}
			
	});
});

var makeComment = function(data)
{
	$name    = $('<div></div>').addClass('commentName').append(data['name']);
	if (data['gravatar_url'] != undefined && data['gravatar_url'] != '')
		$name.append($('<img />').attr({'src': data['gravatar_url']}).css({'float': 'right'}));
	$email   = $('<div></div>').addClass('commentEmail').append(data['email']);
	$comment = $('<div></div>').addClass('commentComment').append(data['comment']);
	$created = $('<div></div>').addClass('commentCreated').append(data['created']);
	$chalupa = $('<div></div>').addClass('commentContainer').append($name).append($email).append($comment).append($created);
	return $chalupa;
};