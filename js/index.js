window.addEventListener('load', function(){
    new fullpage('#fullpage', {
        autoScrolling:true,
        scrollHorizontally: true
    });

    // Hero arrow click

    let heroArrow = document.querySelector('.hero__arrow');
    if (heroArrow){
        heroArrow.addEventListener('click', function(){
            fullpage_api.moveTo('secondBlock', 2);
        });
    }    
})

