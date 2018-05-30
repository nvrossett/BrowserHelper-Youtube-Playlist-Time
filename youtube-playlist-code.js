(function() {

    var timeSeconds = 0,
        timestampDivList = document.querySelectorAll(".ytd-playlist-video-list-renderer .ytd-thumbnail-overlay-time-status-renderer")  
          

    for(var i = 0; i < timestampDivList.length; i++) {
        var timestampDiv = timestampDivList[i],
            timeStr = timestampDiv.innerHTML

        if ( timeStr !== '' ){
            var seconds,
                timeParts = timeStr.split(":"),                

            switch ( timeParts.length ) {
                case 1:     seconds = parseInt(timeParts[0]);                                                                               break;
                case 2:     seconds = (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]);                                               break;
                case 3:     seconds = ((parseInt(timeParts[0]) * 60) * 60) + (parseInt(timeParts[1]) * 60) + parseInt(timeParts[2]);        break;                    
            }

            timeSeconds += seconds;
        }
    }

    var hours = parseInt((timeSeconds / 60) / 60),
        minutes = parseInt((timeSeconds / 60) % 60),
        seconds = parseInt((timeSeconds % 60))

    function plural( label, time ){
        return (time>1) ? label+'s' : label;
    }

    alert(hours + " " + plural('hour', hours) +', ' + minutes + " " + plural('minute', minutes) + ' ' + "and" +' ' + seconds + " " + plural('second', seconds));

})();