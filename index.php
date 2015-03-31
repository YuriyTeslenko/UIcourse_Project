<?php
//===============================================================================
// neanderthal 1.04 DangeCorp SETTINGS

$dbhost = 'localhost';
$dbname = 'dcorp';
$dbuser = 'dcorp';
$dbpasswd = 'dcorp';

$table_prefix = 'nadc_';

//$ast ='menu'; //Стиль для ссилок, що будуть в меню.
//$target ='_blank'; //Директива для зовнішніх УРЛ в меню
// Full path to site dir
define('SITEROOT', 'n:/home/dcorp.org/www');

// Full site url
define('SITEURL', 'http://dcorp.org/');

// Debug mode
//define('_DEBUG', true);

$templates = SITEROOT.'/templates/';
$articles = SITEROOT.'/articles/';
//$img = SITEURL.'img/';

// END OF SETTINGS
// DO NOT EDIT BOTTOM CONTENT
//===============================================================================
//Neaderthal functions
function mydbque ($e)
{
	global $query, $result;

	if (!($result = mysql_query($query) or false) && !$e)
	{
		die("Internal Error 2"); // or die("Query failed : " . mysql_error());
	}
}


include($templates.'page.php')

?>