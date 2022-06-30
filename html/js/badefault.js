//圖片---------------------------------------------------
function canvas2Blob(canvas,callback,quality){
     canvas.toBlob(function(blob) {
         callback(blob);
     },'image/jpeg', quality || 0.8);
}
function file2DataUrl(blob, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function(e) {
        callback(e.target.result);
    }
}
function preview(input, imgWidth, imgHight, imgSize) {
    // console.log('preview')
    // var imgSize = imgSize || 1048576;
    var imgSizeNumber = imgSize*1048576
    var imgWidth = imgWidth || '';
    var imgHight = imgHight || '';
    var file = input.files[0];
    var type = file.type.split('/')[1]; //類型
    // var fileReader = new FileReader();
    // var img = new Image();
    var inImage = function(o) {
        var Jcrophtml = "<div class='imgdiv'>" +
            "<div class='imgW'>" +
            "<img class='imgclass' src='" + o.img + "'>" +
            "<i onclick='closeImg(this);'><svg viewBox='0 0 24 24'><path d='M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z'/></svg></i>" +
            "</div></div>";
        var parent = $(o.obj).parent('label')
        var coveInput = parent.find('.coveInput')
        parent.addClass('active').after(Jcrophtml);
        coveInput.val(o.img);
    }
    var img2Canvas = function(imgWidth,imgHight,img){
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        if(imgWidth){
            canvas.width = imgWidth;
            canvas.height = imgHight;
            var imageWidth = img.width;
            var imageHeight = img.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            if ((imageWidth / imgWidth) > (imageHeight / imgHight)) {
                context.drawImage(img, imgWidth / 2 - (imgHight * imageWidth / imageHeight) / 2, 0, imgHight * imageWidth / imageHeight, imgHight);
            } else {
                context.drawImage(img, 0, imgHight / 2 - (imgWidth * imageHeight / imageWidth) / 2, imgWidth, imgWidth * imageHeight / imageWidth);
            }
        }else{
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
        }
        return canvas;
    }
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
        alert('錯誤 : 圖片類型只能是 jpg , jpeg , png');
        $('.coverLabel').find("input").val('');
        return;
    }
    
    file2Image(file, function(img) {
        var canvas = img2Canvas(imgWidth,imgHight,img)
        var loopTime = 10;
        (async function loop() {
            for (let i = 1; i < loopTime; i++) {
                var quality = ((loopTime - i) * 0.1).toFixed(1) * 1
                await new Promise(resolve => canvas2Blob(canvas, function(blob) {
                    // blob.width = canvas.width;
                    // blob.height = canvas.height;
                    // console.log(i, quality, blob.size, '>=' + imgSize)
                    if (i == loopTime - 1) {
                        // console.log('檔案太大')
                        alert('錯誤 : 圖片大小不能超過: '+imgSize+'M');
                        $('.coverLabel').find("input").val('');
                    } else if (blob.size >= imgSizeNumber) {
                        resolve()
                    } else {
                        // console.log(blob)
                        file2DataUrl(blob, function(url) {
                            inImage({ 'obj': input, 'img': url })
                        })
                    }
                }, quality))
            }
        })()
    })
}
//ba---------------------------------------------------
var tinymceFn = function(o) {
    var select = o.select
    tinymce.remove()
    tinymce.init({
        selector: select, // 目標物件
        theme: "modern", // 模板風格
        language: "zh_TW", //語系
        // paste_data_images: true,
        // image_advtab: true,
        menubar: false,
        verify_html: false, //禁清除html
        // inline: true, //內連
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern"
        ],
        //引入套件=>advlist進階清單','autolink自動連結、link連結、image上傳圖片、lists清單、charmap特殊字元表、print列印、preview預覽、media影音、forecolor文字顏色、backcolor文字背景、emoticons表情、undo復原、styleselect格式、 bold粗體、italic斜體、 alignleft置左對齊、 bullist項目清單、numlist數字清單、 outdent減少縮排、 indent增加縮排、fontselect字體樣式 、fontsizeselect字體大小
        toolbar: "undo redo | fontsizeselect bold italic forecolor image code ", //bar1顯示套件
        /* enable title field in the Image dialog*/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        // automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: function(cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = function() {
                var file = this.files[0];
                var type = file.type.split('/')[1]; //類型
                if (!(type == 'jpeg' || type == 'jpg' || type == 'png')) {
                    alert('錯誤 : 圖片類型只能是 jpg , jpeg , png');
                }else{
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        var base64 = reader.result.split(',')[1];
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        // console.log(id, file, base64)
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                }
                // var imgurl = window.URL.createObjectURL(file)
                // var image = new Image()
                // image.src = imgurl
                // image.onload = function () {
                //     var myCanvas = document.createElement("canvas");
                //     var ctx = myCanvas.getContext("2d");
                //     var img_width = 620
                //     var img_height = image.height
                //     myCanvas.width = img_width
                //     myCanvas.height = img_height
                //     //縮圖
                //     if(image.width>img_width){
                //         img_height = img_width*image.height/image.width
                //         myCanvas.height = img_height
                //     }else{
                //         img_width = image.width
                //         myCanvas.width = img_width
                //     }
                //     ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, img_width,img_height)

                //     //XX
                //     // var base64 = myCanvas.toDataURL("image/jpeg", 0.9);
                //     // var id = 'blobid' + (new Date()).getTime();
                //     // var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                //     // console.log(id, file, base64)
                //     // var blobInfo = blobCache.create(id, file, base64);
                //     // blobCache.add(blobInfo);
                //     // cb(blobInfo.blobUri(), { title: file.name });

                //     //縮size
                //     var loopTime = 10;
                //     var imgSize = 1048576; //單張圖大小
                //     (async function loop() {
                //         for (let i = 1; i < loopTime; i++) {
                //             var quality = ((loopTime - i) * 0.1).toFixed(1) * 1
                //             await new Promise(resolve => canvas2Blob(myCanvas, function(blob) {
                //                 console.log(blob.size)
                //                 if (i == loopTime - 1) {
                //                     // console.log('檔案太大')
                //                     alert('錯誤 : 圖片大小不能超過: 1M');
                //                 } else if (blob.size >= imgSize) {
                //                     resolve()
                //                 } else {
                //                     file2DataUrl(blob, function(url) {
                //                         var id = 'blobid' + (new Date()).getTime();
                //                         var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                //                         console.log(id, file, url)
                //                         var blobInfo = blobCache.create(id, file, url);
                //                         blobCache.add(blobInfo);
                //                         console.log(blobInfo)
                //                         cb(blobInfo.blobUri(), { title: file.name });
                                    
                //                     })
                //                 }
                //             }, quality))
                //         }
                //     })()
                // }

            
            };

            input.click();
        },
    });
}
function seach(o) {
    var page = o.page || 1
    var url_a = getUrl('a') 
    var fd = new FormData()
    fd.append('method','seach')
    fd.append('page',page)
    o['ajax_form'] = fd
    from_close()
    getAjax2(o).then(function(data) {
        document.querySelector('.ba').classList.add(url_a)
        document.querySelectorAll('.baleft li a').forEach(function(item){
            if(item.classList.value == url_a){
                data['title'] = data['title'] ?  data['title'] :  item.querySelector('p').textContent
                item.classList.add('active')
            }
        })
        if (data.result) {
            data['page']=page
            creatTemplate(data)
            loadClose()
            // loadClose(function(){
            //     document.querySelectorAll('.BaAllProducts').forEach(function(item){
            //         item.classList.add('active')
            //     })
            //     // setTimeout(function() {
            //     //     document.querySelectorAll('.BaAllProducts').forEach(function(item){
            //     //         item.classList.add('active')
            //     //     })
            //     // }, 300)
            // });
        } else {
            data['cl'] = 'message'
            data['message_handler'] = function(){
                document.location.href="/";
            }
            loadClose(from_creat(data))
        }
    })
}
window.onload = seach;
function creatTemplate(o) {
    var public_nav = function(o){
        // console.log(o)
        var add = function(){
            return creatHtml({
                'tage': 'div',
                'cl': 'ProductsAdd',
                'addHtml': creatHtml({
                    'tage': 'div',
                    'cl': 'btn',
                    'text': '<i><svg viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg></i>新增',
                    'handler':function(){
                        o['cl']='add'
                        from_creat(o)
                    }
                })
            })
        }
        var save = function(){
            return creatHtml({
                'tage': 'div',
                'cl': 'ProductsAdd',
                'addHtml': creatHtml({
                    'tage': 'div',
                    'cl': 'btn',
                    'text': '<i><svg viewBox="0 0 24 24"><path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z"></path></svg></i>儲存',
                    'handler':function(){
                        // console.log('儲存')
                        loadShow()
                        var tinyText = tinyMCE.get('tinymce').getContent()
                        if(tinyText.length>5500000){
                            alert('超過存取大小，請減少文字或是圖片大小')
                            loadClose();
                        }else{
                            var fd = new FormData();
                            fd.append('method','edit_tinymce')
                            fd.append('tinymce', tinyText)
                            var data = {
                                'ajax_form': fd
                            }
                            from_send(data)
                        }
                    }
                })
            })
        }
        return creatHtml({
            'tage': 'div',
            'cl': 'ProductsNav',
            'attr':{'id':'ProductsNav'},
            'addHtml': [
                creatHtml({
                    'tage': 'div',
                    'cl': 'title',
                    'addHtml': creatHtml({
                        'tage': 'h4',
                        'text': o.title
                    })
                }),
                o.btn_add?add():'',
                o.btn_save?save():'',
            ]
        })
    }
    var public_content = function(o){
        var array = ''
        if(o.content_table){
            array = creatHtml({
                'tage': 'div',
                'addHtml': [
                    creatHtml({
                        'tage': 'div',
                        'cl': 'ProductsContent',
                        'addHtml': (function(){
                            var ul = creatHtml({
                                'tage': 'ul',
                            })
                            //nav
                            ul.append(
                                creatHtml({
                                    'tage': 'li',
                                    'addHtml': (function(){
                                        var array=[];
                                        o.tables.forEach(function(table){
                                            if(table.hide)return
                                            if(table.i=='password')return
                                            array.push(creatHtml({
                                                'tage': 'div',
                                                'addHtml':creatHtml({
                                                    'tage': 'p',
                                                    'text': table.n
                                                })
                                            }))
                                        })
                                        return array;
                                    })()
                                })
                            )
                            //content
                            o.row.map(function(row,index){
                                var li = creatHtml({
                                    'tage': 'li',
                                })
                                o.tables.forEach(function(table){
                                    if(table.i=='password')return
                                    table.i=='id'||table.i=='create_time'||table.t=='text'?(function(){
                                        li.append(creatHtml({
                                            'tage': 'div',
                                            'addHtml':creatHtml({
                                                'tage': 'p',
                                                'text': row[table['i']]
                                            })
                                        }))
                                    })():table.t=='file'?(function(){
                                        li.append(creatHtml({
                                            'tage': 'div',
                                            'addHtml': creatHtml({
                                                'tage': 'a',
                                                'addHtml':creatHtml({
                                                    'tage': 'img',
                                                    'attr': {'src':from_img_src({'src':row[table['i']]}) }
                                                })
                                            })
                                        }))
                                    })():table.t=='is_release'?(function(){
                                        li.append(creatHtml({
                                            'tage': 'div',
                                            'addHtml':creatHtml({
                                                'tage': 'p',
                                                'text': row[table['i']]=='Y'?table['Y']:table['N']
                                            })
                                        }))
                                    })():table.i=='control'?(function(){
                                        li.append(creatHtml({
                                            'tage': 'div',
                                            'addHtml':[
                                                creatHtml({
                                                    'tage': 'button',
                                                    'text': '<svg viewBox="0 0 24 24"><path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"></path></svg>',
                                                    'handler':function(){
                                                        o["cl"]="modify"
                                                        o["index"]=index
                                                        from_creat(Object.assign(o,{}))
                                                    }
                                                }),
                                                o.btn_password?creatHtml({
                                                    'tage': 'button',
                                                    'text': '<svg viewBox="0 0 24 24"><path d="M16 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6zm0-2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm-5.405 16.4l-1.472 1.6h-3.123v2h-2v2h-2v-2.179l5.903-5.976c-.404-.559-.754-1.158-1.038-1.795l-6.865 6.95v5h6v-2h2v-2h2l2.451-2.663c-.655-.249-1.276-.562-1.856-.937zm7.405-11.4c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"></path></svg>',
                                                    'handler':function(){
                                                        o["cl"]="modify_password"
                                                        o["index"]=index
                                                        from_creat(Object.assign(o,{}))
                                                    }
                                                }):'',
                                                o.row.length>1?creatHtml({
                                                    'tage': 'button',
                                                    'text': '<svg viewBox="0 0 24 24"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path></svg>',
                                                    'handler':function(){
                                                        o["cl"]="delete"
                                                        o["index"]=index
                                                        from_creat(Object.assign(o,{}))
                                                    }
                                                }):''
                                            ]
                                        }))
                                    })():''
                                })
                                ul.append(li)
                            })
                            return ul
                        })()
                    }),
                    public_page(o)
                ]
            })
        }
        if(o.content_tinymce){
            array = creatHtml({
                'tage': 'div',
                'cl': 'ProductsContent textarea',
                'addHtml': creatHtml({
                    'tage': 'textarea',
                    'attr': {'id':o.id,'name':o.id},
                    'text': o.row[0]['tinymce']
                })
            })
        }
        return array
    }
    var baright = document.querySelector('.baright');
    baright.innerHTML=''
    o.row.forEach(function(item, index, array){
        var copy = JSON.parse(JSON.stringify(o)); // 深層
        copy = Object.assign(copy, item);
        baright.append(creatHtml({
            'tage': 'div',
            'cl': 'BaAllProducts',
            'addHtml': [
                public_nav(copy),
                public_content(copy),
            ]
        }))
        //tinymceFn
        if(copy.content_tinymce){
            tinymceFn({'select': '#'+copy.id})
        }
    })
}
