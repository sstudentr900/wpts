<?php
// session_destroy();
// unset($_SESSION['baMemberID']);
FN::del_session('baMemberID');
header('Location:?a=balogin');
