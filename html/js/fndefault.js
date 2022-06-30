window.passowdButton = function(o) {
    var input = o.nextElementSibling;
    var type = input.getAttribute('type')
    if(type =='password'){
        o.classList.add('active')
        input.setAttribute('type','text')
    }else{
        o.classList.remove('active')
        input.setAttribute('type','password')
    }
}
function menuButton(){
    var menuButton = document.querySelector('.menuButton');
    var body = document.querySelector('body');
    menuButton.addEventListener('click',function(){
        // console.log(menuButton.classList.contains('active'))
        if(menuButton.classList.contains('active')){
            menuButton.classList.remove('active')
            body.removeAttribute("style")
            
        }else{
            menuButton.classList.add('active')
            body.style.overflow='hidden'
        }
    })
}
function slide(){
    // console.log('slide')
    var slide = document.querySelector('.slide');
    var lis = slide.querySelectorAll('li');
    var liLength = lis.length;
    var pre = slide.querySelector('.pre');
    var next = slide.querySelector('.next');
    // var dot = slide.querySelector('.dot');
    var nowIndex = 0; 
    var slideAnimation = function(number){
        for(var i=0;i<liLength;i++){
            lis[i].classList.remove('active')
        }
        lis[number].classList.add('active')

    }
    pre.addEventListener('click',function(){
        // console.log('pre',nowIndex,liLength-1,liLength-1)
        nowIndex = nowIndex<1?liLength-1:nowIndex-1
        slideAnimation(nowIndex)
    })
    next.addEventListener('click',function(){
        // console.log('next',nowIndex,liLength-1,nowIndex>liLength-1)
        nowIndex = nowIndex>liLength-2?0:nowIndex+1
        slideAnimation(nowIndex)
    })
}
function getMenuText(o){
    var obj  = {
        'nowText':'',
        'parentText':'',
    }
    o.main.classList.add('fnpage');
    document.querySelectorAll('.publicMenu .menu ul a').forEach(function(item){
        if(item.attributes['href'].value.split("=")[1]==o.url_a){
            var parent = item.closest('ul').closest('li').querySelector('b')
            obj.nowText= item.textContent
            obj.parentText= parent.textContent
        }
    })
    return obj
}
function seach(o) {
    var page = o.page || 1
    var fd = new FormData()
    fd.append('method','seach')
    fd.append('page',page)
    o['ajax_form'] = fd
    return new Promise ((resolve,reject)=>{
        getAjax2(o).then(function(data) {
            if (data.result) {
                data['page'] = page
                resolve(data)
            } else {
                reject(data.message)
            }
        })
    })
}
function fnhome(o) {
    o.main.append(
        creatHtml({
            'tage': 'div',
            'cl': 'slide',
            'addHtml': [
                creatHtml({
                    'tage': 'ul',
                    'addHtml': o.silde.map(function(silde,index){
                        return  creatHtml({
                            'tage': 'li',
                            'cl': index==0?'active':'',
                            'addHtml': [
                                creatHtml({
                                    'tage': 'div',
                                    'cl':'text',
                                    'addHtml': [
                                        creatHtml({
                                            'tage': 'h2',
                                            'text': silde.title
                                        }),
                                        creatHtml({
                                            'tage': 'a',
                                            'attr': {'href': silde.src},
                                            'text': 'Watch Now'
                                        })
                                    ]
                                }),
                                creatHtml({
                                    'tage': 'img',
                                    'attr': {'src':'./html/img/baimg/'+silde.image}
                                })
                            ]
                        })
                    })
                }),
                creatHtml({
                    'tage': 'div',
                    'cl': 'control',
                    'addHtml': [
                        creatHtml({
                            'tage': 'div',
                            'cl': 'pre',
                            'text': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"></path></svg>'
                        }),
                        creatHtml({
                            'tage': 'div',
                            'cl': 'next',
                            'text': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"></path></svg>'
                        })
                    ]
                })
            ]
        }),
        creatHtml({
            'tage': 'div',
            'cl': 'container',
            'text': o.tinymce[0].tinymce
        })
    )
    slide()
}
function fncontact(o){
    var text = {
        'nowText': getMenuText(o).nowText,
        'parentText': getMenuText(o).parentText,
    }
    o['cl'] ='add'
    o['ajax_href'] ='https://script.google.com/macros/s/AKfycbzxGMJztyJxaXIROppzRpLdtDUvHocLY2jlG9h7yky8DH3NjFd7Wc8OMvUrrH5_DjyC/exec'
    o['message_handler']=function(){
        location.href='/'
    }
    o.main.append(
        creatHtml({
            'tage': 'div',
            'cl': 'pageTopImg',
            'addHtml': [
                creatHtml({
                    'tage': 'div',
                    'cl':'title',
                    'addHtml': [
                        creatHtml({
                            'tage': 'h3',
                            'text': '聯絡我們'
                        }),
                        creatHtml({
                            'tage': 'i',
                            'text': 'contact us'
                        })
                    ]
                }),
                creatHtml({
                    'tage': 'img',
                    'attr': {'src':'./html/img/fn_page_top_01.jpg'}
                })
            ]
        }),
        creatHtml({
            'tage': 'div',
            'cl': 'container',
            'addHtml': [
                creatHtml({
                    'tage': 'ul',
                    'cl': 'pageUrl',
                    'addHtml': [
                        (function(){
                            return creatHtml({
                                'tage': 'li',
                                'addHtml': creatHtml({
                                    'tage': 'a',
                                    'attr': {'href':'/'},
                                    'text': '首頁'
                                })
                            })
                        })(),
                        text.parentText?(function(){
                            return creatHtml({
                                'tage': 'li',
                                'addHtml': creatHtml({
                                    'tage': 'a',
                                    'attr': {'href':'#'},
                                    'text': text.parentText
                                })
                            })
                        })():'',
                        (function(){
                            return creatHtml({
                                'tage': 'li',
                                'addHtml': creatHtml({
                                    'tage': 'a',
                                    'attr': {'href':'?a='+o.url_a},
                                    'text': text.nowText
                                })
                            })
                        })()
                    ]
                }),
                creatHtml({
                    'tage': 'div',
                    'cl': 'content fnfrom',
                    'addHtml': from_html(o)
                })
            ]
        })
    )
}
function creatTemplate(o){
    var text = {
        'nowText': getMenuText(o).nowText,
        'parentText': getMenuText(o).parentText,
        'fnabout':{'i':'Case Studies','src':'./html/img/fn_page_top_01.jpg'},
        'fnpurpose':{'i':'Business purpose','src':'./html/img/fn_page_top_01.jpg'},
        'fnquestion':{'i':'System problems','src':'./html/img/fn_page_top_02.jpg'},
        'fnintroduction':{'i':'introduction','src':'./html/img/fn_page_top_02.jpg'},
        'fnparallel_system':{'i':'Parallel system','src':'./html/img/fn_page_top_02.jpg'},
        'fnsave_system':{'i':'energy storage system','src':'./html/img/fn_page_top_02.jpg'},
        'fnindependence_system':{'i':'stand alone system','src':'./html/img/fn_page_top_02.jpg'},
        'fnillustrate':{'i':'illustrate','src':'./html/img/fn_page_top_03.jpg'},
        'fncustom_serve':{'i':'custom serve','src':'./html/img/fn_page_top_03.jpg'},
        'fnroutine_serve':{'i':'routine serve','src':'./html/img/fn_page_top_03.jpg'},
        'fnadvanced_serve':{'i':'advanced serve','src':'./html/img/fn_page_top_03.jpg'},
        'fnfunction':{'i':'function','src':'./html/img/fn_page_top_04.jpg'},
        'fnarchitecture':{'i':'architecture','src':'./html/img/fn_page_top_04.jpg'},
        'fnintegrate':{'i':'integrate','src':'./html/img/fn_page_top_04.jpg'},
        'fnmaintain_case':{'i':'maintain case','src':'./html/img/fn_page_top_05.jpg'},
        'fnarchitecture_case':{'i':'architecture case','src':'./html/img/fn_page_top_05.jpg'},
    }
    o.main.append(
        creatHtml({
            'tage': 'div',
            'cl': 'pageTopImg',
            'addHtml': [
                creatHtml({
                    'tage': 'div',
                    'cl':'title',
                    'addHtml': [
                        creatHtml({
                            'tage': 'h3',
                            'text': text.nowText
                        }),
                        creatHtml({
                            'tage': 'i',
                            'text': text[o.url_a].i
                        })
                    ]
                }),
                creatHtml({
                    'tage': 'img',
                    'attr': {'src':text[o.url_a].src}
                })
            ]
        }),
        creatHtml({
            'tage': 'div',
            'cl': 'container',
            'addHtml': [
                creatHtml({
                    'tage': 'ul',
                    'cl': 'pageUrl',
                    'addHtml': [
                        (function(){
                            return creatHtml({
                                'tage': 'li',
                                'addHtml': creatHtml({
                                    'tage': 'a',
                                    'attr': {'href':'/'},
                                    'text': '首頁'
                                })
                            })
                        })(),
                        text.parentText?(function(){
                            return creatHtml({
                                'tage': 'li',
                                'addHtml': creatHtml({
                                    'tage': 'a',
                                    'attr': {'href':'#'},
                                    'text': text.parentText
                                })
                            })
                        })():'',
                        (function(){
                            return creatHtml({
                                'tage': 'li',
                                'addHtml': creatHtml({
                                    'tage': 'a',
                                    'attr': {'href':'?a='+o.url_a},
                                    'text': text.nowText
                                })
                            })
                        })()
                    ]
                }),
                creatHtml({
                    'tage': 'div',
                    'cl': 'content',
                    'text': o.tinymce[0].tinymce
                })
            ]
        })
    )
}
window.onload = function(){
    seach({}).then((o)=>{
        o['url_a'] = getUrl('a'), 
        o['main'] = document.querySelector('.publicMain')
        o['main'].innerHTML='';
        document.querySelector('.fn').classList.add(o['url_a']);
        if(o['url_a']=='fnhome'){
            fnhome(o)
        }else if(o['url_a']=='fncontact'){
            fncontact(o)
        }else{
            creatTemplate(o)
        }
        menuButton()
        loadClose()
    })
}
