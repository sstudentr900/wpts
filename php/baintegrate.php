<?php
if(FN::is_method('seach')){
    FN::common_seach(14);
    exit();
}
if(FN::is_method('edit_tinymce')){
    FN::common_edit(14);
    exit();
}
include('html/component/baTemplate.php');
