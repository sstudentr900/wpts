<?php
if(CustomFn::is_method('seach')){
    CustomFn::common_seach(3);
    exit();
}
if(CustomFn::is_method('edit_tinymce')){
    CustomFn::common_edit(3);
    exit();
}
include('html/component/baTemplate.php');
