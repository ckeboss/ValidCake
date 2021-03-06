<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
 
<html xmlns="http://www.w3.org/1999/xhtml"> 
	<head> 
		<title>Valid Cake - The Easiest Validation Generator for CakePHP Models</title> 
		<meta http-equiv="Author" content="Trevor Gau" /> 
		<meta http-equiv="Copyright" content="&copy; 2009 Trevor Gau" /> 
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" /> 
		<link rel="stylesheet" media="screen" href="css/reset.css" type="text/css" /> 
		<link rel="stylesheet" media="screen" href="css/style.css" type="text/css" /> 
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script> 
		<script type="text/javascript" src="js/application.js"></script>		
		<script type="text/javascript" src="js/tooltips.js"></script>	
		<script type="text/javascript" src="js/comments.js"></script>	
	</head> 
	<body> 
		<div id="wrap"> 
			<div id="header"> 
				<div id="headerLeft"><h1 id="logo"><a href="index.php"><span>Valid Cake</span></a></h1> </div> 
				<div id="headerRight"> 
					<p><strong>Get started right away! Follow these simple instructions:</strong></p> 
					<ol> 
						<li>Add fields with the same names as your table's columns.</li> 
						<li>Add one or more rules to each field.</li> 
						<li>Customize your output.</li> 
						<li>Click Generate! Copy the results to your model.</li> 
					</ol> 
				</div> <!-- headerRight --> 
			</div> <!-- header --> 
			<p id="noobs">
				New to CakePHP Validation? No problem! Just go over to the Cookbook and read up on <a href="http://book.cakephp.org/view/125/Data-Validation" rel="external">Data Validation</a>. Valid Cake uses the "<a href="http://book.cakephp.org/view/133/Multiple-Rules-per-Field" rel="external">Multiple Rules per Field</a>" method.
				<br />
				<a class="hide" href="#">[Hide]</a>
			</p>
			<form action="" method="post" id="form"> 
				<fieldset id="fieldset"> 
				
					<div id="fields"></div> 
					
					<p><a href="#" id="addField"><img src="images/add-field.png" alt="Add Field" /></a></p> 
					
					<p> 
						<label for="numTabs"> 
							Number of Tabs <a href="#" id="numTabsAnchor">[?]</a> 
						</label> 
						<select id="numTabs" name="options[num_tabs]">
							<option value="0">Zero</option>
							<option value="1" selected="selected">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
						<!-- <input type="text" id="numTabs" name="options[num_tabs]" />  -->
					</p> 
					
					<p>
						<label for="extraOptions"> 
							Include default options? <a href="#" id="defaultOptionsAnchor">[?]</a> 
						</label> 
						<input type="checkbox" id="extraOptions" name="options[extra_options]" /> 
					</p> 
					
					<p><input name="submit" type="image" src="images/generate.png" alt="Generate!" id="submit" /></p>
					<div id="ajaxWorking"></div>
				</fieldset>		
			</form> 
			
			<div id="results">Your $validate array will appear here...</div> 
			<div id="ads">
				<h2>Get over yourself. I'm putting ads here.</h2>
				<p>&nbsp;</p>
				<p>Hehe... want to advertise? Cheap? Contact me at trevorsg@gmail.com.</p>
			</div>
			<div id="comments">
				<h2>Leave a Comment <span class="small">(Don't worry, it's AJAXy)</span></h2>
				<form action="" method="post" id="addCommentForm">
					<p>
						<label for="commentName">Name: </label>
						<input type="text" id="commentName" name="name" /> <span class="message" id="nameMsg"></span>
					</p>
					
					<p>
						<label for="email">Email: </label>
						<input type="text" id="commentEmail" name="email" /> <span class="message" id="emailMsg">Opt., Will be private</span>
					</p>
					
					<p>
						<textarea id="commentComment" name="comment"></textarea> <span class="message" id="commentMsg"></span>
					</p>
					
					<p>
						<input type="submit" name="submit" value="Add Comment" /> <span id="commentAdded">Comment Added!</span>
					</p>
				</form>
				<div id="comments_area"></div>
			</div>
			<br class="clear" />
		</div> <!-- wrap --> 
		<div id="footer">&copy; 2009-<?php echo date('Y');?> <a href="http://trevorsg.com">Trevor Gau</a>. Design by <a href="http://kevinjj.com">Kevin Jacoby</a>.</div> 
		<div id="tips"></div>
		<script type="text/javascript">
			var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
			document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript">
			try 
			{
				var pageTracker = _gat._getTracker("UA-67827-5");
				pageTracker._trackPageview();
			} 
			catch(err) {}
		</script>
	</body> 
</html>