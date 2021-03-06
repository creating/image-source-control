jQuery(document).ready(function($) {
    isc_thumbnail_input_checkstate();
    isc_caption_checkstate();
    $('#source-on-image').click(function(){isc_caption_checkstate()});
    $('#use_authorname').click(function(){
        if ('disabled' == $('#byauthor').attr('disabled')) {
            $('#byauthor').removeAttr('disabled');
        } else {
            $('#byauthor').attr('disabled', 'disabled');
        }
    });
	$('#use-thumbnail').click(function(){
        if ('disabled' == $('#thumbnail-size-select').attr('disabled')) {
            $('#thumbnail-size-select').removeAttr('disabled');
        } else {
            $('#thumbnail-size-select').attr('disabled', 'disabled');
        }
    });
    $('#thumbnail-size-select').change(function(){isc_thumbnail_input_checkstate()});

    // debug function – load image-post relations
    // call post-image relation (meta fields saved for posts)
    $('#isc-list-post-image-relation').click(function(){
        // disable the button
        var button = this;
        button.disabled = true;

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'isc-post-image-relations',
                nonce: isc.ajaxNonce,
            },
            success:function(data, textStatus, XMLHttpRequest){
                // display return messages
                $('#isc-post-image-relations').html(data);
                button.disabled = false;
            },

            error: function(MLHttpRequest, textStatus, errorThrown){
                $('#isc-post-image-relations').html(errorThrown);
                button.disabled = false;
            }

        });
    });
    // call image-post relation (meta fields saved for posts)
    $('#isc-list-image-post-relation').click(function(){
        // disable the button
        var button = this;
        button.disabled = true;

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'isc-image-post-relations',
                nonce: isc.ajaxNonce,
            },
            success:function(data, textStatus, XMLHttpRequest){
                // display return messages
                $('#isc-image-post-relations').html(data);
                button.disabled = false;
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                $('#isc-image-post-relations').html(errorThrown);
                button.disabled = false;
            }
        });
    });
    // remove image-post index
    $('#isc-clear-index').click(function(){

        var areYouSure = confirm( isc_data.confirm_message );

        if( ! areYouSure ){
            return;
        }

        // disable the button
        var button = this;
        button.disabled = true;

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'isc-clear-index',
                nonce: isc.ajaxNonce,
            },
            success:function(data, textStatus, XMLHttpRequest){
                // display return messages
                $('#isc-clear-index-feedback').html(data);
                button.disabled = false;
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                $('#isc-clear-index-feedback').html(errorThrown);
                button.disabled = false;
            }

        });
    });
});

function isc_thumbnail_input_checkstate(){
    if ('custom' == jQuery('#thumbnail-size-select').val()) {
        jQuery('#custom-width').removeAttr('disabled').css('background-color', '#fff');
        jQuery('#custom-height').removeAttr('disabled').css('background-color', '#fff');
    } else {
        jQuery('#custom-width').attr('disabled', 'disabled').css('background-color', '#eee');
        jQuery('#custom-height').attr('disabled', 'disabled').css('background-color', '#eee');
    }
}

function isc_caption_checkstate() {
    if (false == jQuery('#source-on-image').prop('checked')) {
        jQuery('#source-pretext').attr('disabled', 'disabled').css('background-color', '#eee');
    } else {
        jQuery('#source-pretext').removeAttr('disabled');
        jQuery('#source-pretext').css('background-color', '#fff');
    }
}
