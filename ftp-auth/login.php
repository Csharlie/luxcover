<?php
/**
 * LuxCover — bejelentkezési kapu
 * Jelszó módosításhoz: openssl passwd -apr1 'UjJelszó' → VALID_HASH csere
 */

const VALID_USER  = 'luxcover';
const VALID_HASH  = '$apr1$5BJMtU3u$6KHGYgLVPxbCJqDAZ1wIs1'; // LuxCover2025!
const COOKIE_NAME = 'lc_auth';
const COOKIE_TTL  = 60 * 60 * 24 * 7;

if (isset($_GET['logout'])) {
    setcookie(COOKIE_NAME, '', time() - 3600, '/', '', true, true);
    header('Location: /login.php');
    exit;
}

$secret = 'lc-' . VALID_HASH;
$error  = null;

function apr1_verify(string $plain, string $hash): bool {
    if (!preg_match('/^\$apr1\$([^$]+)\$.+$/', $hash, $m)) return false;
    $salt = $m[1];
    $bin = md5($plain . $salt . $plain, true);
    $tmp = $plain . '$apr1$' . $salt;
    for ($i = strlen($plain); $i > 0; $i -= 16) $tmp .= substr($bin, 0, min(16, $i));
    for ($i = strlen($plain); $i > 0; $i >>= 1) $tmp .= ($i & 1) ? "\x0" : $plain[0];
    $bin = md5($tmp, true);
    for ($i = 0; $i < 1000; $i++) {
        $t = ($i & 1) ? $plain : $bin;
        if ($i % 3) $t .= $salt;
        if ($i % 7) $t .= $plain;
        $t .= ($i & 1) ? $bin : $plain;
        $bin = md5($t, true);
    }
    $itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $r = '';
    foreach ([[0,6,12],[1,7,13],[2,8,14],[3,9,15],[4,10,5]] as $p) {
        $v = (ord($bin[$p[0]]) << 16) | (ord($bin[$p[1]]) << 8) | ord($bin[$p[2]]);
        for ($j = 0; $j < 4; $j++) { $r .= $itoa64[$v & 0x3f]; $v >>= 6; }
    }
    $v = ord($bin[11]);
    for ($j = 0; $j < 2; $j++) { $r .= $itoa64[$v & 0x3f]; $v >>= 6; }
    return hash_equals($hash, '$apr1$' . $salt . '$' . $r);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    if ($user === VALID_USER && apr1_verify($pass, VALID_HASH)) {
        $token = hash_hmac('sha256', $user, $secret);
        setcookie(COOKIE_NAME, $token, time() + COOKIE_TTL, '/', '', true, true);
        header('Location: /');
        exit;
    }
    $error = 'Helytelen felhasználónév vagy jelszó';
}
?><!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Bejelentkezés — LuxCover</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lexend:wght@600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #fff;
  }

  .page {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at top, rgba(196, 154, 26, 0.07) 0%, transparent 55%),
      linear-gradient(180deg, #0a0a10 0%, #06060c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .card {
    background-color: #1a1a22;
    border: 1px solid #2e2e3a;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6);
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 26rem;
  }

  .logo {
    font-family: 'Lexend', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.75rem;
    letter-spacing: -0.02em;
  }
  .logo span { color: #C49A1A; }

  .header { text-align: center; margin-bottom: 2rem; }
  .title { font-size: 1.25rem; font-weight: 600; color: #fff; margin-bottom: 0.375rem; }
  .subtitle { color: #6b7280; font-size: 0.875rem; }

  form > * + * { margin-top: 1.25rem; }

  label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #9ca3af;
    margin-bottom: 0.4rem;
    letter-spacing: 0.01em;
  }

  input[type="text"], input[type="password"] {
    width: 100%;
    padding: 0.65rem 1rem;
    background-color: #0a0a10;
    border: 1px solid #2e2e3a;
    color: #fff;
    border-radius: 0.5rem;
    outline: none;
    font-family: inherit;
    font-size: 0.9375rem;
    line-height: 1.5;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  input::placeholder { color: #4b5563; }
  input:focus {
    border-color: #C49A1A;
    box-shadow: 0 0 0 3px rgba(196, 154, 26, 0.15);
  }

  .error {
    background-color: rgba(127, 29, 29, 0.25);
    border: 1px solid rgba(185, 28, 28, 0.5);
    color: #fca5a5;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }

  button[type="submit"] {
    width: 100%;
    background-color: #C49A1A;
    color: #0a0a10;
    font-weight: 700;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: background-color 0.15s;
    margin-top: 1.75rem;
    letter-spacing: 0.01em;
  }
  button[type="submit"]:hover { background-color: #DDB83A; }
</style>
</head>
<body>
  <div class="page">
    <div class="card">
      <div class="logo"><span>Lux</span>Cover</div>
      <div class="header">
        <h1 class="title">Előnézet megtekintése</h1>
        <p class="subtitle">Kérjük, adja meg a belépési adatokat</p>
      </div>
      <form method="post" autocomplete="off">
        <div>
          <label for="username">Felhasználónév</label>
          <input type="text" id="username" name="username" placeholder="luxcover" required autofocus>
        </div>
        <div>
          <label for="password">Jelszó</label>
          <input type="password" id="password" name="password" placeholder="••••••••••••" required>
        </div>
        <?php if ($error): ?>
          <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <button type="submit">Belépés</button>
      </form>
    </div>
  </div>
</body>
</html>
