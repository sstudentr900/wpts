<?php
if(CustomFn::is_method('seach')){
    CustomFn::common_seach(4);
    exit();
}
if(CustomFn::is_method('edit_tinymce')){
    CustomFn::common_edit(4);
    exit();
}
include('html/component/baTemplate.php');
