function creatHtml (o) {
    var tage = o.tage || ''
    var text = o.text || ''
    var cl = o.cl || ''
    var attr = o.attr || ''
    var addHtml = o.addHtml || ''
    var method = o.method || 'click'
    var handler = o.handler || ''
    var handler2 = o.handler2 || ''
    var method2 = o.method2 || method
    var html = document.createElement(tage)
    if (text) {
        html.innerHTML = text
    }
    if (cl) {
        html.className = cl
    }
    if (attr) {
        attr = Array.isArray(attr) ? attr : [attr]
        attr.forEach((element) => {
                Object.keys(element).forEach((item, i) => {
                    html.setAttribute(item, element[item])
                })
            })
            // for(var i=0;i<attr.length;i++){
            //     html.setAttribute(attr[i]['n'],attr[i]['v'])
            // }
    }
    if (addHtml) {
        addHtml = Array.isArray(addHtml) ? addHtml : [addHtml]
        addHtml.forEach(element => html.append(element))
    }
    if (handler) {
        html.addEventListener(method, handler.bind(html), false)
    }
    
    if (handler2) {
        window.addEventListener(method2, handler2, false)
    }
    return html;

}
function loadShow(fn) {
    
    var customload = document.querySelector('.publicLoad');
    // console.log(customload)
    customload?customload.classList.add('active'):''
    if (fn)fn()
}
function loadClose(fn) {
    var customload = document.querySelector('.publicLoad')
    customload?customload.classList.remove('active'):''
    if (fn)fn()
}
function getUrl(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function getAjax(o) {
    var u = o.u || location.href,
        m = o.m || 'post',
        form = o.form || '', //document.getElementById('idname')
        value = o.value || ''; //add form value=>[{'n':'v'},{'n':'v'}]
    // console.log(o.u)    
    return new Promise(function(resolve, reject) {
        var fd = new FormData();
        if (form) {
            fd = new FormData(form);
        }
        if (value) {
            value.forEach(function(v, k) {
                fd.append(Object.keys(v)[0], v[Object.keys(v)[0]])
            })
        }
        var xhr = new XMLHttpRequest();
        xhr.open(m, u, true);
        xhr.onload = function() {
            //console.log(xhr.responseText);
            resolve(JSON.parse(xhr.responseText))
        };
        xhr.onerror = function() {
            reject(JSON.parse(xhr.statusText))
        };
        xhr.send(fd);
    });
}
function getAjax2(o) {
    var u = o.ajax_href || location.href,
        m = o.ajax_method || 'post',
        fd = o.ajax_form || new FormData()
    // for (var pair of fd.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(m, u, true);
        xhr.onload = function() {
            // console.log(xhr.responseText);
            resolve(JSON.parse(xhr.responseText))
        };
        xhr.onerror = function() {
            reject(JSON.parse(xhr.statusText))
        };
        xhr.send(fd);
    });
}
function getImgHref() {
    var a = getUrl('a')
    if (!a.indexOf('ba')) {
        return './html/img/baimg/';
    } else {
        return './html/img/';
    }
}
function passowdButton(obj){
    var input = obj.nextSibling.nextSibling
   if(obj.classList.contains('active')){
        obj.classList.remove('active')
        input.setAttribute('type','password')
   }else{
        obj.classList.add('active')
        input.setAttribute('type','text')
   }
}
function creatPageNumberX(o) {
    var p = o.p;
    var pn = o.pn;
    var t = o.d['totle'] || ''; //總數
    var fn = o.fn || 'seach'; //函數
    var $row = '';
    var $active = '';
    var $Total = Math.ceil(t / pn); // 總頁數
    var $search = o.search ? ",a:{'search':'" + o.search + "'}" : '';
    if (p >= 2) {
        $row += ' <li class="page-item">' +
            '<a class="page-link" onclick="' + fn + '({p:' + (p - 1) + $search + '})">上一頁</a>' +
            '</li>';
    } //上頁
    if ($Total < 10) {
        //頁數少
        for (var $i = 1; $i <= $Total; $i++) {
            $i == p ? $active = 'page-item active' : $active = '';
            $row += '<li class="' + $active + '"><a class="page-link" onclick="' + fn + '({p:' + $i + $search + '})">' + $i + '</a></li>';
        }
    } else {
        //頁數多
        var s = p - 1;
        var e = p * 1 + 1;
        if (p > 2) {
            $row += '<li class="page-item"><a class="page-link">...</a></li>';
        }
        if (p == 1) {
            s = 1;
            e += 1;
        }
        if (p == $Total) {
            s -= 1;
            e = $Total;
        }
        for (var $i = s; $i <= e; $i++) {
            $i == p ? $active = 'page-item active' : $active = '';
            $row += '<li class="' + $active + '"><a class="page-link" onclick="' + fn + '({p:' + $i + $search + '})">' + $i + '</a></li>';
        }
        if (p < $Total - 1) {
            $row += '<li class="page-item"><a class="page-link">...</a></li>';
        }
    } //中間
    if (p < $Total) {
        $row += '<li class="page-item">' +
            '<a class="page-link" onclick="' + fn + '({p:' + (p + 1) + $search + '})">下一頁</a>' +
            '</li>';
    } //下頁
    var ul = $('<ul class="list-inline" id="ProductsPage"></ul>').append($row);
    var ProductsPage = $('<div class="ProductsPage"></div>').append(ul);
    return ProductsPage;
}
function creatPageNumberXX(o) {
    var p = o.p;
    var pn = o['pn'];
    var t = o['totle'] || ''; //總數
    var fn = o.fn || 'seach'; //函數
    var $row = '';
    var $Total = Math.ceil(t / pn); // 總頁數
    var $search = o.search ? ",a:{'search':'" + o.search + "'}" : '';
    //上頁
    var previous = '';
    if (p >= 2) {
        previous = fn + '({p:' + (p - 1) + $search + '})'
    }
    $row += '<li>' +
        '<a class="previous" onclick="' + previous + '"></a>' +
        '</li>';
    //中間
    $row += '<li><a>' + p + ' / ' + $Total + '</a></li>';
    //下頁
    var next = ''
    if (p < $Total) {
        next = fn + '({p:' + (p + 1) + $search + '})'
    }
    $row += ' <li>' +
        '<a class="next" onclick="' + next + '"></a>' +
        '</li>';
    var ul = $('<ul class="list-inline" id="ProductsPage"></ul>').append($row);
    var ProductsPage = $('<div class="ProductsPage"></div>').append(ul);
    return ProductsPage;
}
function creatPageNumber(o) {
    var p = o.p;
    var pn = o['pn'];
    var t = o['totle'] || ''; //總數
    var fn = o.fn || 'seach'; //函數
    var $Total = Math.ceil(t / pn); // 總頁數
    return creatHtml({
        'tage': 'div',
        'cl':'ProductsPage',
        'addHtml':[
            creatHtml({
                'tage': 'ul',
                'addHtml':[
                    creatHtml({
                        'tage': 'li',
                        'addHtml':creatHtml({
                            'tage': 'a',
                            'cl':'previous',
                            'handler': p >= 2?()=>{
                                window[fn]({'p': p - 1})
                            }:''
                        }),
                    }),
                    creatHtml({
                        'tage': 'li',
                        'addHtml':creatHtml({
                            'tage': 'a',
                            'text': p + ' / ' + $Total
                        }),
                    }),
                    creatHtml({
                        'tage': 'li',
                        'addHtml':creatHtml({
                            'tage': 'a',
                            'cl':'next',
                            'handler': p < $Total?()=>{
                                window[fn]({'p': p + 1})
                            }:''
                        }),
                    })
                ]
            })
        ]
    })
}
function public_page(o) {
    var p = o.page;
    var pn = o['pn'];
    var t = o['totle'] || ''; //總數
    var fn = o.fn || 'seach'; //函數
    var total = Math.ceil(t / pn); // 總頁數
    if(total<=1)return'';
    return creatHtml({
        'tage': 'div',
        'cl':'ProductsPage',
        'addHtml':[
            creatHtml({
                'tage': 'ul',
                'addHtml':[
                    creatHtml({
                        'tage': 'li',
                        'addHtml':creatHtml({
                            'tage': 'a',
                            'cl':'previous',
                            'handler': p >= 2?()=>{
                                window[fn]({'p': p - 1})
                            }:''
                        }),
                    }),
                    creatHtml({
                        'tage': 'li',
                        'addHtml':creatHtml({
                            'tage': 'a',
                            'text': p + ' / ' + total
                        }),
                    }),
                    creatHtml({
                        'tage': 'li',
                        'addHtml':creatHtml({
                            'tage': 'a',
                            'cl':'next',
                            'handler': p < total?()=>{
                                window[fn]({'p': p + 1})
                            }:''
                        }),
                    })
                ]
            })
        ]
    })
}
function from_close(o){
    document.querySelector('body').classList.remove("overflow")
    var overlaymodal = document.querySelector('.overlaymodal')
    if(overlaymodal) overlaymodal.remove()
    if(o && o.handler) o.handler()
}
function from_img_src(o){
    var src = o.src||''
    var getRandom = function(x){
        return Math.floor(Math.random()*x);
    };
    return './html/img/baimg/'+ src +'?v='+getRandom(100)
}
function from_error_remove_all(){
    var errors = document.querySelectorAll('.myForm .puplicError')
    if(errors){
        errors.forEach(function(error){
            error.remove()
        })
    }
}
function from_error_remove(obj){
    var parent = obj.closest('div')
    if(parent.querySelector('span')){
        parent.querySelector('span').remove()
    }
    return parent;
}
function from_error_creat(obj,text,callback){
    obj.append(creatHtml({
        'cl': 'puplicError',
        'tage':'span',
        'text': text
    }))
    // console.log(12)
    if(callback){
        callback(obj)
    }
}
function from_img_clear(obj){
    obj.classList.remove('active')
    obj.querySelector('input[type="hidden"]').value = "";
    obj.querySelector('input[type="file"]').value = "";
}
function from_img_close(){
    var img = this.closest('.img')
    img.querySelector('img').setAttribute("src","")
    var imgDiv = this.closest('.imgDiv')
    from_img_clear(imgDiv)
} 
function from_img(table){
    var parent = from_error_remove(this)
    var imgSizeNumber = table.rules.weight*1048576
    var file = this.files[0]; //大小
    var type = file.type.split('/')[1]; //類型
    var file2Image = function(file,callback){
        var image = new Image();
        var url = URL.createObjectURL(file);
        image.onload = function() {
            callback(image);
            URL.revokeObjectURL(url);
        };
        image.src = url;
    }
    if (!(type == 'jpeg' || type == 'jpg' || type == 'png')) {
        from_error_creat(parent,'錯誤 : 圖片類型只能是 jpg , jpeg , png',from_img_clear)
        return;
    }
    if (imgSizeNumber<=file.size) {
        from_error_creat(parent,table.messages.weight,from_img_clear)
        return;
    }
    file2Image(file, function(img) {
        if (img.width!=table.rules.size.width || img.height!=table.rules.size.height) {
            from_error_creat(parent,table.messages.size,from_img_clear)
            return;
        }
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        //img
        parent.classList.add("active")
        parent.querySelector('.img img').setAttribute("src",canvas.toDataURL("image/jpeg", 0.9))
        parent.querySelector('#image').value=canvas.toDataURL("image/jpeg", 0.9)
    })
} 
async function from_verify(o){
    var error = true;
    var tables = o.tables || '';
    var handler = o.handler || '';
    var formData = new FormData();
    for(let j = 0; j < tables.length; j++) {
        var table = tables[j]
        if(!table.rules)continue;
        var obj = document.querySelector('input[name='+table.i+']')
        if(!obj){
            var textarea = document.querySelector('textarea[name='+table.i+']')
            if(textarea){
                obj = textarea
            }else{
                continue;
            }
        }
        //is_release
        if(table.rules.is_release){
            obj = document.querySelector('input[name='+table.i+']:checked')
            var parent = from_error_remove(obj)
            if(!obj){
                from_error_creat(parent,table.messages.is_release)
                error = false;
                continue;
            }
        }
        if(table.rules.maxlength){
            var parent = from_error_remove(obj)
            if(obj.value.length>table.rules.maxlength){
                from_error_creat(parent,table.messages.maxlength)
                error = false;
                continue;
            }
        }
        if(table.rules.minlength){
            var parent = from_error_remove(obj)
            if(obj.value.length<table.rules.minlength){
                from_error_creat(parent,table.messages.minlength)
                error = false;
                continue;
            }
        }
        if(table.rules.email){
            var re = /\S+@\S+\.\S+/;
            var parent = from_error_remove(obj)
            if(!re.test(obj.value)){
                from_error_creat(parent,table.messages.email)
                error = false;
                continue;
            }
        }
        if(table.rules.phone){
            // var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
            var parent = from_error_remove(obj)
            if(isNaN(obj.value)){
                from_error_creat(parent,table.messages.phone)
                error = false;
                continue;
            }
        }
        //required
        if(table.rules.required){
            var parent = from_error_remove(obj)
            if(!obj.value){
                from_error_creat(parent,table.messages.required)
                error = false;
                continue;
            }
        }
        //check_email
        if(table.rules.check_email){
            var parent = from_error_remove(obj)
            await getAjax2({ 'ajax_href': '?a='+getUrl('a')+'&account_'+o.cl+'='+obj.value,'ajax_method':'get' }).then(function(data) {
                if(!data){
                    from_error_creat(parent,table.messages.check_email)
                    error = false;
                }
            })
        }
        formData.append(table.i,obj.value)
    }
    if(error){
        handler(formData)
    }
}
function from_html(o){
    var tables = o.tables || '';
    var array = []
    tables.forEach(function(table){
        table.t=="text"&&o.cl!='modify_password'?(function(){
            var attr = {'id':table.i,'name':table.i,'type':table.t,'placeholder':o.customText.please+table.n}
            o.cl=='modify'? Object.assign(attr,{'value': o.row[o.index][table.i] }) : attr
            array.push(creatHtml({
                'tage': 'div',
                'addHtml':[
                    creatHtml({
                        'tage':'label',
                        'attr':{'for':table.i},
                        'text': table.n,
                    }),
                    creatHtml({
                        'tage':'div',
                        'addHtml': creatHtml({
                            'tage':'input',
                            'attr': attr,
                        })
                    })
                ]
            }))
        })():table.t=="textarea"&&(o.cl!='modify_password')?(function(){
            var attr = {'id':table.i,'name':table.i,'placeholder':o.customText.please+table.n}
            array.push(creatHtml({
                'tage': 'div',
                'addHtml':[
                    creatHtml({
                        'tage':'label',
                        'attr':{'for':table.i},
                        'text': table.n,
                    }),
                    creatHtml({
                        'tage':'div',
                        'addHtml': creatHtml({
                            'tage':'textarea',
                            'attr': attr,
                        })
                    })
                ]
            }))    
        })():table.t=="password"&&(o.cl=='modify_password'||o.cl=='add')?(function(){
            var attr = {'id':table.i,'name':table.i,'type':table.t,'placeholder':o.customText.please+table.n,'autocomplete':'current-password'}
            array.push(creatHtml({
                'tage': 'div',
                'addHtml':[
                    creatHtml({
                        'tage':'label',
                        'attr':{'for':table.i},
                        'text': table.n,
                    }),
                    creatHtml({
                        'tage':'div',
                        'addHtml': creatHtml({
                            'tage':'input',
                            'attr': attr,
                        })
                    })
                ]
            }))
        })():table.t=="file"&&o.cl!='modify_password'?(function(){
            var attr = {'id':table.i,'name':table.i,'type':'hidden'}
            var imgDiv_cl = o.cl=='modify'?'imgDiv active':'imgDiv'
            var img_attr = o.cl=='modify'?{'src':from_img_src({'src':o.row[o.index][table.i]}) }: ''
            var img_input = o.cl=="modify"?Object.assign(attr,{'value':o.row[o.index][table.i]}):attr
            array.push(creatHtml({
                'tage': 'div',
                'addHtml':[
                    creatHtml({
                        'tage':'label',
                        'attr':{'for':table.i},
                        'text': table.n,
                    }),
                    creatHtml({
                        'tage':'div',
                        'cl': imgDiv_cl,
                        'addHtml': [
                            creatHtml({
                                'tage':'div',
                                'cl': 'img',
                                'addHtml': [
                                    creatHtml({
                                        'tage':'img',
                                        'attr': img_attr
                                    }),
                                    creatHtml({
                                        'tage':'i',
                                        'text':'<svg viewBox="0 0 24 24"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"></path></svg>',
                                        'handler':function(){
                                            from_img_close.call(this)
                                        }
                                    }),
                                ]
                            }),
                            creatHtml({
                                'tage':'input',
                                'attr': img_input,
                            }),
                            creatHtml({
                                'tage':'input',
                                'attr':{'type':table.t,'accept':'.jpg, .jpeg, .png'},
                                'method':'change',
                                'handler': function(){
                                    from_img.call(this,table)
                                }
                            }),
                        ]
                    })
                ]
            }))
        })():table.t=="is_release"&&o.cl!='modify_password'?(function(){
            var attr_y = {'id':table.i+"Y",'name':table.i,'type':'radio','value':'Y'}
            var attr_n = {'id': table.i+"N",'name':table.i,'type':'radio','value':'N'}
            if(o.cl=="modify"){
                if(o.row[o.index][table.i]=='Y'){
                    attr_y["checked"] = true
                }else{
                    attr_n["checked"] = true
                }
            }else{
                attr_y["checked"] = true
            }
            array.push(creatHtml({
                'tage': 'div',
                'addHtml':[
                    creatHtml({
                        'tage':'label',
                        'attr':{'for':table.i},
                        'text': table.n,
                    }),
                    creatHtml({
                        'tage':'div',
                        // 'cl': table.i,
                        'attr':{'id':table.i},
                        'addHtml': [
                            creatHtml({
                                'tage':'input',
                                'attr':attr_y,
                            }),
                            creatHtml({
                                'tage':'label',
                                'attr':{'for':table.i+"Y"},
                                'text': table.Y
                            }),
                            creatHtml({
                                'tage':'input',
                                'attr':attr_n,
                            }),
                            creatHtml({
                                'tage':'label',
                                'attr':{'for':table.i+"N"},
                                'text': table.N
                            }),
                        ]
                    })
                ]
            }))
        })():''
    })
    // console.log(o.cl)
    array.push(creatHtml({
        'tage': 'div',
        'cl': 'bottom',
        'addHtml': [
            creatHtml({
                'tage': 'button',
                'cl':'btn',
                'text': o.customText.cancel,
                'handler': from_close
            }),
            creatHtml({
                'tage': 'button',
                'cl':'btn',
                'text': o.customText.enter,
                'handler':function(){
                    //表單驗證
                    from_verify({
                        'cl': o.cl,
                        'tables': tables,
                        'handler':function(fd){
                            // console.log(fd.getAll)
                            fd.append('method',o.cl)
                            o.cl=='modify'||o.cl=='modify_password'?fd.append('id',o.row[o.index]['id']):''
                            o['ajax_form'] = fd
                            // for (var pair of fd.entries()) {
                            //     console.log(pair[0]+ ', ' + pair[1]); 
                            // }
                            loadShow()
                            from_send(o)
                        }
                    })
                }
            })
        ]
    }))
    return array
}
function from_send(o){
    // console.log('from_send')
    // from_close({handler:loadShow}); 
    getAjax2(o).then(function(data) {
        // var handler = o.handler || '';
        // var p = o.p || 1;
        loadClose()
        if (data.result) {
            seach(data);
        }else if (data.data) {
            data['cl'] = 'error'
            from_creat(data)
        }else if (data.message) {
            data['customText'] = o.customText?o.customText:data['customText']
            data['message_handler'] = o.message_handler?o.message_handler:''
            data['cl'] = 'message'
            from_creat(data)
        }
    })
}
function from_creat(o){
    var cl = o.cl || '';
    if(cl!='error'){
        from_close()
        document.querySelector('body').append(creatHtml({
            'tage': 'div',
            'cl': 'overlaymodal '+ cl,
            'addHtml': creatHtml({
                'tage': 'div',
                'cl': 'box',
                'addHtml': [
                    (function(){
                        return creatHtml({
                            'tage': 'div',
                            'cl': 'top',
                            'addHtml': creatHtml({
                                'tage': 'h4',
                                'text': o.customText[cl],
                            }),
                        })
                    })(),
                    cl=='add'||cl=='modify'?(function(){
                        return creatHtml({
                            'tage': 'form',
                            'cl': 'myForm',
                            'attr':{'autocomplete':'off','onsubmit':'return false;'},
                            'addHtml': from_html(o)
                        })
                    })():cl=='modify_password'?(function(){
                        return creatHtml({
                            'tage': 'form',
                            'cl': 'myForm password',
                            'attr':{'autocomplete':'off','onsubmit':'return false;'},
                            'addHtml': from_html(o)
                        })
                    })():cl=='delete'?(function(){
                        return creatHtml({
                            'tage': 'div',
                            'cl': 'myForm delete',
                            'addHtml':[
                                creatHtml({
                                    'tage': 'div',
                                    'cl': 'content',
                                    'text': o.customText['reDelet']
                                }),
                                creatHtml({
                                    'tage': 'div',
                                    'cl': 'bottom',
                                    'addHtml': [
                                        creatHtml({
                                            'tage': 'button',
                                            'cl':'btn',
                                            'text': o.customText.cancel,
                                            'handler': from_close
                                        }),
                                        creatHtml({
                                            'tage': 'button',
                                            'cl':'btn',
                                            'text': o.customText.enter,
                                            'handler': function(){
                                                from_close()
                                                var fd = new FormData();
                                                fd.append('method',cl)
                                                fd.append('id', o.row[o.index]['id'])
                                                var data = {
                                                    'ajax_form': fd
                                                }
                                                from_send(data)
                                            }
                                        }),
                                    ]
                                })
                            ]
                        })
                    })():cl=='message'?(function(){
                        return creatHtml({
                            'tage': 'div',
                            'cl': 'myForm message',
                            'addHtml':[
                                creatHtml({
                                    'tage': 'div',
                                    'cl': 'content',
                                    'text': o.message
                                }),
                                creatHtml({
                                    'tage': 'div',
                                    'cl': 'bottom',
                                    'addHtml': [
                                        creatHtml({
                                            'tage': 'button',
                                            'cl':'btn active',
                                            'text': o.customText.enter,
                                            'handler': o.message_handler ? o.message_handler : from_close
                                        }),
                                    ]
                                })
                            ]

                        })
                    })():''
                ]
            })
        }))
    }else{
        from_error_remove_all();
        for (const [key, value] of Object.entries(o.data)) {
            // console.log(`${key}: ${value}`);
            from_error_creat(document.querySelector('#'+key).closest('div'),value);
        }
    }
}