(function() {
     function SongPlayer() {
          var SongPlayer = {};
          
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
                SongPlayer.currentSong.playing = null;
       }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
       });
 
            SongPlayer.currentSong = song;
     };
      
      /**
      * @desc sets current song
      * @type {Object}
      */
      SongPlayer.currentSong = null;
         
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
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
         setSong(song);
         playSong(song);
 
       } else if (SongPlayer.currentSong === song) {
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
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
     };
        
     return SongPlayer;
         
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();