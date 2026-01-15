// web/speech.js
(function () {
  window._currentRecog = null;

  window.startListening = function(onResult, onStatus, onError) {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return false;
    }

    try {
      var recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = document.documentElement.lang || 'en-US';

      recog.onresult = function(event) {
        var transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        try { onResult(transcript); } catch(e) {}
      };

      recog.onstart = function() { try { onStatus('listening'); } catch(e) {} };
      recog.onerror = function(e) { try { onError(e.message || e.error || String(e)); } catch(err) {} };
      recog.onend = function() { try { onStatus('notListening'); } catch(e) {} };

      recog.start();
      window._currentRecog = recog;
      return true;
    } catch (err) {
      try { onError(String(err)); } catch(e) {}
      return false;
    }
  };

  window.stopListening = function() {
    if (window._currentRecog) {
      try { window._currentRecog.stop(); } catch(e) {}
      window._currentRecog = null;
    }
  };
})();