//opening and closing hamburger
function openNav() {
  document.getElementById("mySidenav").style.width = "45%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//limiting words on emails section

function limitWords(paragraph, limit) {
  const words = paragraph.dataset.fullText.split(' ');
  const limitedText = words.slice(0, limit).join(' ');
  paragraph.textContent = limitedText;
}



//fetching data and rendering the emails/ reply section depending on which email is clicked

fetch('emails.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    const emails = data.emails;
    console.log(emails);

    
    const containerDiv = document.getElementById('emails-container');
    const emailIdContainer = document.getElementById('emailId')

    
    emails.forEach(email => {
      
      const emailContainer = document.createElement('div');
      emailContainer.classList.add('solo-email', 'd-flex', 'flex-row', 'justify-content-between', 'align-items-center','px-2');

      
      const profileDiv = document.createElement('div');
      profileDiv.classList.add('profile-img');

      const profileImg = document.createElement('img');
      profileImg.src = email.img_src;
      profileImg.alt = 'profile';

      profileDiv.appendChild(profileImg);

      
      const emailInfoContainer = document.createElement('div');
      emailInfoContainer.classList.add('email-info-container');

      
      const senderName = document.createElement('h1');
      senderName.classList.add('sender-name');
      senderName.textContent = email.name;

      const emailTitle = document.createElement('h2');
      emailTitle.classList.add('sender-title');
      emailTitle.textContent = email.title;

      
      const emailText = document.createElement('p');
      emailText.classList.add('emails-info', 'align-center');
      emailText.textContent = email.paragraph;
      emailText.dataset.fullText = email.paragraph;

      
      limitWords(emailText, 10); 

      emailInfoContainer.appendChild(senderName);
      emailInfoContainer.appendChild(emailTitle);
      emailInfoContainer.appendChild(emailText);

      
      const favDateContainer = document.createElement('div');
      favDateContainer.classList.add('fav-date');

      
      const date = document.createElement('h4');
      date.classList.add('date');
      date.textContent = '6:30 PM';

      
      const favIcon = document.createElement('i');
      favIcon.classList.add('fa-regular', 'fa-star', 'mt-3');

      favDateContainer.appendChild(date);
      favDateContainer.appendChild(favIcon);

      
      emailContainer.appendChild(profileDiv);
      emailContainer.appendChild(emailInfoContainer);
      emailContainer.appendChild(favDateContainer);

      
      containerDiv.appendChild(emailContainer);

      emailContainer.onclick = function() {
        emailIdContainer.innerHTML =
        '<div class="desktop-profile-forward">' +
          '<div class="sender-info d-flex flex-row align-center align-items-center my-2">' +
            '<div class="profile-img-email">' + '<img src="' + email.img_src + '" alt="' + email.name + '" />' + '</div>' +
            '<h3 class="sender-name mx-3">' + email.name + '</h3>' +
          '</div>' +
          '<div class="reply-buttons d-flex flex-row justify-content-around mb-4">' +
            '<div class="reply">' + '<i class="fa-solid fa-reply mx-1"></i>' + 'Reply' + '</div>' +
            '<div class="forward">' + '<i class="fa-solid fa-share mx-1"></i>' + 'Forward' + '</div>' +
            '<div class="delete">' + '<i class="fa-solid fa-trash-can mx-1"></i>' + 'Delete' + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="email-info align-self-start">' +
          '<h2 class="mb-2 mt-5">' + email.title + '</h2>' +
          '<div class="attachements"></div>' +
          '<p class="mb-5">' + email.paragraph + '</p>' +
        '</div>' +
        '<div class="reply-wrapper align-self-start">' +
          '<form action="index.html">' +
            '<textarea placeholder="Reply..." class="reply-field">' + '</textarea>' +
            '<input type="submit" value="Submit" class="send-button mt-3">' +
          '</form>' +
        '</div>';  
      }
    });
  })
  .catch(error => console.log(error));

