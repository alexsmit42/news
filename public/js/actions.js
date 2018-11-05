$(document).ready(function(){

    $('.article-publish button').click(function() {
        let actionType = $(this).attr('id');

        $('[name="type"]').val(actionType);

        // return false;
    });
});