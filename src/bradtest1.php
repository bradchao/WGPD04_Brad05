<?php
// Cross-Origin Resource Sharing Header
header('Access-Control-Allow-Origin: http://www.bradchao.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');

    $key1 = $_REQUEST['key1'];
    $key2 = $_REQUEST['key2'];

    echo "{$key1} : {$key2}";


?>