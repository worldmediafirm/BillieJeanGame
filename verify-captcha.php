<?php
session_start();

require_once __DIR__ . "/config/secrets.php";

$token = $_POST["cf-turnstile-response"] ?? "";

if (empty($token)) {
    header("Location: /index.php?captcha=missing");
    exit;
}

$verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

$data = [
    "secret" => TURNSTILE_SECRET,
    "response" => $token,
    "remoteip" => $_SERVER["REMOTE_ADDR"] ?? ""
];

$options = [
    "http" => [
        "header" => "Content-type: application/x-www-form-urlencoded\r\n",
        "method" => "POST",
        "content" => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($verifyUrl, false, $context);
$result = json_decode($response, true);

if (!empty($result["success"])) {
    $_SESSION["captcha_passed"] = true;
    header("Location: /main.php");
    exit;
}

header("Location: /index.php?captcha=failed");
exit;