<?php

/**
 * @author Java Video Tutorials
 * @copyright 2008
 */

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Java Video Tutorials: Learn Java the easy way!</title>
	<link href="<?=STYLES_PATH;?>main.css" rel="stylesheet" type="text/css" />
	<!--[if lte IE 7]>
		<link rel="stylesheet" type="text/css" href="<?=STYLES_PATH;?>main_ie.css" />
	<![endif]-->
	<meta http-equiv="Description" content="Java Video Tutorials - Learn Java the easy way! Just sit back, relax, and enjoy how easy it is to learn one of the greatest modern programming languages." />
	<meta http-equiv="Author" content="Trevor Gau" /> 
	<meta name="robots" content="follow,index" />
	<meta http-equiv="Copyright" content="&copy; 2009 Trevor Gau" />
	<meta http-equiv="Keywords" content="java, video, tutorials, java video tutorials, video tutorials, free java tutorials, learn java, easy java, free java video tutorials" />
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<script src="<?=LIB_PATH;?>externalLinks.js" type="text/javascript"></script>
	<script src="<?=LIB_PATH;?>jquery.js" type="text/javascript"></script>
	
	<!--Nifty Cube Corners-->
	<script type="text/javascript" src="<?=LIB_PATH;?>niftycube.js"></script>
	<script type="text/javascript">
	function corner()
	{
		Nifty("div#test","transparent");
	}
	</script>
	<!--End Nifty-->
	
	<script type="text/javascript" src="<?=LIB_PATH;?>iepngfix_tilebg.js"></script>  
	<!--[if lte IE 6]>
		<script type="text/javascript" src="<?=LIB_PATH;?>supersleight.js"></script>
	<![endif]-->
</head>

<body onload="externalLinks(); corner();">
<!-- jquery.corner -->
<script type="text/javascript" src="<?=LIB_PATH.'jquery.corner.js';?>"></script>

<!-- Add rounded corners to the tabs and the wrapper using jQuery.corner -->
<script type="text/javascript" src="<?=STYLES_PATH;?>stylize.js"></script>


<!-- Holds everything -->
<div id="wrapper">

	<!-- Banner (logo, slogan, tabs) -->
	<div id="banner">
		<a href="<?=HOME_PATH.'home';?>">
			<img alt="JVT Logo" id="logo" src="<?=IMAGE_PATH.'logo.png';?>" />
		</a>
		<img alt="Kick back, have fun, and enjoy!" id="slogan" src="<?=IMAGE_PATH.'slogan.png';?>" />
		
		<!-- Holds all tabs and gives a solid background color -->
		<div class="tabs">
			 <ul class="tabs">
<? 				foreach ($lis as $li) { echo $li; } ?> 
			 </ul>
		</div> <!--tabs-->
	</div> <!--banner-->
	
	<!-- Holds everything that's the light tan color -->
	<div id="main">
		<div id="pane_left">
		
			<!-- Donation buttons -->
			<img alt="Donate" class="header_left" src="<?=IMAGE_PATH.'side_make_donation.png';?>" />
				<div class="donate_links">
<?					 include(SERVER_ROOT.LIB_PATH.'__donate_links.php'); ?> 
					
				</div>
			
			<!-- Helpful links -->
			<img alt="Helpful links" class="header_left" src="<?=IMAGE_PATH.'side_helpful_links.png';?>" />
				<div id="helpful_links">
					<a href="http://www.phpvideotutorials.com">PHP Video Tutorials</a>
					Visit Leighmac to learn PHP with awesome video tutorials!
					
					<a href="http://java.sun.com">Java Home</a>
					Downloads, news, documentation, everything needed for the Java language
					
					<a href="http://java.sun.com/javase/6/docs/api/">Java Documentation</a>
					Direct link to the Java Documentation
					
					<a href="http://www.deathmonkeyz.com">Learn Ajax from Ash</a>
					Learn the principles of AJAX with more video tutorials by Ash. C++ tutes are also available.
				</div> <!--helpful_links-->
				
			<!-- Badges -->
			<img alt="Site Badges" class="header_left" src="<?=IMAGE_PATH.'side_badges.png';?>" />
				<div class="badge">
					<a href="http://www.drjava.org">
						<img alt="Dr. Java Badge" src="<?=IMAGE_PATH.'badge_dr_java.png';?>" />
					</a>
				</div> <!--badge-->
				<div class="badge">
					<a href="http://java.sun.com">
						<img alt="Java Badge" src="<?=IMAGE_PATH.'badge_java.png';?>" />
					</a>
				</div> <!--badge-->
				<div class="badge">
					<a href="http://www.w3c.org">
						<img alt="W3C Compliance Badge" src="<?=IMAGE_PATH.'badge_w3c.png';?>" />
					</a>
				</div> <!--badge-->
		</div> <!--pane_left-->
		
		<div id="pane_right">
			<!-- Include view -->
<?			include(VIEW_PATH.$route['frontend']['view'].'.php');?> 
		</div> <!--pane_right-->
		<div class="clear_fix">&nbsp;</div>		
	</div> <!--main-->
</div> <!--wrapper-->
<div id="footer_corners">&nbsp;</div> 
<div id="footer">
			<p>
				<a href="<?=HOME_PATH;?>home">Home</a> | 
				<a href="<?=HOME_PATH;?>lessons">Lessons</a> | 
				<a href="<?=HOME_PATH;?>assignments">Assignments</a> | 
				<a href="<?=HOME_PATH;?>contact">Contact Us</a> | 
				<a href="<?=HOME_PATH;?>donate">Donate</a> | 
				<a href="<?=HOME_PATH;?>about">About</a> 
			</p>
			<p>
				Site Copyright &copy; 2007-2009 Trevor Gau<br />
				Design by <a href="http://www.phpnotepad.com">Leighmac</a>
			</p>
		</div> <!--footer--> 

<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write
	(
		unescape
		(
			"%3Cscript src='" + 
			gaJsHost + 
			"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"
		)
	);
</script>
<script type="text/javascript">
	if (typeof(_gat) == 'object')
	{ 
		var pageTracker = _gat._getTracker("UA-67827-2");
		pageTracker._initData();
		pageTracker._trackPageview();
	}
</script>
</body>
</html>
