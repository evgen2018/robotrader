$(document).ready(function(){
    // initSubmit();
    
    $('.openModalPop').click(function(e) {
        var modalContent = $(this).children().clone();
        $('#modalTemplate .modal-body').html(modalContent);
        $('#modalTemplate').modal({
            keyboard: false
        });
    });


    $('#modal-instructions').modal({
        keyboard: false,
        show: false
    });
    $('#openModalPopVid').click(function(e) {
        $('#modal-instructions').modal('show');
        player_vid3.pause();
        player_vid4.play();
    });
    $('#modal-instructions').on('hide.bs.modal',function(){
        player_vid4.pause();
        player_vid3.play();
    });

    $('.faqToggle').click(function(e) {
        $( this ).toggleClass('toggledFaqToggle');
        $( this ).parent().children('.collapse').collapse('toggle');

    });

    $.fn.preBind = function (type, data, fn) {
        this.each(function () {
            var $this = $(this);

            $this.bind(type, data, fn);

            var currentBindings = $this.data('events')[type];
            if ($.isArray(currentBindings)) {
                currentBindings.unshift(currentBindings.pop());
            }
        });
        return this;
    };

    //gaffit();
});

function gaffit(){
    var submitting = false;
    var subevent = false;

    $(document).on("submit","#caffForm",function(e){
        var _this = $(this);
        if(submitting) return true;
        if(subevent){
            e.preventDefault();
            return false;
        }
        subevent = true;
        e.preventDefault();

        var firstName = $('input[name="firstname"]',$(this)).val();
        var lastName = $('input[name="lastname"]',$(this)).val();
        var country = $('select[name="countryabbr"]',$(this)).val();
        var phonecc = $('input[name="prefix"]',$(this)).val();
        var phone = $('input[name="phone"]',$(this)).val();
        var email = $('input[name="email"]',$(this)).val();
        var password = $('input[name="password"]',$(this)).val();

        var data = {
            firstName: firstName,
            lastName: lastName,
            country: country,
            phonecc: phonecc,
            phone: phone,
            email: email,
            password: password
        }

        $.post('', data, function(res){
            if(res.code == 200){
                submitting = true;
                _this.submit();
                return true;
            } else {
                subevent = false;
                return false;
            }
        });

        return false;
    });


}

function initSubmit(){
    $('#bigForm').submit(function(e){
        e.preventDefault();

        $('button',$(this)).button('loading');

        // loading in
        $('.form-group',$(this)).hide();
        $('#loadingin').show();

        var query = $(this).serializeArray();

        $.ajax({
            url: '',
            method: 'POST',
            data: query,
        }).always(function(data){
            if(data.code == 200){
                $('#modal-robot').modal({
                    'backdrop': 'static',
                    'keyboard': false
                });
                $('#modal-robot').modal('show');
                // loadings screen
                // var robotdomain = "https://binaryinvestments.net/"+data.lang;
                var robotdomain = data.url; // "https://"+data.url+"/"+data.lang;
                var brandLogo =  '<img alt="Brand Logo" src="data:image/png;base64,'+data.logo+'" >';
                var brandName = data.name;

                $('#loading .infomsg').html(Translator.trans('Opening your account at the broker:<br><b>%brandName%</b><br>%brandLogo%', { 'brandLogo': brandLogo, 'brandName': brandName }));
                setTimeout(function(){
                    $('#loading .progress-bar').css('width','100%');
                }, 500);
                // $('#loading .prc span').text('100');
                setTimeout(function(){
                    $('#loading .infomsg').html(Translator.trans('You’re now beeing redirected to trading robot, where you can start trading with your broker:<br><b>%brandName%</b><br>%brandLogo%', { "robotdomain": robotdomain, 'brandLogo': brandLogo, 'brandName': brandName }));
                    conf = false;
                    var form = null;
                    if(data.email !== undefined){
                        form = $('<form method="post" action="'+robotdomain+'"><input type="text" name="email" value="'+data.email+'"><input type="text" name="password" value="'+data.password+'"><input type="text" name="lang" value="'+data.lang+'"></form>');
                    } else {
                        form = $('<form method="post" action="'+robotdomain+'"><input type="text" name="user" value="'+data.user+'"><input type="text" name="pass" value="'+data.pass+'"><input type="text" name="brand" value="'+data.brand+'"><input type="text" name="i" value="'+data.i+'"></form>');
                    }
                    if(data.video !== undefined) form.append($('<input type="text" name="video" value="'+data.video+'">'));
                    if(form !== null) form.appendTo('body').submit();
                },2000);

            } else if(data.code == 205){
                $('#modal-robot').modal({
                    'backdrop': 'static',
                    'keyboard': false
                });
                $('#modal-robot').modal('show');
                //
                //var robotdomain = "https://"+data.url+"/"+data.lang;
                var robotdomain = data.url;
                var brandLogo =  '<img alt="Brand Logo" src="data:image/png;base64,'+data.logo+'" >';
                var brandName = data.name;
                // $('#loading .infomsg').html(Translator.trans('Opening your account at the broker:<br><b>%brandName%</b><br>%brandLogo%', { 'brandLogo': brandLogo, 'brandName': brandName }));
                // setTimeout(function(){
                    $('#loading .progress-bar').css('width','100%');
                // }, 500);
                // $('#loading .infomsg').text(Translator.trans('Done! You’re now beeing redirected to %robotdomain%, where you can start trading.', { "robotdomain": robotdomain }));
                // $('#loadig .prc').text('');
                setTimeout(function(){
                    $('#loading .infomsg').html(Translator.trans('Your account with <b>%brandName%</b> already exists. You will be logged to the trading bot. Please wait...<br>%brandLogo%', { "robotdomain": robotdomain, 'brandLogo': brandLogo, 'brandName': brandName }));
                    conf = false;
                    var form = null;
                    if(data.email !== undefined){
                        form = $('<form method="post" action="'+robotdomain+'"><input type="text" name="email" value="'+data.email+'"><input type="text" name="lang" value="'+data.lang+'"></form>');
                    } else {
                        form = $('<form method="post" action="'+robotdomain+'"><input type="text" name="user" value="'+data.user+'"><input type="text" name="brand" value="'+data.brand+'"><input type="text" name="i" value="'+data.i+'"></form>');
                    }
                    if(data.video !== undefined) form.append($('<input type="text" name="video" value="'+data.video+'">'));
                    if(form !== null) form.appendTo('body').submit();
                },2000);
            } else {
                $('form button').button('reset');
                $('#modal-error .modal-body p').html('<div class="message">'+data.msg+'</div>');
                $('#modal-error').modal('show');
                // reset loading in
                $('#loadingin').hide();
                $('form .form-group').show();
            }
        });

        return false;
    });
}



