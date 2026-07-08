<?php
require_once __DIR__ . "/includes/captcha-gate.php";
?>

<!--GAME INTERFACE AFTER INDEX.HTML-->
<!DOCTYPE html>
<html>
<head>
  <title>WMF OPS</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="Billie Jean.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">


</head>
<body>
  <div class="game-container" alt="game-container">
      <div class="fader1"></div>
      <div class="fader2"></div>
      <div class="fader3"></div>
      <div class="fader4"></div>
      

    
           <canvas id="health-bar"></canvas>
           <canvas id="death-bar"></canvas>
 
    <div class="countdown"></div>
      <div class="game-background"></div>
        <div class="Gameplay-UI"></div>
          <div class="Enemy-Sprite-Container"></div>
            <div class="Main_Character"></div>
              <div class="console"></div>
                </div> 
  
  
              <div class="expressions"></div>

   <script>
  window.APP_CONFIG = {
    apiBase: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:6015'
      : '/api',
    soundBase: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : '/sound'
  };
</script>          
  <script src="GameStatsObject.js"></script>
  <script src="winners-list-dllclass.js"></script>
  <script src="health-bar.js"></script>
  <script src="collision.js"></script>
  <script src="timer.js"></script>
  <script src="Main-Enemy.js"></script>
  <script src="doubt-Phrase-object.js"></script>
  <script src="enemies.js"></script>
  <script src="DJUMC.js"></script>
  <script src="button-module.js"></script>
  <script src="game-rules.js"></script>
  <script src="game-over-overlay.js"></script>
  
  
</body>
</html>
