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
window.slide =function(){
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
window.menuButton = function(){
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
window.onload = function(){
    var getUrl = document.querySelector('.fn').className.split(' ')[1];
    menuButton()
    if(getUrl=="fnhome"){
        slide()
        loadRemove()
    }else if(getUrl=="fnregister" || getUrl=="fnmember_information"){
        imgFn(300,300)
        loadRemove()
    } 
    else{
        loadRemove()
    }
}