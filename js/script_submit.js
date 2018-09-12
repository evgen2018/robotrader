function initL(){
    var submitting = false;
    $('#introFormModal, #introForm, #introFormBottom').on('submit',function(e){
        if(submitting) return true;

        e.preventDefault();
        submitting = true;

        var btn = $('button',$(this));
        var input = $('input[name="signin[email]"]',$(this));
        var data = $(this).serialize();
        var email = input.val();
        var form = $(this);
        // var gi = $('#gi').val();

        input.attr('disabled',true);
        btn.button('loading');
        $('#modal-spot,#modal-error').modal({
            backdrop: 'static',
            keyboard: false,
            show: false
        });

        $.post('',data,function(res){
            if(res.code == 200){
                conf = false;

                var c = "";
                $.each(location.search.substring(1).split('&'), function(index, value){
                    var arr = value.split('=');
                    if(arr[0] === "c") c = "&c";
                });

                form.attr('action',res.url+c)
                form.append($('<input type="hidden" name="YMP0" value="'+email+'">'));
                form.submit();
            } else if(res.code == 201) {
              var c = "";
              $.each(location.search.substring(1).split('&'), function(index, value){
                  var arr = value.split('=');
                  if(arr[0] === "c") c = "&c";
              });
              var thanks = res.url+c;
              var formi = $('<form method="post" action="https://www.aweber.com/scripts/addlead.pl"><input type="text" name="meta_web_form_id" value="1683059694"><input type="text" name="listname" value="awlist4382953"><input type="text" name="meta_adtracking" value="DE_5000_Jakub_Converting_team"><input type="text" name="redirect" value="'+thanks+'"><input type="text" name="email" value="'+email+'"></form>');
              return formi.appendTo('body').submit();
            } else {
                if(res.msg !== undefined) $('#modal-error p').text(res.msg);
                $('#modal-error').modal('show');
                input.prop('disabled',false);
                btn.button('reset');
            }
        });

        return false;
    });
}

$(document).ready(function(){
    initL();
});
