//

const contactForm               = document.querySelector('form');
const contactFormInputs         = contactForm.querySelectorAll('input, select, textarea');

const formName                  = contactForm.querySelector('.-name');
const formNameInput             = formName.querySelector('input');

const formContactPref           = contactForm.querySelector('.-contactPref');
const formContactPrefPhone      = formContactPref.querySelector('#radioPhone');
const formContactPrefEmail      = formContactPref.querySelector('#radioEmail');
const formEmail                 = contactForm.querySelector('.-email');
const formEmailInput            = formEmail.querySelector('input');
const formPhone                 = contactForm.querySelector('.-phone');
const formPhoneInput            = formPhone.querySelector('input');

const formReason                = contactForm.querySelector('.-reason');
const formReasonSelect          = formReason.querySelector('select');
const formPreferredTime         = contactForm.querySelector('.-preferredTime');
const formPreferredTimeAM       = formPreferredTime.querySelector('#radioAM');
const formPreferredTimePM       = formPreferredTime.querySelector('#radioPM');

const formMessage               = contactForm.querySelector('.-message');
const formMessageInput          = formMessage.querySelector('textarea');

const formButton                = contactForm.querySelector('button');
const formRadios                = contactForm.querySelectorAll('input[type=radio]');

//

const readyToSubmit = (error) => {

    let r       = 0;
    let i       = false;

    // Radio inputs

    formRadios.forEach(radio => {

        if (!radio.checked) {

            r = r + 1;

        } else {

            r = r - 1;

        }

    });

    // Text inputs

    contactFormInputs.forEach(input => {

        // Name

        if (input.type == 'text') {

            if (!input.value) {

                i = true;

                if (error == '1') {

                    formName.classList.add('-error');

                }

            } else {

                if (error == '1') {

                    formName.classList.remove('-error');

                }

            }

        }

        // Contact Preference

        if (input.type == 'radio') {

            if (input.checked) {

                if (input.value == 'Phone') {

                    if (!formPhoneInput.value) {

                        i = true;

                        if (error == '1') {

                            formPhone.classList.add('-error');

                        }

                    }

                }

                else if (input.value == 'Email') {

                    if (!formEmailInput.value) {

                        i = true;

                        if (error == '1') {

                            formEmail.classList.add('-error');

                        }

                    }

                }

            }

        }

        // Select

        if (input.value == 'Book an appointment') {

            if (r > 0) {

                if (error == '1') {

                    if (!contactForm.querySelector('input[name=contact-preference]').checked) {

                        formContactPref.classList.add('-error');

                    } else {

                        formContactPref.classList.remove('-error');

                    }

                    if (!contactForm.querySelector('input[name=preferred-time]').checked) {

                        formPreferredTime.classList.add('-error');

                    } else {

                        formPreferredTime.classList.remove('-error');

                    }

                }

                i = true;

            }

        } else {

            if (r > 2) {

                if (error == '1') {

                    formContactPref.classList.add('-error');

                }

                i = true;

            }

        }

        // Textarea

        if (input.name == 'message') {

            if (!input.value) {

                i = true;

                if (error == '1') {

                    formMessage.classList.add('-error');

                }

            } else {

                if (error == '1') {

                    formMessage.classList.remove('-error');

                }

            }

        }

    });

    return i;

}

//

formContactPrefPhone.addEventListener('click', () => {

    formEmail.style.display                     = 'none';
    formPhone.style.display                     = 'block';

});

formContactPrefEmail.addEventListener('click', () => {

    formPhone.style.display                     = 'none';
    formEmail.style.display                     = 'block';

});

//

formReasonSelect.addEventListener('change', () => {

    let radios = formPreferredTime.querySelectorAll('input');

    if (formReasonSelect.value == 'General enquiry') {

        formPreferredTime.style.display = 'none';

        radios.forEach(radio => {

            radio.checked   = false;

        });

    } else {

        formPreferredTime.style.display = 'block';

    }

});

//

contactFormInputs.forEach(input => {

    if (input.type == 'text' || input.type == 'email' || input.type == 'number' || input.name == 'message') {

        input.addEventListener('keyup', () => {

            input.parentNode.classList.remove('-error');

            let i = readyToSubmit(0);

            if (!i) {

                formButton.classList.remove('-disabled');

            } else {

                formButton.classList.add('-disabled');

            }

        });

    } else {

        input.addEventListener('change', () => {

            input.parentNode.parentNode.classList.remove('-error');

            let i = readyToSubmit(0);

            if (!i) {

                formButton.classList.remove('-disabled');

            } else {

                formButton.classList.add('-disabled');

            }

        });

    }

});

//

formButton.addEventListener('click', e => {

    let ready = readyToSubmit(1);

    if (ready) {

        e.preventDefault();

        contactForm.scrollIntoView();

    }

});