$(document).ready(function(){
    if(modal_crazy) initCrazyPopup();
});

var lic_time = Math.floor(Math.random() * (3000 - 2000)) + 2000;
function initSpot(){
    // licences
    setTimeout(function() {
        setTimeout(spotCountdown, lic_time);
    }, 3000); // 30000
}

function spotCountdown(){
    // spotsAvailable
    if(spotsAvailable == 1) spotsAvailable = 2;
    $('.videoFooter span').text(--spotsAvailable);


    $('#modal-spot h3').html(Translator.transChoice('{1} There is <span>%count% spot</span> available.|]1,Inf] There are <span>%count% spots</span> available.', spotsAvailable, {"count" : spotsAvailable}));
    // $('.spotLeftBadge').html(Translator.transChoice('{1} <strong>%count%</strong> Spot available. Hurry&nbsp;up!|]1,Inf] <strong>%count%</strong> Spots available. Hurry&nbsp;up!'. spotsAvailable, {"count" : spotsAvailable}));
    //$('.videoHeader h3 span').text(spotsAvailable+' '+(spotsAvailable > 1 ? 'spots' : 'spot'));

    /*
    $('#modal-spot .modal-body span').text(spotsAvailable+' '+(spotsAvailable > 1 ? 'spots' : 'spot'));
    $('.spotLeftBadge').html('<strong>'+spotsAvailable+'</strong> '+(spotsAvailable > 1 ? 'Spots' : 'Spot')+' available. Hurry up!');
    $('.videoHeader h3 span').text(spotsAvailable+' '+(spotsAvailable > 1 ? 'spots' : 'spot'));
    */

    Cookies.set('spots_available', spotsAvailable, { expires: 365 });

    if(spotsAvailable<15){
        lic_time = lic_time*2+(Math.floor(Math.random() * (10000 - 500)) + 500);
    } else {
        lic_time = Math.floor(Math.random() * (30000 - 500)) + 500;
    }
    setTimeout(spotCountdown, lic_time);
}

function initCountdownTime(){
    var visitTime = (new Date(new Date().valueOf() + 9*60*1000 + 45*1000)).getTime(); // 5 * 60 * 1000
    var counter = $('#modal-spot strong').countdown(visitTime, function(event){
        $(this).text(event.strftime('%M:%S'));
    });
    $('#modal-crazy strong').countdown(visitTime, function(event){
        $(this).text(event.strftime('%M:%S'));
    });
}

function initCrazyPopup(){
    var mp = 0;
    $('#modal-crazy').modal({
        show: false
    });
    $('#modal-crazy').on('hide.bs.modal',function(){
        /*$('body').css('background-color','#6CB74B');
        // NO $('body').css('background-image','url(bundles/lp/images_50kweek/bgGreenPattern.png)');
        $('.videoHeader h2').css('background-color','#FFD94D');
        $('.videoHeader h2').css('color','#333');
        $('.formInnerWrap a.btn').css('background-color','#FFD94D');
        $('.formInnerWrap a.btn').css('color','#333');
        $('.videoFooter h2').css('color','#333');
        $('.videoFooter h2 span').css('background-color','#E30613');
        $('.videoFooter h2 span').css('color','#fff');
        $('h1').css('color','#333');
        $('span.redHeadlineBox').css('color','#fff');
        //
        $('.videoHeader h2').text(Translator.trans('Congratulations you won!'));
        $('span.orangeText').remove();
        $('h1 .jhtxt').text(Translator.trans('You just won a free spot.'));
        $('.videoHeader h2').text(Translator.trans('Congratulations you won!'));
        $('.formInnerWrap a.btn').text(Translator.trans('CLAIM YOUR FREE SPOT'));*/
        //

        // if ( $( "#modalVideo" ).length ) {
            // $("#modalVideo").attr('src', $("#modalVideo").attr('src').replace("&autoplay=1", ""));
        // }

        if(typeof player_vid2 != 'undefined'){
            player_vid2.pauseVideo();
            player_vid1.playVideo();
        }

        spotsAvailable = 1;
        spotCountdown();
    });
    $('body').mouseleave(function(){
        if(
            $('#modal-spot').css('display') !== "block" &&
            mp < 150 &&
            modal_crazy
        ){
            modal_crazy = false;
            $('#modal-crazy').modal('show');
            initCountdownTime();
            // if ( $( "#modalVideo" ).length ) {
                // $("#modalVideo").attr('src', $("#modalVideo").attr('src') + "&autoplay=1");
            // }
            if(typeof player_vid1 != 'undefined'){
                player_vid1.pauseVideo();
                player_vid2.playVideo();
            }
        }
    });
    $(window).mousemove(function(e){
        mp = e.clientY;
    });
    $('#modal-crazy a').click(function(){
        conf = false;
        return true;
    });
}
