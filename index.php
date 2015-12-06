Coming soon &copy;<br />
<?php
if(file_exists(__DIR__ . '/version')){
	$version = file_get_contents(__DIR__ . '/version');
	
	echo '<em>Build from commit <a href="https://github.com/HetIsNiels/Portfolio/commit/' . $version . '">' . $version . '</a></em>';
}
?>
<script>
var redirect = function () {
	document.location = 'https://github.com/HetIsNiels';
};

setTimeout(redirect, 1000);
</script>
