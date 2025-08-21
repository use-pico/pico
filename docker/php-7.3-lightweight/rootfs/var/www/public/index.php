<?php
echo "<h1>PHP 7.3 with Caddy Web Server</h1>";
echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
echo "<p><strong>Server Software:</strong> " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "</p>";
echo "<p><strong>Request URI:</strong> " . ($_SERVER['REQUEST_URI'] ?? 'Unknown') . "</p>";
echo "<p><strong>Document Root:</strong> " . ($_SERVER['DOCUMENT_ROOT'] ?? 'Unknown') . "</p>";

// Check Xdebug status
echo "<h2>Xdebug Status</h2>";
if (extension_loaded('xdebug')) {
    echo "<p style='color: green;'><strong>✅ Xdebug is loaded!</strong></p>";
    echo "<p><strong>Xdebug Version:</strong> " . phpversion('xdebug') . "</p>";
    echo "<p><a href='/xdebug-test.php' style='background: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;'>🧪 Test Xdebug</a></p>";
} else {
    echo "<p style='color: red;'><strong>❌ Xdebug is NOT loaded!</strong></p>";
}

echo "<hr>";
echo "<p><em>Generated at: " . date('Y-m-d H:i:s') . "</em></p>";
