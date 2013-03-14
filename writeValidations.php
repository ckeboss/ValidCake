<?php 

define('T', "\t");
define('NL', "\r\n");
define('BR', "<br />\r\n");
define('Q', "'");

$ruleOptionDefaults = array(
	'required' => 'false',
	'allowEmpty' => 'ignore',
	'on' => 'null',
	'last' => 'false',
	'message' => 'null'
);

function wrap($string, $token) {return $token.$string.$token;}
function c($s,$t){return $s.$t;}
function reprArr($arr)
{
	return 'array('.implode(', ',array_map('wrap', $arr, array_fill(0, sizeof($arr), Q))).')'; 
}

if (!isset($_POST['fields'])) exit('Please add one or more fields.');

$def = isset($_POST['options']['extra_options']);
$t = '';
while ($_POST['options']['num_tabs']--) $t .= T;

$validate = $t.'var $validate = array('.NL;

$fields = $_POST['fields'];
$commaSpace1 = '';
foreach ($fields as $field)
{
	$commaSpace2 = '';
	$validate .= $commaSpace1;
	$name = $field['name'];
	$validate .= $t.T.wrap($name, Q).' => array('.NL;
	
	$rules = $field['rules'];
	foreach ($rules as $rule)
	{
		$required = isset($rule['required'])?'true':'false';
		$requiredDef = wrap('required', Q).' => '.$required.','.NL;
		
		$allowEmpty = $rule['allowEmpty'];
		$allowEmptyDef = wrap('allowEmpty', Q).' => '.($allowEmpty == 'ignore'?'null':$allowEmpty).','.NL;
		
		$on = '';
		if (isset($rule['update']) and isset($rule['create'])) $on = 'null';
		elseif (isset($rule['update'])) $on = wrap('update', Q);
		elseif (isset($rule['create'])) $on = wrap('create', Q);
		else $on = 'null';
		$onDef = wrap('on', Q).' => '.$on.','.NL;
		
		$last = isset($rule['validateThisRuleLast'])?'true':'false';
		$lastDef = wrap('last', Q).' => '.$last.','.NL;
		
		$message = ($rule['customMessage'] === '')?'null':$rule['customMessage'];
		$messageDef = wrap('message', Q).' => '.($message=='null'?$message:wrap($message, Q)).NL;
		
		$ruleType = $rule['ruleType'];
		$ruleDef = wrap('rule', Q).' => ';
		if (isset($rule['typeOptions']))
		{
			if ($ruleType === 'customFunc') $ruleType = array_shift($rule['typeOptions']);
			$ruleDef .= 'array('.wrap($ruleType, Q);
			foreach ($rule['typeOptions'] as $key => $typeOption)
			{
				if (is_array($typeOption)) 
				{
					$typeOption = reprArr($typeOption);
					$ruleDef .= ', '.$typeOption;
				}
				elseif ($ruleType === 'inList' or $ruleType === 'extension')
				{
					$typeOption = reprArr(explode(';', $typeOption));
					$ruleDef .= ', '.$typeOption;
				}
				else
				{
					$temp = explode('_', $key);
					$valType = (strpos($key, '_') === false) ? 'string' : $temp[1];
					switch ($valType)
					{
						case 'bool':
						case 'int':
						case 'float':
						case 'manual':
							$ruleDef .= ', '.$typeOption;	
							break;
						case 'string':
						default:
							if ($typeOption === '')
								$ruleDef .= ', '.'null';
							else
								$ruleDef .= ', '.wrap($typeOption, Q);			
							break;
					}
				}
			}
			$ruleDef .= '),'.NL;		
		}
		else
			$ruleDef .= wrap($ruleType, Q).','.NL; 
		
		$writeReq  = $def || ($ruleOptionDefaults['required']   !== $required);
		$writeAE   = $def || ($ruleOptionDefaults['allowEmpty'] !== $allowEmpty);
		$writeOn   = $def || ($ruleOptionDefaults['on']         !== $on);
		$writeLast = $def || ($ruleOptionDefaults['last']       !== $last);
		$writeMsg  = $def || ($ruleOptionDefaults['message']    !== $message);
		
		$ruleName = $rule['ruleName'];
		$validate .= $commaSpace2;
		$validate .= $t.T.T.wrap($ruleName, Q).' => array('.NL;
		$validate .= $t.T.T.T.$ruleDef;
		if ($writeReq)  $validate .= $t.T.T.T.$requiredDef;
		if ($writeAE)   $validate .= $t.T.T.T.$allowEmptyDef;
		if ($writeOn)   $validate .= $t.T.T.T.$onDef;
		if ($writeLast) $validate .= $t.T.T.T.$lastDef;
		if ($writeMsg)  $validate .= $t.T.T.T.$messageDef;
		if ($validate{strlen($validate)-3} == ',') $validate = substr($validate, 0, strlen($validate)-3).substr($validate,strlen($validate)-2);
		$validate .= $t.T.T.')';
		$commaSpace2 = ', '.NL;
	}
	$validate .= NL.$t.T.')';
	$commaSpace1 = ', '.NL;
}
$validate .= NL.$t.');'.NL;

echo $validate;
?>