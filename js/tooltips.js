/*
 * ValidCake Application tooltip logic
 * http://validcake.com/
 *
 * Copyright (c) 2009-2010 Trevor S. Gau
 *
 * Date: 2009-12-30 01:06:16 -0600 (Wed, 30 Dec 2009)
 */

var tooltips = 
{
	'defaultOptions': 
	{
		'selector': '#defaultOptions',
		'text': 'Check this box if you want the output to include all possible options for each rule, even if the chosen value is the default.'
	},
	'numTabs':
	{
		'selector': '#numTabs',
		'text': 'Indicate the number of tabs to indent the array (Should be <em>one</em> in mose cases).'
	},
	'luhn':
	{
		'selector': '.luhn',
		'text': 'The Luhn algorithm is a simple checksum formula used to validate a variety of identification numbers, including credit card numbers. For information about how this algorithm works, click the tooltip link to visit the Wikipedia article.'
	}
};
var applyTooltips = function()
{
	for (var i in tooltips)
	{
		var tip = tooltips[i];
		var addedTip;
		$(tip.selector+'Anchor').hover(function(e)
		{
			var tipKey; 
			var targetId;
			if (e.target.id == '') targetId = 'doesNotExist';
			else targetId = e.target.id;
			if ($('#'+targetId).get(0) == undefined)
				tipKey = e.target.className.substr(0,e.target.className.length-6);
			else
				tipKey = e.target.id.substr(0,e.target.id.length-6);
			var tipP = $('<p></p>').append(tooltips[tipKey]['text']);
			addedTip = $('<div></div>').append(tipP).addClass('tooltip').fadeIn('fast');
			$('#tips').append(addedTip);
			var height = $(addedTip).height();
			addedTip.css({'top': (e.pageY-height-30)+'px', 'left': e.pageX+'px'});
			
		}, function(e)
		{
			addedTip.fadeOut('fast', function() { $(this).remove(); });
		});
	}
	$('a[rel="external"]').attr({'target': '_blank'});
};
$(function()
{
	applyTooltips();
});