(function($){

    var pluginName = "comment_box",
        defaults = {
            commentPostUrl: '#',
            method:'POST'
        };

    function Plugin(element, options){
        this.element = element;
        this.settings = $.extend({},defaults,options);
        this.init();
        this.working();
    }

    Plugin.prototype = {
        init: function(){
            var self = this;
            var buttons = '<div class="row commentBox">'+
                '<div class="col-md-12">'+
                    '<div class="well quickReview">How did you find this product ? Share Your Experience..</div>'+
                    '<div class="review-container well well-sm collapse">'+
                    '<form class="commentForm" action="'+this.settings.commentPostUrl+'" method="'+this.settings.method+'">'+
                        '<h6>YOUR COMMENT</h6>'+
                        '<div class="rating pull-right"></div><hr>'+
                        '<input type="text" name="comment_box_title" class="hidden comment_box_title">'+
                        '<input type="file" accept="image/*" class="hidden commentImageUploadField">'+
                        '<div class="commentImageUpload"></div>'+
                        '<div class="contentEditableDiv commentBoxCommentTitle" contenteditable="true"><span>Title</span></div><hr>'+
                        '<textarea class="hidden comment_box_comment" rows="5" name="comment_box_comment" ></textarea>'+
                        '<div class="contentEditableDiv commentBoxComment" contenteditable="true"><span>Your Comment Here ..</span></div><hr>'+
                        '<a href="javascript:void(0)" class="close-review" data-original-title="" title="">Cancel</a>'+
                        '<input type="submit" value="POST" class="btn btn-primary pull-right" id="post-review-button" data-loading="Adding Your Review.." >'+
                        '<div class="clearfix"></div>'+
                    '</form>'+
                '</div>'+
            '</div>';
            self.element.append(buttons);
            //$('.rating').raty();
        },

        working: function(){
            var self = this;
            var currentVal = "";

            $('.quickReview').on('click',function(){
                $(this).next().removeClass('collapse');
                $(this).addClass('collapse');
            });
            $('.close-review').on('click',function(){
                $(this).parent().parent().addClass('collapse');
                $(this).parent().parent().prev().removeClass('collapse');
                $(this).parent().find('.commentForm')[0].reset();
            });
            var commentBoxCommentTitle = $('.commentBoxCommentTitle'),
                commentBoxComment = $('.commentBoxComment');
            commentBoxCommentTitle.on('focus',function(){
                $(this).removeClass("error");
               if($(this).html() == "<span>Title</span>"){
                   $(this).html("");
               }
            });
            commentBoxCommentTitle.on('blur',function(){
                if($(this).html().trim() == ""){
                    $(this).addClass("error");
                    $(this).html("<span>Title</span>");
                }
            });

            commentBoxComment.on('focus',function(){
                $(this).removeClass("error");
                if($(this).html() == "<span>Your Comment Here ..</span>"){
                    $(this).html("");
                }
            });

            commentBoxComment.on('blur',function(){
                if($(this).html().trim() == ""){
                    $(this).addClass("error");
                    $(this).html("<span>Your Comment Here ..</span>");
                }
            });

            $('.commentImageUpload').on('click',function(){
                $(this).prev().trigger( "click" );
            });

            $('.commentImageUploadField').on('change',function(){
                readURL(this);
            });

            $('.commentForm').on('submit', function () {
                var form = $(this),
                    commentTitle = form.find(".commentBoxCommentTitle"),
                    comment = form.find(".commentBoxComment"),
                    validationFlag = 1;
                if(commentTitle.html() == "" || commentTitle.html() == "<span>Title</span>"){
                    commentTitle.addClass("error");
                    validationFlag = 0;
                }else{
                    form.find('.comment_box_title').val(commentTitle.html());
                }
                if(comment.html() == "" || comment.html() == "<span>Your Comment Here ..</span>"){
                    comment.addClass("error");
                    validationFlag = 0;
                }else{
                    form.find('.comment_box_comment').val(comment.html());
                }
                return (validationFlag) ? true : false ;
            });

            function readURL(input) {

                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    var imageStr = "";
                    reader.onload = function (e) {
                        imageStr = '<div class="row commentImage">'+
                            '<div class="col-md-4">'+
                                '<img src="'+ e.target.result+'" class="img-responsive" />'+
                            '</div>'+
                        '</div>';
                        if(commentBoxComment.html() == "<span>Your Comment Here ..</span>"){
                            commentBoxComment.html("");
                        }
                        commentBoxComment.append(imageStr);
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
    };

    $.fn[pluginName] = function(options){
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
        return this;
    };
}(jQuery));