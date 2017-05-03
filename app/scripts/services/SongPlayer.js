(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
         
          /**
          * @desc assigns the current album
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();
          
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
                stopSong(song);
       }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
       });
 
            SongPlayer.currentSong = song;
     };
      
      /**
      * @function getSongIndex
      * @desc gets the index of a song from current album
      * @param {Object} song
      */    
      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
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
     * @function stopSong
     * @desc Stops song
     * @param {Object} song
     */     
     var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
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
       
     /**
     * @function songPlayer.previous
     * @desc plays the previous song
     */    
     SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;
         
        if (currentSongIndex < 0) {
            stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
     };
         
      /**
     * @function songPlayer.next
     * @desc plays the next song
     */      
     SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
         
        if (currentSongIndex >= currentAlbum.songs.length) {
            stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
 +          playSong(song);
        }
     };
        
     return SongPlayer;
         
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();