$.validator.addMethod("regx", function(value, element, regexpr) {
    return regexpr.test(value);
}, "Das Passwort muss zwischen 6-12 Zeichen lang sein, einschließlich Buchstaben (AZ, az) und Ziffern (0-9). Ohne Sonderzeichen (^@()_#*+/\"?!=.{}~`&) und Leerzeichen");


$("#bigForm1").validate({

    rules:{

        first_name:{
            required: true,
            minlength: 1,
            maxlength: 64,
        },

        last_name:{
            required: true,
            minlength: 1,
            maxlength: 64,
        },

        email:{
            required: true,
            email: true,

        },

        phone:{
            required: true,
            number: true,
            minlength: 6,
            maxlength: 25,

        },

        password:{
            required: true,
            regx: /^\w*(?=\w*\d)(?=\w*[a-zA-z])\w*$/m,
            minlength: 6,
            maxlength: 12,
        }
    },

    messages:{

        first_name:{
            required: "Vornamen muss ausgefüllt sein",
            minlength: "Vornamen muss mindestens 6 sein",
            maxlength: "Vornamen darf maximal 12 sein",
        },

        last_name:{
            required: "Nachnamen muss ausgefüllt sein",
            minlength: "Nachnamen muss mindestens 6 sein",
            maxlength: "Nachnamen darf maximal 12 sein",
        },

        email:{
            required: "E-Mail muss ausgefüllt sein",
            email: "E-Mail muss eine gültige sein",
        },

        phone:{
            required: "Telefonnummer muss ausgefüllt sein",
            number: "Telefonnummer muss eine Zahl sein",
            minlength: "Telefonnummer darf mindestens 6 sein",
            maxlength: "Telefonnummer muss eine gültige sein",
        },

        password:{
            required: "Passwort  muss ausgefüllt sein",
            minlength: "Passwort muss mindestens 6 sein",
            maxlength: "Passwort darf maximal 12 sein",
        },

    },

    submitHandler: function(form, event) {
        event.preventDefault();
        var msg = $(form).serialize();
        var form = $("#bigForm1");
        form.find('.btn-success').text('Warten Sie mal...');
        var linkAdress = makeSendAdress();
        $.post(linkAdress, msg)
            .done(function(data){
                var obj_data = JSON.parse(data)
                adress_redir = obj_data.redirect;
                if( $(window).width() < 700) { window.location.href=adress_redir};
                $('#popUp').show();
                $('.btn_redir').attr('href', adress_redir);
            }).fail(function(jqXHR, textStatus, errorThrown) {
            obj_data = JSON.parse(jqXHR.responseText)
            for(key in obj_data.errors){alert(obj_data.errors[key])}
        });

    },

});


function makeSendAdress(){
    var tmp = location.hostname.replace(/[a-z]{2}\./,'');
    tmp = 'https://cabinet.' + tmp + '/api/register';
    return tmp;
}
