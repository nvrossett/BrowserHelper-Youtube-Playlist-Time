(function() {

    var timeSeconds = 0, 
        timeSecondsInAnotherSpeed = 0,
        playlist = document.querySelectorAll(".ytd-item-section-renderer ytd-playlist-video-renderer.ytd-playlist-video-list-renderer"),
        list = [],
        speed = 1.25

    function secondsIntime( timeSeconds ){
        var hours = ( parseInt((timeSeconds / 60) / 60) > 9 ) ? parseInt((timeSeconds / 60) / 60) : '0'+parseInt((timeSeconds / 60) / 60)
        var minutes = ( parseInt((timeSeconds / 60) % 60) > 9 ) ? parseInt((timeSeconds / 60) % 60) : '0'+parseInt((timeSeconds / 60) % 60)
        var seconds = ( parseInt((timeSeconds % 60)) > 9 ) ? parseInt((timeSeconds % 60)) : '0'+parseInt((timeSeconds % 60))

        return { hours : hours, minutes : minutes, seconds : seconds }
    }   

    function plural( label, time ){
        return (time>1) ? label+'s' : label;
    }        

    for(var i = 0; i < playlist.length; i++) {
        var video = playlist[i],
            title = video.querySelector('h3').innerText.trim(),
            time = video.querySelector('.ytd-thumbnail-overlay-time-status-renderer').innerHTML.trim()

        if ( time !== '' ){
            var seconds,
                timeParts = time.split(":"),
                theTime
                
                switch ( timeParts.length ) {
                    case 1:     seconds = parseInt(timeParts[0]);                                                                               break;
                    case 2:     seconds = (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]);                                               break;
                    case 3:     seconds = ((parseInt(timeParts[0]) * 60) * 60) + (parseInt(timeParts[1]) * 60) + parseInt(timeParts[2]);        break;                    
                }
                
            var currentTime = secondsIntime( seconds / speed )

            if ( currentTime.hours == 0 &&  currentTime.minutes == 0 &&  currentTime.seconds > 0 ){
                theTime = '00:'+currentTime.seconds
            } else if ( currentTime.hours == 0 &&  currentTime.minutes > 0 &&  currentTime.seconds > 0 ){
                theTime = currentTime.minutes+':'+currentTime.seconds
            } else if ( currentTime.hours > 0 &&  currentTime.minutes > 0 &&  currentTime.seconds > 0 ){
                theTime = currentTime.hours+':'+currentTime.minutes+':'+currentTime.seconds
            }  

            list.push({ 'Title': title, 'Time': time, 'Speed': speed, 'Time in Speed': theTime })


            timeSeconds += seconds;
            timeSecondsInAnotherSpeed += (seconds / speed);
        }
    }

    console.table( list )

    var currentTime = secondsIntime( timeSeconds )
    console.log('Normal Speed:', currentTime.hours + " " + plural('hour', currentTime.hours) +', ' + currentTime.minutes + " " + plural('minute', currentTime.minutes) + ' ' + "and" +' ' + currentTime.seconds + " " + plural('second', currentTime.seconds));

    var currentTimeInSpeed = secondsIntime( timeSecondsInAnotherSpeed )
    console.log('Speed ('+speed+'):',  currentTimeInSpeed.hours + " " + plural('hour', currentTimeInSpeed.hours) +', ' + currentTimeInSpeed.minutes + " " + plural('minute', currentTimeInSpeed.minutes) + ' ' + "and" +' ' + currentTimeInSpeed.seconds + " " + plural('second', currentTimeInSpeed.seconds));

})();