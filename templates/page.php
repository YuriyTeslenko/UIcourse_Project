<?php if (!defined('SITEURL')) die("403");?>
<!DOCTYPE html>
<html>
<head>
	<title>DCorp. AudioLab</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="description" content="
	Ремонт та переробка аудіоапаратури, саморобки, динаміки Ремонт и переделка аудиоаппаратуры, самоделки, динамики" />
    <meta name="keywords" content="ГДН, ГДС, усилитель, підсилювач, акустические, звук, акустичні" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" media="all" href="<?php echo SITEURL?>css/page.css" />
	<script type="text/javascript" src="<?php echo SITEURL?>js/jquery-2.1.3.js"></script>
	<script type="text/javascript" src="<?php echo SITEURL?>js/clockwork.js"></script>
	
</head>
<body>
	<header>
		<div class="logo">
			<a href="<?php echo SITEURL?>">DC</a>
		</div>
		<form action="<?php echo SITEURL?>" method="post" name="formin">
			<input name="lbutt[]" type="text" placeholder="login" size="10">
			<input name="lbutt[]" type="password" placeholder="password" size="5">
			<input name="lbutt[]" type="submit" value="Sign in">
		</form>
		<?php include('menu.php');?>
	</header>
	

	<div class="side">
		<a class="rollup" href="#top">&#58;</a>
		<a class="rollup" href="#end">&#59;</a>
		<hr>
	</div>
	<div class="scrcomp">
	</div>

	<a name="top"></a>
	<article>
	<?php include($article);?>
	</article>
	<a name="end"></a>

	<footer>
		Powered by Neanderthal © 2007-2015 DCorp. 
		<img src="<?php echo SITEURL?>img/neanderthal.jpg">
	</footer>

</body>



</html>