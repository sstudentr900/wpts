<?php
class Database{
    private static $instance;
    private function __construct(){}
    private static function getInstance(){
        if(!isset(self::$instance)){
            self::$instance = new DatabaseAccessObject(
                MYSQL_HOST,
                MYSQL_USERNAME,
                MYSQL_PASSWORD,
                MYSQL_DBNAME
            );
        }
    }
    public static function get(){
        self::getInstance();
        if(isset(self::$instance)){
            return self::$instance;
        }else{
            return NULL;
        }
    }
}