<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>mini game</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>Level Up </h1>
  <p>Zorg goed voor je karakter!</p>

  <h2 id="level">Level 1</h2>
  <p id="status" class="tekst">Je hebt energie nodig, verzamel eten.</p>

  <div>
    <label>Energie</label>
    <meter 
    id="energie" 
    min="0"
    max="10"ƒ
    value="5"
    ></meter>
  </div>

  <div>
    <label>Rust</label>
    <meter id="rust" min="0" max="10" value="5"></meter>
  </div>

<div class="karakter">
  <div class="oog"></div>
  <div class="oog"></div>
</div>

  <div>
    <button id="eten">Eten </button>
    <button id="slapen">Slapen </button>
    <button id="rave">rave </button>
  </div>

  <div id="eten-object" class="klik-object"></div>
  <audio id="rave-audio" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>
  <script src="script.js"></script>
</body>
</html>
