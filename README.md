# JQuery Comment Box


A very lightweight JQuery Plugin that gives and Awesome Comment Box with feature of Image Addition in the comment.
The image does not gets uploaded to the server but gets attached in the comment as the part of the comment itself. 


# Usage
Usage of this Plugin is vbery Simple. Just Include the JS and CSS Files in your Page using the following piece of Code.

<!-- Include the CSS File-->
<link rel="stylesheet" href="css/comment_box.css"/>

<!-- Included the JS file After your jquery.min.js -->
<script src="js/comment_box.js"></script>

Create a fiv on your Page. 
<div class="commentBox"></div>

Attach the Plugin to this Div using the simple line of code. 

<script type="text/javascript">
  $('.commentBox').comment_box({
    commentPostUrl: "addComment.php"
  });
</script>

In your addComment.php File you can get the post values simply.. 
<?php 

//this is addcomment.php
echo $_POST['comment_box_title']; //this  will echo title
echo $_POST['comment_box_comment']; //this will print the comment


ENJOY !!!

Just add a realy cool comment box in your page.
