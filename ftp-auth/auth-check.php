<?php
/**
 * LuxCover — auth gate: ellenőrzi a cookie-t, kiszolgálja az index.html-t vagy átirányít.
 */
const VALID_HASH  = '$apr1$wNoCp5DD$ttbQBRkwVk522x0taYo1o.';
const COOKIE_NAME = 'lc_auth';

$secret   = 'lc-' . VALID_HASH;
$expected = hash_hmac('sha256', 'luxcover', $secret);
$got      = $_COOKIE[COOKIE_NAME] ?? '';

if (!hash_equals($expected, $got)) {
    header('Location: /luxcover/login.php');
    exit;
}

$path = __DIR__ . '/index.html';
if (file_exists($path)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($path);
} else {
    http_response_code(404);
    echo 'index.html not found';
}
