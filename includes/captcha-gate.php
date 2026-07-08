<?php
session_start();

if (empty($_SESSION["captcha_passed"])) {
    header("Location: /");
    exit;
}
?>