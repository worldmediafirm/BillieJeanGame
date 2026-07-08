<?php
session_start();

if (!empty($_SESSION["captcha_passed"])) {
    header("Location: /main.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WMF OPS - CAPTCHA</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      min-height: 100%;
    }

    body {
      background-color: #5A9690;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: clamp(16px, 3vw, 32px);
      font-family: Arial, sans-serif;
    }

    .captcha-shell {
      width: min(92vw, 720px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(20px, 4vh, 40px);
    }

    .wmf-logo-container {
      width: min(78vw, 420px);
      aspect-ratio: 1 / 1;
      background-image: url('/graphic-assets/wmf-logo.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      flex-shrink: 0;
    }

    .turnstile-card {
      background-color: #F3F2EC;
      border-radius: 24px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    }

    .captcha-title {
      color: #432323;
      font-size: clamp(16px, 2.4vw, 22px);
      font-weight: 700;
      text-align: center;
    }

    .enter-button {
      background-color: #2F5755;
      border: none;
      border-radius: 999px;
      padding: 10px 28px;
      font-weight: 700;
    }

    .enter-button:hover {
      background-color: #244542;
    }

    .captcha-error {
      color: #8b0000;
      font-size: 14px;
      text-align: center;
    }

    @media (max-height: 700px) {
      .captcha-shell {
        gap: 16px;
      }

      .wmf-logo-container {
        width: min(52vw, 240px);
      }
    }
  </style>
</head>
<body>

  <div class="captcha-shell">
    <div class="wmf-logo-container"></div>

    <form class="turnstile-card" action="/verify-captcha.php" method="POST">
      <div class="captcha-title">Confirm you're not a bot</div>

      <?php if (isset($_GET["captcha"])): ?>
        <div class="captcha-error">
          CAPTCHA verification failed. Please try again.
        </div>
      <?php endif; ?>

      <div
        class="cf-turnstile"
        data-sitekey="0x4AAAAAADx8yaDzVgQlaBEL">
      </div>

      <button type="submit" class="btn btn-primary enter-button">
        Enter Site
      </button>
    </form>
  </div>

</body>
</html>