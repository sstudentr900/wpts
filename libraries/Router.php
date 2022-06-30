<?php
class Router
{
    private $routes = [
        "^([a-zA-Z0-9-_]+)\/?$",
        "^([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)\/?$",
        "^([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)\/?$",
        "^([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)\/?$"
    ];
    private $parameters=[];
    public function __construct($urls){
        //取得路徑
        // $url = str_replace(Config::ROUTE,'',$urls);
        $url = explode('/',$urls);//分割?/xx
        $url = explode('?',$url[1]);//分割?XX=XX
        foreach($this->routes as $route){
            //获取 URL 中的域名
            if(!preg_match('/'.$route.'/',$url[0],$matches))
                continue;
            $this->parameters = array_slice($matches,1);  //濾掉第一個
        }

    }
    public function getParameter($index){
        if(isset($this->parameters[($index-1)])){
            return $this->parameters[($index-1)];
        }else{
            return "";
        }
    }
}