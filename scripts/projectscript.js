const imgPath = "images/";

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}


function isScrolledIntoView($elem, $window) {
    $elem = $($elem);
    $window = $($window);
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function buildNavigationIndicator() {
    const navIndicator = document.querySelector(".navigation-indicator");
    const sections = document.querySelectorAll("section[data-section]");
    const startPoint = navIndicator.offsetTop;
    const endPoint = navIndicator.offsetTop + navIndicator.offsetHeight;
    const distanceBetweenElements = (endPoint - startPoint) / Math.max(sections.length - 1, 1);

    console.log(startPoint, endPoint)
    sections.forEach((section, index) => {
        const navElement = document.createElement("div");
        navElement.classList.add("navigation-element");
        // console.log(section.offsetTop)
        navElement.dataset.nav = section.dataset.section;

        navElement.style.top = (distanceBetweenElements * index) + 'px';
        navIndicator.appendChild(navElement);

    })
    
}

// Reflect scrolling in navigation
var navActive = function(section) {

    var $el = $('.navbar__links');
    $el.find('li').removeClass('active');
    $el.each(function(){
        $(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
    });

    var $el2 = $('.navigation-indicator');
    $el2.find('div.navigation-element').removeClass('active');
    $el2.find('div[data-nav="'+section+'"]').addClass('active');
    

};


$(document).ready(function() {
    
  const navbarBtn = document.querySelector('.navbar__btn');
  const navbarLinks = document.querySelector('.navbar__links');
  


    navbarBtn.addEventListener('click', function(){
        let value = navbarLinks.classList.contains('navbar_collapse');
     
        if (value){
           navbarLinks.classList.remove('navbar_collapse');
           navbarBtn.classList.remove('change');
        }else{
           navbarLinks.classList.add('navbar_collapse');
           navbarBtn.classList.add('change');
     
        }
     });

     window.addEventListener("scroll", function(){
        var header = document.querySelector("#site-nav");
        header.classList.toggle("sticky", window.scrollY > 0);
     })

     window.addEventListener("DOMContentLoaded", function(){
        var header = document.querySelector("#site-nav");
        header.classList.toggle("sticky", window.scrollY > 0);
     })

     const toggleViewCoursesBtns = document.querySelectorAll(".toggle-view-courses");

     toggleViewCoursesBtns.forEach(btn => {
         btn.addEventListener("click", () => {
             const courseList = btn.parentElement.querySelector(".course-list");
             const chevronUp = btn.querySelector(".fa-chevron-up");
             const chevronDown = btn.querySelector(".fa-chevron-down");
     
             courseList.classList.toggle("hide-list");
             chevronUp.classList.toggle("hide-icon");
             chevronDown.classList.toggle("hide-icon");
         });
     })
    
     

     window.addEventListener('scroll', function(){
        var elemsToAnimate = document.querySelectorAll('.animation');
        
         elemsToAnimate.forEach((elem) => {
            //  console.log(elem);
             if ((isScrolledIntoView(elem, window))){
                 elem.classList.add('animate');
             }
         })

     })

    var $section = $('section[data-section]');
		
    $section.waypoint(function(direction) {
        navActive($(this.element).data('section'));
    });
    $section.waypoint(function(direction) {
        
        if (direction === 'down') {
            navActive($(this.element).data('section'));
        }
    }, {
        offset: '150px'
    });

    $section.waypoint(function(direction) {
        if (direction === 'up') {
            navActive($(this.element).data('section'));
        }
    }, {
        offset: function() { return -$(this.element).height() + 155; }
    });

     buildNavigationIndicator();


});



