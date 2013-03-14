(function() 
{
	var debug = {};
	
	//Global Data
	var fields = 0;
	var rules = {};
	
	$(function() 
	{
		//Make external links open new tabs/windows
		$('a[rel="external"]').attr({'target': '_blank'});
		
		$('.hide').click(function() { $(this).parent().fadeOut('fast'); });
		
		$('#addField').click(function()
		{
			addField();
			return false;
		});
		$('#form').submit(function()
		{
			$('#ajaxWorking').slideDown('normal');
			$('#results').slideUp('normal');			
			var formData = $(this).serialize();
			$.post('writeValidations.php', formData, function(data)
			{
				$('#ajaxWorking').slideUp('normal');
				$('#results').text(data).slideDown('slow');		
			});
			return false;
		});
	});
	
	//Utility
	var d = function(key, val, k2, v2, k3, v3, k4, v4, k5, v5)
	{
		debug[key] = val;
		if (k2 != undefined) debug[k2] = v2;
		if (k3 != undefined) debug[k3] = v3;
		if (k4 != undefined) debug[k4] = v4;
		if (k5 != undefined) debug[k5] = v5;
	};
	
	var typeSpecificOptions = 
	{
		'alphaNumeric': [],
		'between':		
		[
			{'name': 'min', 'type': 'text', 'default': 'Min', 'valType': 'int'}, 
			{'name': 'max', 'type': 'text', 'default': 'Max', 'valType': 'int'}, 
			{'type': 'note', 'value': 'Note: Values are <em>inclusive</em>'}
		],
		'blank':		[],
		'boolean': 		[],
		'cc':			
		[
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'all', 		'label': '* All Types (Validates all credit card numbers)'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'fast', 		'label': '* Fast ("major" credit card formats)', 'checked': 'checked'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'bank', 		'label': 'Bank Card'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'diners', 		'label': 'Diners'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'discover', 	'label': 'Discover'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'electron', 	'label': 'Electron'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'enroute', 	'label': 'EnRoute'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'jcb', 		'label': 'JCB'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'maestro', 	'label': 'Maestro'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'mastercard', 	'label': 'MasterCard'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'solo', 		'label': 'Solo'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'switch', 		'label': 'Switch'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'visa', 		'label': 'Visa'},
			{'type': 'checkbox', 'name': 'cctype[]', 'value': 'voyager', 	'label': 'Voyager'},
			{'type': 'note', 'value': '* If you choose "All" or "Fast", don\'t select anything else.'},
			{'type': 'hidden',   'name': 'deep', 'valType': 'bool', 'value': 'false'}, //Make sure deep always gets submitted
			{'type': 'checkbox', 'name': 'deep', 'valType': 'bool', 'value': 'true',	'label': 'Deep (check with the Luhn Algorithm <a href="http://en.wikipedia.org/wiki/Luhn_algorithm" rel="external" class="luhnAnchor">[?]</a>)', 'checked': 'checked'},
			{'type': 'text', 'name': 'regex', 			'label': 'Perl-compatible Regular Expression (include boundary delimiters and flags)'}
		],
		'comparison':	
		[
			{'type': 'select', 'name': 'operator', 'options': {'&lt;':'&lt;','&gt;':'&gt;','&lt;=':'&lt;=','&gt;=':'&gt;=','=':'=','!=':'!='}}, 
			{'type': 'text', 'name': 'value', 'default': 'val', 'valType': 'int'}
		],
		'date':			
		[
			{'type': 'checkbox', 'name': 'dateFormat[]', 'value': 'dmy', 	'label': '&#8216;dmy&#8217; e.g. 27-12-2006 or 27-12-06 (separators can be a space, period, dash, forward slash)'},
			{'type': 'checkbox', 'name': 'dateFormat[]', 'value': 'mdy', 	'label': '&#8216;mdy&#8217; e.g. 12-27-2006 or 12-27-06 (separators can be a space, period, dash, forward slash)'},
			{'type': 'checkbox', 'name': 'dateFormat[]', 'value': 'ymd', 	'label': '&#8216;ymd&#8217; (default) e.g. 2006-12-27 or 06-12-27 (separators can be a space, period, dash, forward slash)', 'checked': 'checked'},
			{'type': 'checkbox', 'name': 'dateFormat[]', 'value': 'dMy', 	'label': '&#8216;dMy&#8217; e.g. 27 December 2006 or 27 Dec 2006'},
			{'type': 'checkbox', 'name': 'dateFormat[]', 'value': 'Mdy', 	'label': '&#8216;Mdy&#8217; e.g. December 27, 2006 or Dec 27, 2006 (comma is optional)'},
			{'type': 'checkbox', 'name': 'dateFormat[]', 'value': 'My', 		'label': '&#8216;My&#8217; e.g. (December 2006 or Dec 2006)'},
			{'type': 'checkbox', 'name': 'dateFormat[]', 'value': 'my', 		'label': '&#8216;my&#8217; e.g. 12/2006 or 12/06 (separators can be a space, period, dash, forward slash)'}
		],
		'decimal':		[{'type': 'text', 'valType': 'int', 'name': 'places', 'label': 'Leave blank or specify number of places allowed'}],
		'email':		
		[
			{'before': '*', 'type': 'checkbox', 'name': 'verify', 'label': 'Verify Host?', 'value': 'true', 'valType': 'bool'}, 
			{'type': 'note', 'value': '* From my experience, this is a very unreliable validation and can result in many false-negatives'}
		],
		'equalTo':		[{'name': 'value', 'type': 'text', 'default': 'val'}],
		'extension': 	[{'name': 'ext', 'type': 'text', 'label': 'File extensions to allow; Separate extensions with semicolons (;) and do NOT include dots.'}],
		'file':			[{'type': 'note', 'value': '<strong>As of writing, this rule is non-functional.</strong>'}],
		'ip':			[],
		'maxLength':	[{'name': 'value', 'type': 'text', 'default': 'val', 'valType': 'int'}],
		'money':		[{'type': 'select', 'name': 'signpos', 'options': {'left': 'Sign on Left', 'right': 'Sign on Right'}}],
		'isUnique':		[],
		'minLength':	[{'name': 'value', 'type': 'text', 'default': 'val', 'valType': 'int'}],
		'inList':		[{'name': 'list', 'type': 'text', 'label': 'Separate items in the list with semicolons (;)'}],
		'notEmpty':		[],
		'numeric':		[],
		'phone':		[{'name': 'regex', 'type': 'text', 'label': 'Perl-compatible Regular Expression (include boundary delimiters and flags) for non-U.S. phone number'}],
		'postal':		
		[
			{'name': 'regex', 'type': 'text', 'label': 'Perl-compatible Regular Expression (include boundary delimiters and flags) for other countries'},
			{'type': 'select', 'name': 'country', 'options': {'be': 'Belgium', 'ca': 'Canada', 'de': 'Germany', 'it': 'Italy', 'uk': 'United Kingdom', 'us': 'United States'}}
		],
		'range':		
		[
			{'type': 'note', 'value': 'Min - Max (non-inclusive)'}, 
			{'name': 'min', 'type': 'text', 'default': 'Min', 'valType': 'int'}, 
			{'name': 'max', 'type': 'text', 'default': 'Max', 'valType': 'int'}
		],
		'ssn':			
		[
			{'name': 'regex', 'type': 'text', 'label': 'Perl-compatible Regular Expression (include boundary delimiters and flags) for other countries'},
			{'type': 'select', 'name': 'country', 'options': {'dk': 'Denmark', 'nl': 'The Netherlands', 'us': 'United States'}}
		],
		'url':			[{'type': 'checkbox', 'name': 'strict', 'valType': 'bool', 'value': 'true',	'label': 'Strict mode (ensure that the URL starts with a protocol, such as http://)'}],
		'custom':		[{'name': 'regex', 'type': 'text', 'label': 'Perl-compatible Regular Expression (include boundary delimiters and flags)'}],
		'customFunc':	
		[
			//@link http://book.cakephp.org/view/152/Adding-your-own-Validation-Methods
			{'type': 'note', 'value': '*Note: the first parameter to the function will be the data from the field. See the Book for more info.'},
			{'type': 'text', 'name': 'function', 'label': 'Function Name (e.g. limitDuplicates)'},
			{'type': 'text', 'name': 'arguments', 'label': 'Additional arguments, separated by a comma ( , )', 'valType': 'manual'}
		]
	};
	
	var produceOptions = function(choice, fieldNum, ruleNum)
	{
		var options = typeSpecificOptions[choice];
		
		var elements = $('<div></div>').addClass('typeSpecificOptions');
		var defaults = [];
		for (var i = 0; i<options.length; ++i)
		{
			var newElement = $('<div></div>').addClass('typeOption');
			var option = options[i];
			var type = option['type'];
			var elemId = 'typeOption_'+fieldNum+'_'+ruleNum+'_'+i;
			if (option['valType'])
			{
				if (option['name'].substr(option['name'].length - 2) == '[]')
					option['name'] = option['name'].substr(0, option['name'].length - 2)+'_'+option['valType']+'[]';
				else
					option['name'] += '_'+option['valType'];
			}
			switch (type)
			{
				case 'note':
					newElement.append($('<p></p>').addClass('note').append(option['value']));
					break;
				case 'text':
					// TODO: Give the inputs names and bind the labels
					var label;
					if (option['label'])
						label = $('<label></label>').addClass('textInputLabel').attr({'for': elemId}).append(option['label']);
					var input = $('<input />').addClass('textInput blur onDefault').attr(
					{
						'type': 'text', 
						'id': elemId,
						'name': 'fields['+fieldNum+'][rules]['+ruleNum+'][typeOptions]['+option['name']+']', 
						'value': (option['default']?option['default']:'')
					});
					defaults.push(option['default']);
					input.bind('focus', option['default'], function(e)
					{
						$(this).removeClass('blur').addClass('focus');
						if (this.value == e.data)
						{
							this.value = '';
							$(this).removeClass('onDefault');
						}
					}).bind('blur', option['default'], function(e)
					{
						$(this).removeClass('focus').addClass('blur');
						if (this.value == '')
						{
							this.value = e.data;
							$(this).addClass('onDefault');
						}
					});
					newElement.append(label).append(input);
					label = undefined;
					break;
				case 'checkbox':
				case 'hidden':
					var label;
					if (option['label']) 
						label = $('<label></label>').addClass('checkboxInputLabel').attr({'for': elemId}).append(option['label']);
					var inputName;
					var inputValue = option['value'];
					if (option['name'].substring(option['name'].length - 2) == '[]')
						inputName = 'fields['+fieldNum+'][rules]['+ruleNum+'][typeOptions]['+option['name'].substring(0,option['name'].length - 2)+'][]';
					else
						inputName = 'fields['+fieldNum+'][rules]['+ruleNum+'][typeOptions]['+option['name']+']';
					var input = $('<input />').addClass('checkboxInput').attr({'type': type, 'value': inputValue, 'id': elemId, 'name': inputName});
					if (option['checked'] == 'checked')
						input.get(0).checked = true;
					var before;
					if (option['before'])
						before = option['before'];
					newElement.append(before).append(label).append(input);
					label = before = undefined; //scope is persistent?! O.o
					break;
				case 'select':
					var label;
					var choices = option['options'];
					if (option['label'])
						label = $('<label></label>').addClass('selectLabel').attr({'for': elemId}).append(option['label']);
					var select = $('<select></select>').addClass('selectInput').attr({'id': elemId, 'name': 'fields['+fieldNum+'][rules]['+ruleNum+'][typeOptions]['+option['name']+']'});
					for (var key in choices)
					{
						var choice = choices[key];
						var newOption = $('<option></option>').attr({'value': key}).append(choice);
						select.append(newOption);
					}
					newElement.append(label).append(select);
					label = undefined;
					break;
				default:
					break;
			}			
			elements.append(newElement);
		}
		return elements;
	};
	
	/**
	 * Sets the ID and Name for input fields given by sets, and binds the associated label to those inputs
	 * (This is a very special function... it won't work anywhere else)
	 * @param masterJQuery The main Div containing the inputs
	 * @param sets A formatted object of fields to process
	 * @param rule Set to false iff this is a field, set to the field number iff this is a rule
	 */
	var identifyNameAndBind = function(masterJQuery, sets, rule)
	{
		var toCheck = ['required', 'update', 'create'];
		for (var key in sets)
		{
			var vals = sets[key];
			if (typeof vals === "string")
				vals = [vals];
				
			if (vals.constructor == Object)
				//If there is an Object inner element, recurse through them (I am God)
				identifyNameAndBind(masterJQuery.children('.'+key), vals, rule);
				
			for (var i = 0; i<vals.length; ++i)
			{
				var val = vals[i];
				var input = masterJQuery.children('.'+key).children('.'+val+'Input').get(0);
				var label = masterJQuery.children('.'+key).children('.'+val+'Label').get(0);
				if ($.inArray(val, toCheck) > -1) 
					input.checked = true;
				if (input.className === 'allowEmptyInput')
					$(input).children('[value="false"]').attr({'selected': 'selected'});
				input.id = val + '_' + (rule===false?fields:rule) + (rule===false?'':'_'+rules[rule]);
				if (rule === false)
					input.name = 'fields['+ (rule===false?fields:rule) +']['+val+']';
				else
					input.name = 'fields['+ (rule===false?fields:rule) +'][rules]['+rules[rule]+']['+val+']';
				$(label).attr('for', input.id);
			}
		}
	};
	
	/**
	 * Has jQuery make a <label> element for us and returns it
	 * @param text Label Text
	 * @param class Class Name(s)
	 */
	var mkLabel = function(text, cls)
	{
		return $('<label></label>').append(text).addClass(cls);
	};
	
	
	var remField = function(fieldNum)
	{
		
		$('#fieldDiv_'+fieldNum).slideUp('slow', function() { $(this).remove(); });
		fields--;
	};
	var remRule = function(fieldNum, ruleNum)
	{
		var ruleJQ = $('#ruleDiv_'+fieldNum+'_'+ruleNum);
		var addLinkDiv;
		var newAddLinkDiv;
		if ((addLinkDiv = ruleJQ.children('.ruleOptions').children('.addRule').get(0)) !== undefined)
			newAddLinkDiv = $(addLinkDiv).clone(true);					
		ruleJQ.slideUp('slow', function() 
		{ 
			$(this).remove(); 
			if (newAddLinkDiv.get(0) !== undefined)
			{
				$('#ruleDiv_'+fieldNum+'_'+(rules[fieldNum]-1)).append(newAddLinkDiv);
				d('rules', rules, 'newLink', newAddLinkDiv);
			}
		});
		rules[fieldNum]--;
	};
	
	//Functions
	var addField = function()
	{
		var currentNumFields = fields;
		var newField = fieldShell.clone();
		newField.attr('id', 'fieldDiv_'+fields).hide();
		
		newField.children('.removeField').children('.removeFieldLink').click(function()
		{
			remField(currentNumFields);
		});
		
		var fieldNameInput = newField.children('.fieldName').children('.fieldNameInput').get(0);
		var fieldNameLabel = newField.children('.fieldName').children('.fieldNameLabel').get(0);
		
		//Set the ID and name, and bind the label
		fieldNameInput.name = 'fields['+fields+'][name]';
		fieldNameInput.id = 'field_'+fields+'_name';
		$(fieldNameLabel).attr('for', fieldNameInput.id);
		
		$('#fields').append(newField);
		newField.slideDown(100, function(){addRule(fields++, 'half');});
		rules[fields] = 0;
		//addRule(fields++);				
	};
	var addRule = function(fieldNum, speed)
	{
		var currentNumRules = rules[fieldNum];
		var newRule = ruleShell.clone();
		newRule.attr('id', 'ruleDiv_'+fieldNum+'_'+rules[fieldNum]++).hide();
		newRule.children('.removeRule').children('.removeRuleLink').click(function()
		{
			remRule(fieldNum, currentNumRules);
		});
		newRule.children('.rulesDropdown').children('.ruleTypeInput').change(function()
		{
			options = produceOptions(this.value, fieldNum, currentNumRules+1);
			newRule.children('.ruleOptions').children('.typeSpecificOptions').remove();
			newRule.children('.ruleOptions').prepend(options);
			applyTooltips();
		});
		if (currentNumRules == 0)
			newRule.children('.removeRule').remove();
		
		var sets = 
		{
			'ruleName':			'ruleName',
			'rulesDropdown':	'ruleType', 
			'ruleOptions': 
			{
				'allowEmpty': 			'allowEmpty',
				'required': 			'required',
				'appliesOnlyOn': 		['update', 'create'],
				'validateThisRuleLast': 'validateThisRuleLast',
				'customMessage': 		'customMessage'
			}
		};
		identifyNameAndBind(newRule, sets, fieldNum);
		
		$('#fieldDiv_'+fieldNum).append(newRule);
		newRule.slideDown((speed=='half'?500:600));
		$('#addRule_').attr('id', 'addRule_'+fieldNum).click(function() 
		{
			addRule(fieldNum);
			$(this).remove();
		});
	};
	
	//Remove Field
	var removeFieldLink = $('<a></a>').attr({'href':'#', 'class':'removeFieldLink'}).append('<img src="images/remove-field.png" alt="Remove Field" />');
	var removeField = $('<div></div>').addClass('removeField').append(removeFieldLink);
	
	//Remove Rule
	var removeRuleLink = $('<a></a>').attr({'href':'#', 'class':'removeRuleLink'}).append('<img src="images/remove-rule.png" alt="Remove Rule" />');
	var removeRule = $('<div></div>').addClass('removeRule').append(removeRuleLink);
	
	var addRuleLink = $('<div></div>').addClass('addRule').append($('<a></a>').attr({id: 'addRule_', href: '#'}).addClass('addRuleLink').append('<img src="images/add-rule.png" alt="Add Rule" />'));
	
	//Field Shell
	var fieldNameInput = $('<input />').attr({type: 'text'}).addClass('fieldNameInput');
	var fieldNameLabel = mkLabel('Field Name', 'fieldNameLabel'); //TODO: Make sure the label gets bound properly
	var fieldName = $('<div></div>').addClass('fieldName').append(fieldNameLabel).append(fieldNameInput);
	var fieldShell = $('<div></div>').addClass('field').append(removeField).append(fieldName);
	
	//Rule Shell
	var ruleNameInput = $('<input />').attr({type: 'text'}).addClass('ruleNameInput');
	var ruleNameLabel = mkLabel('Rule Name', 'ruleNameLabel'); //TODO: Make sure the label gets bound properly
	var ruleName = $('<div></div>').addClass('ruleName').append(ruleNameLabel).append(ruleNameInput);
	var ruleTypes =
	{
		'alphaNumeric': 'Alphanumeric',
		'between':		'Between...',
		'blank':		'Blank',
		'boolean': 		'Boolean',
		'cc':			'Credit Card...',
		'comparison':	'Comparison...',
		'date':			'Date...',
		'decimal':		'Decimal...',
		'email':		'Email...',
		'equalTo':		'Equal To...',
		'extension':	'Extension...',
		'file':			'File',
		'ip':			'IP Address',
		'maxLength':	'Maximum Length...',
		'money':		'Money',
		'isUnique':		'Unique',
		'minLength':	'Minimum Length...',
		'inList':		'In List...',
		'notEmpty':		'Not Empty',
		'numeric':		'Numeric',
		'phone':		'Phone Number...',
		'postal':		'Postal/Zip Code...',
		'range':		'Range...',
		'ssn':			'Social Security Number...',
		'url':			'URL',
		'custom':		'Custom Regular Expression...',
		'customFunc':	'Custom Function...'
	};
	var rulesDropdownInput = $('<select></select>').addClass('ruleTypeInput');
	for (var ruleType in ruleTypes)
		rulesDropdownInput.append($('<option></option>').attr('value', ruleType).text(ruleTypes[ruleType]));
	var rulesDropdownLabel = mkLabel('Rule Type', 'ruleTypeLabel'); //TODO: Make sure the label gets bound properly
	var rulesDropdown = $('<div></div>').addClass('rulesDropdown').append(rulesDropdownLabel).append(rulesDropdownInput);
	
	var allowEmptyOptions = $('<select></select>').addClass('allowEmptyInput')
		.append($('<option></option>').attr({'value': 'ignore'}).append('Ignore'))
		.append($('<option></option>').attr({'value': 'true'}).append('True'))
		.append($('<option></option>').attr({'value': 'false'}).append('False'));
	var allowEmpty = $('<div></div>').addClass('allowEmpty').append(mkLabel('Allow Empty', 'allowEmptyLabel')).append(allowEmptyOptions);
	
	var required = $('<div></div>').attr('class', 'required').append(mkLabel('Required', 'requiredLabel')).append($('<input />').attr({'type':'checkbox', 'class':'requiredInput'}));
	
	var appliesOnlyOn = $('<div></div>').attr('class', 'appliesOnlyOn').append($('<span></span>').addClass('onlyOnText').append('Applies only on...')).append($('<input />').attr({'type':'checkbox', 'class':'updateInput'})).append(mkLabel('Update, ', 'updateLabel')).append($('<input />').attr({'type':'checkbox', 'class':'createInput'})).append(mkLabel('Create', 'createLabel'));
	
	var vtrl = $('<div></div>').attr('class', 'validateThisRuleLast').append(mkLabel('Validate this rule last', 'validateThisRuleLastLabel')).append($('<input />').attr({'type':'checkbox', 'class':'validateThisRuleLastInput'}));
	
	var customMessage = $('<div></div>').attr('class', 'customMessage').append(mkLabel('Custom Message', 'customMessageLabel')).append($('<input />').attr({'type':'text', 'class':'customMessageInput'}));
	
	var ruleOptions = $('<div></div>').attr('class', 'ruleOptions').append(allowEmpty).append(required).append(appliesOnlyOn).append(vtrl).append(customMessage).append(addRuleLink);
	
	var ruleShell = $('<div></div>').attr('class', 'rule').append(removeRule).append(ruleName).append(rulesDropdown).append(ruleOptions);
})();