<?php
if(CustomFn::is_method('seach')){
    CustomFn::common_seach(1);
    exit();
}
if(CustomFn::is_method('edit_tinymce')){
    CustomFn::common_edit(1);
    exit();
}
include('html/component/baTemplate.php');
