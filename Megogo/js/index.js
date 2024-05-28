window.addEventListener('load', function(){

    // Hero arrow click

    let heroArrow = document.querySelector('.hero__arrow');
    if (heroArrow){
        heroArrow.addEventListener('click', function(){
            fullpage_api.moveTo('secondBlock', 2);
        });
    }    
})

