const form = document.getElementById('contactForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const errors = {
        firstName: document.getElementById('firstNameError'),
        lastName: document.getElementById('lastNameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        message: document.getElementById('messageError')
    }
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const firstNameRegex = /^[a-zA-Z ]+$/;
    const lastNameRegex = /^[a-zA-Z ]+$/;


    let error = false;
    const userData = {};

    formData.forEach((v, k) => {
        if (!v) {
            errors[k].setAttribute('data-error', true), error = true;
        } else {
            if (k === 'firstName' && !firstNameRegex.test(v)) {
                return errors[k].setAttribute('data-error', true), error = true;
            } else if (k === 'lastName' && !lastNameRegex.test(v)) {
                return errors[k].setAttribute('data-error', true), error = true;
            } else if (k === 'phone' && !phoneRegex.test(v)) {
                return errors[k].setAttribute('data-error', true), error = true;
            } else if (k === 'email' && !emailRegex.test(v)) {
                return errors[k].setAttribute('data-error', true), error = true;
            } else if (k === 'message' <= 0) {
                    return errors[k].setAttribute('data-error', true), error = true;
                }

                errors[k].setAttribute('data-error', false), error = false;
                userData[k] = v;
                // console.log(userData)
            }
        });
    if (!error) {
        axios.post('http://212.83.176.255:3030/contact', userData)
            .then((response) => {
                console.log(response.data);
                alert("Votre message à bien été envoyé.")
            }).catch((error) => {
                console.error(error);
            });
    }
})

class Carrousel {
    constructor(images, htmlId) {
        this.images = images;
        this.htmlId = htmlId;
        this.carrouselImageContainer = document.getElementById(htmlId);
        this.indexActuel = 0;
        this.carouselElement = document.createElement('img'); 
        this.display();
    }
    
    display = () => {
        this.carouselElement.setAttribute('alt', "Alternative text");
        this.carouselElement.setAttribute('src', this.images[this.indexActuel]);

        this.carrouselImageContainer.appendChild(this.carouselElement);
    }
    
    suivant = () => {
        if (!this.images[this.indexActuel + 1]) {
            this.indexActuel = 0;
        } else {
            this.indexActuel += 1;
        }
        this.display()
    }
    
    precedent = () => {
        if (!this.images[this.indexActuel - 1]) {
            this.indexActuel = this.images.length - 1;
        } else {
            this.indexActuel -= 1;
        }
        this.display()
    }
    
}

const imagesArray = ["https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg", "https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg", "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg"]
const carrousel1 = new Carrousel(imagesArray, "carouselContent")

const previousArrow = document.getElementById('arrowLeft');
const nextArrow = document.getElementById('arrowRight');


previousArrow.addEventListener('click', () => carrousel1.precedent())
nextArrow.addEventListener('click', () => carrousel1.suivant())

setInterval(() => {
    carrousel1.suivant()
}, 3000);