<?php
echo "Hello from PHP 7.3 with Caddy web server!";
echo "<br>";
echo "PHP Version: " . phpversion();
echo "<br>";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown';
echo "<br>";
echo "Request URI: " . $_SERVER['REQUEST_URI'] ?? 'Unknown';
echo "<br>";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown';
?> 
