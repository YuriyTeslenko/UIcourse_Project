<?php
//===============================================================================
// neanderthal 2.0 DangeCorp SETTINGS

// Full path to site dir
define('SITEROOT', 'n:/home/dcorp.org/www');

// Full site url
define('SITEURL', 'http://dcorp.org/');

$loginsw = "dcorp";
$password = "";

$session = "dcorp";

$rewrcorr = 'www';
$startpage = 'main';
$templates = SITEROOT.'/templates/';
$articles = SITEROOT.'/articles/';

// END OF SETTINGS
// DO NOT EDIT BOTTOM CONTENT
//===============================================================================

// Protect against GLOBALS tricks
if (isset($_POST['GLOBALS']) || isset($_FILES['GLOBALS']) || isset($_GET['GLOBALS']) || isset($_COOKIE['GLOBALS'])) {
	header('HTTP/1.0 403 Forbidden');
	die();
}

// Protect against HTTP_SESSION_VARS tricks
if (isset($_SESSION) && !is_array($_SESSION)) {
	header('HTTP/1.0 403 Forbidden');
	die();
}

session_name($session);
$login = &$_POST['login'];
$form = 'form';

if ($login[2]=='Sign in' && $login[0]==$loginsw && $login[1]==$password) {
	session_start();
	$_SESSION['logas'] = $loginsw;
	$form = 'form1';
}

if (isset($_REQUEST[session_name($session)])) {
	session_start();
	$loginsw = $_SESSION['logas'];
	$form = 'form1';
}

if ($login[0] =='Log out') {
	$_SESSION = array();
	if (isset($_COOKIE[session_name($session)])) setcookie(session_name($session), '', time()-42000, '/');
	session_destroy();
	$form = 'form';
}

$incomeurl=trim(str_replace($rewrcorr, '', $_GET['p']));
$inurl=explode('-',$incomeurl);
$incomeurl=SITEURL.$incomeurl."/";
$article = array_pop($inurl);

if (!$article) {
	$article = $startpage;
	$incomeurl=SITEURL;
}
$article=$articles.$article.'.html';

if (!file_exists($article))
{
	$article =$templates.'error.html';
}

include($templates.'page.php')

?>