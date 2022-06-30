<?php
// session_destroy();
// unset($_SESSION['baMemberID']);
CustomFn::del_session('baMemberID');
header('Location:?a=balogin');
