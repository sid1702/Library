const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

let myLibrary = [];

function Book(title,author,pages,read) {
  this.title=title;
  this.author=author;
  this.pages=pages;
  this.read=read;
}

const submit=document.querySelector('.submit');
submit.addEventListener('click',addBookToLibrary);

const mod=document.querySelector('.modal');

function addBookToLibrary() {
  const title=document.querySelector('.title').value;
  const author=document.querySelector('.author').value;
  const pages=document.querySelector('.pages').value;
  const read=document.querySelector('.read').checked;

  const book=new Book(title,author,pages,read);

  myLibrary.push(book);
  form.reset();
  lib();
  setData();
  closeModal(mod);

}

function lib(){
  const display = document.querySelector('.card');
  const books = document.querySelectorAll('.cardDiv');
  books.forEach(book => display.removeChild(book));
  
  for(let i=0;i<myLibrary.length;i++){
    createCard(myLibrary[i]);
  }
}



function createCard(book){
  const card=document.querySelector('.card');

  const cardDiv=document.createElement('div');
  cardDiv.classList.add('cardDiv');
  
  const cardTitle=document.createElement('div');
  const cardAuthor=document.createElement('div');
  const cardPages=document.createElement('div');
  const cardRead=document.createElement('div');
  cardRead.classList.add('cardRead');

  const cardDelete=document.createElement('div');
  cardDelete.textContent="Delete";
  cardDelete.classList.add('delete');

  cardTitle.textContent=book.title;
  cardAuthor.textContent=book.author;
  cardPages.textContent=book.pages;

  if(book.read===true){
    cardRead.textContent="Read";
    cardRead.style.backgroundColor='rgb(0, 112, 15)';
  }
  else{
    cardRead.textContent="Not Read";
    cardRead.style.backgroundColor='rgb(221, 10, 10)';
  }


  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(cardAuthor);
  cardDiv.appendChild(cardPages);
  cardDiv.appendChild(cardRead);
  cardDiv.appendChild(cardDelete);


  card.appendChild(cardDiv);

  cardDelete.addEventListener('click',()=>{
    myLibrary.splice(myLibrary.indexOf(book),1);
    cardDiv.style.display='none';
    lib();
    setData();
  });

  cardRead.addEventListener('click',()=>{
    book.read = !book.read; 
    if(book.read===true){
      cardRead.textContent="Read";
    }
    else{
      cardRead.textContent="Not Read";
    }
    lib();
    setData();
  });

}

function setData(){
  localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
}

function pull(){
  if(!localStorage.myLibrary){
    lib();
  }
  else{
    let objects = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary=objects;
    lib();
  }

}

pull();


