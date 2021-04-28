/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function () {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function (registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function () {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');

                default:
                // Ignore
              }
            };
          }
        };
      }).catch(function (e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  //TASK 2 Bacon
  const baconBtn = document.querySelector('.bacon-btn');
  const baconImg = document.querySelector('.bacon-img');
  if (baconImg) {
    const baconImgUrl = document.querySelector('.bacon-img').src;

    let containerForImg = document.querySelector('.section--center');


    const createNewBaconImg = () => {
      let newBaconImg = document.createElement('img');
      newBaconImg.setAttribute('width', "100%");
      newBaconImg.src = baconImgUrl;
      return newBaconImg;
    };
    baconBtn.addEventListener('click', () => {
      containerForImg.append(createNewBaconImg())
    });

  }


  //Task2 Validation



  //regexs
  const emailPattern = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  const postalCodePattern = new RegExp(/^\b\d{5}\b$/)
  const textOnlyPattern = new RegExp(/[a-zA-Z]{2,20}$/)
  const phonePattern = new RegExp(/\([0-9]{3}\)[0-9]{2}-[0-9]{2}-[0-9]{2}$/)
  const cCardPattern= new RegExp(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)
  const securityCodePattern= new RegExp(/^\d{3}$/)
  const cardExpDatePattern= new RegExp(/^\d{2}\/\d{2}$/)
  //form
  let firstName = {
    input: document.getElementById('firstName'),
    regex: textOnlyPattern
  };
  let lastName = {
    input: document.getElementById('lastName'),
    regex: textOnlyPattern
  };
  let email = {
    input: document.getElementById('email'),
    regex: emailPattern
  };
  let country = {
    input: document.getElementById('country'),
    regex: textOnlyPattern
  }
  let postalCode = {
    input: document.getElementById('postalCode'),
    regex: postalCodePattern
  }
  let phone = {
    input: document.getElementById('phone'),
    regex: phonePattern
  }
  let card = {
    input:document.getElementById('cCard'),
    regex: cCardPattern
  }
  let securityCode = {
    input: document.getElementById('securityCode'),
    regex: securityCodePattern
  }
  let cardExpDate = {
    input:document.getElementById('cardExpiration'),
    regex: cardExpDatePattern
  }

  const form = [firstName, lastName, email, country, postalCode, phone, card, securityCode, cardExpDate
  ]


  const allInputs = document.querySelectorAll('input')
  allInputs.forEach(input => input.addEventListener('input', () => {
    input.classList.remove('inputError')
  }))
  //btn & btn actions
  let errorMsg = document.querySelector('.error')
  let successMsg = document.querySelector('.success')

  const closeModalBtn = document.querySelectorAll('.closeModal')
  closeModalBtn.forEach(el => {
    console.log(el)
    el.addEventListener('click', () => {
      console.log(successMsg)
      console.log(errorMsg)
      successMsg.classList.add('hidden')
      errorMsg.classList.add('hidden')
    })

  })
  const submitBtn = document.querySelector('.submitBtn')
  console.log(submitBtn)
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    form.forEach(input => {
      validator(input)
    })

  })

  function validator(objToValidtate) {
    let isValid = objToValidtate.regex.exec(objToValidtate.input.value.trim())
    if (isValid === null) {
      objToValidtate.input.classList.add('inputError')
      errorMsg.classList.remove('hidden')
    }
    if (isValid !== null) {
      successMsg.classList.remove('hidden')

    }
  }

})();
