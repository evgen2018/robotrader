var player_vid1;
var player_vid2;
var conf = true;

if($('#vid1').length > 0){
    var options1 = {
        url: 'https://vimeo.com/186404383/fb6e473c99',
        width: 560,
        loop: false,
        autoplay: autoplay,
        volume:100
    };
    var player_vid1 = new Vimeo.Player('vid1', options1);
    player_vid1.setVolume(100);
    player_vid1.on('play', function() {
        console.log('played the video!');
    });
}

if($('#vid2').length > 0){
    var options2 = {
        url: 'https://vimeo.com/186404673/82791be20d',
        width: 560,
        loop: false,
        autoplay: false,
        volume:100
    };
    var player_vid2 = new Vimeo.Player('vid2', options2);
    player_vid2.setVolume(100);
    player_vid2.on('play', function() {
        console.log('played the video!');
    });
}
