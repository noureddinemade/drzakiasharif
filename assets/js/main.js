//

const mobileNav             = document.querySelector('header');
const mobileNavToggle       = mobileNav.querySelector('a.open');

//

mobileNavToggle.addEventListener('click', () => {

    if (mobileNav.classList.contains('-on')) {

        mobileNavToggle.classList.remove('-on');
        mobileNavToggle.classList.add('-off');

        mobileNav.classList.remove('-on');
        mobileNav.classList.add('-off');

    } else {

        mobileNavToggle.classList.remove('-off');
        mobileNavToggle.classList.add('-on');

        mobileNav.classList.remove('-off');
        mobileNav.classList.add('-on');

    }

});