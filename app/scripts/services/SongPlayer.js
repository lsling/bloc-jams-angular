(function() {
     function SongPlayer() {
          var SongPlayer = {};
         
          /**
          * @desc sets current song
          * @type {Object}
          */
          var currentSong = null;
          
         /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
     
     /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
     var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
       }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
       });
 
            currentSong = song;
     };
      
     /**
     * @function playSong
     * @desc Plays song
     * @param {Object} song
     */     
     var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
     };
 
     /**
     * @function songPlayer.play
     * @desc Plays selected song or plays the paused song
     * @param {Object} song
     */     
     SongPlayer.play = function(song) {
 
        if (currentSong !== song) {
         setSong(song);
         playSong(song);
 
       } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        } 
     };

     /**
     * @function songPlayer.pause
     * @desc Pauses current song 
     * @param {Object} song
     */           
     SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
     };
        
     return SongPlayer;
         
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();