<?php
//===============================================================================
// neanderthal 2.0 DangeCorp SETTINGS

// Full path to site dir
define('SITEROOT', 'n:/home/dcorp.org/www');

// Full site url
define('SITEURL', 'http://dcorp.org/');

$rewrcorr = 'www';
$startpage = 'main';
$templates = SITEROOT.'/templates/';
$articles = SITEROOT.'/articles/';

// END OF SETTINGS
// DO NOT EDIT BOTTOM CONTENT
//===============================================================================

$inurl=explode('-', trim(str_replace($rewrcorr, '', $_GET['p'])));

$article = array_pop($inurl);

if (!$article) {
	$article = $startpage;
}
$article=$articles.$article.'.html';

if (!file_exists($article))
{
	$article =$templates.'error.html';
}

include($templates.'page.php')

?>