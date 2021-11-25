//Tüm elementleri seçme
const form = document.querySelector('#todo-form') //todo eklemek için form'u seçtik
const todoInput = document.querySelector('#todo') //Todo girmek için input'umuzu seçtik
const todoList = document.querySelector('.list-group') //todoları ul'ye eklemek için ul etiketini seçtik li ler buraya gelecek
const firstCardBody = document.querySelectorAll('.card-body')[0]
const secondCardBody = document.querySelectorAll('.card-body')[1]
const filter = document.querySelector('#filter')
const clearButton = document.querySelector('#clear-todos')

eventListeners(); //sayfamız ilk açıldığında elementleri seçecek daha sonra bu fonksiyon çalışacak
function eventListeners() {
  //Tüm event Listenarlar
  form.addEventListener('submit', addTodo)
  document.addEventListener("DOMContentLoaded",loadAllTodosToUI);//sayfadaki her şeyin yüklenmesi bittikten sonra bu eventimiz oluşacak
  secondCardBody.addEventListener("click",deleteTodo);
  filter.addEventListener("keyup",filterTodos);
}

function filterTodos(e){
    console.log(e.target.value);
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
      const text=listItem.textContent.toLowerCase();
    })
}

function deleteTodo(e){
  console.log(e.target);//Hangi element'e bastığımızı cardbody'de gösterecek consolda

  if(e.target.className==="fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo Başarıyla silindi...");
   
  }
}

function deleteTodoFromStorage(deleteTodo){
  let todos=getTodosFromStorage();
  todos.forEach(function(todo,index){
      if(todo===deleteTodo){
        todos.splice(index,1);//Arrayden değeri silebiliriz.
      }
  });
  localStorage.setItem("todos",JSON.stringify(todos))
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);      
    })
}

function addTodoToUI(newTodo) {
  //String değerini list item olarak ekleyecek
  //List item oluşturma
  const listItem = document.createElement('li') //yeni element oluşturduk
  //Link Oluşturma
  const link = document.createElement('a')
  listItem.classList = 'list-group-item d-flex justify-content-between'
  link.href = '#'
  link.className = 'delete-item'
  link.innerHTML = "<i class = 'fa fa-remove'></i>"
  //Text Node Ekleme
  listItem.appendChild(document.createTextNode(newTodo)) //Çocuk olarak ekledik
  listItem.appendChild(link)
  //Todo List'e List Item'ı Ekleme
  todoList.appendChild(listItem)
  todoInput.value = ''
}


function addTodo(e) {
  //Değerleri almam gerekiyor ilk başta aldığım değeri bu değişkene atacam
  const newTodo = todoInput.value.trim() //trim() fonksiyonu sağdan soldan verilen boşlukları siler

  if (newTodo === '') {

    showAlert('danger', 'Lütfen bir todo girin...')
  } else {
    //boş değilse todoyu eklemeye çallışacaz
    addTodoToUI(newTodo) //Arayüze bu todo'yu ekle fonksiyonu
    addTodoToStorage(newTodo);
    showAlert("success","Todo Başarıyla Eklendi...")
}

  e.preventDefault() //sayfa yenilenmesin
}

function getTodosFromStorage(){//Storagedan Tüm todoları alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));//array'e çevirdik
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement('div')
  alert.className = `alert alert-${type}`
  alert.textContent = message
  let hr = document.createElement('hr')
  firstCardBody.appendChild(hr)
  firstCardBody.appendChild(alert)
  //setTimeout belli bir saniye bekletcez
  setTimeout(function () {
    //İKİ değer alıyor bir fonksiyon ve ikincisi o fonksiyon ne zaman çalışacağını veriyoruz
    alert.remove()
    hr.remove()
  }, 2000)
}





















/*--------------------------fatih deneme--------------------------*/


// const form = document.querySelector('#todo-form') //todo eklemek için form'u seçtik
// const todoInput = document.querySelector('#todo') //Todo girmek için input'umuzu seçtik
// const todoList = document.querySelector('.list-group') //todoları ul'ye eklemek için ul etiketini seçtik li ler buraya gelecek
// const firstCardBody = document.querySelectorAll('.card-body')[0]
// const secondCardBody = document.querySelectorAll('.card-body')[1]
// const filter = document.querySelectorAll('#filter')
// const clearButton = document.querySelector('#clear-todos')

// eventListeners() //sayfamız ilk açıldığında elementleri seçecek daha sonra bu fonksiyon çalışacak
// function eventListeners() {
//   //Tüm event Listenarlar
//   form.addEventListener('submit', addTodo)
// }

// function addTodo(e) {
//   //Değerleri almam gerekiyor ilk başta aldığım değeri bu değişkene atacam
//   const newTodo = todoInput.value.trim() //trim() fonksiyonu sağdan soldan verilen boşlukları siler
    
//     if(newTodo===""){
//         showAlert("danger","lütfen bir todo giriniz");
//     }else{
//         addTodoToUI(newTodo);
//         addTodoToStorage(newTodo);
//         showAlert("success","Başarıyla Todo Eklendi...");
//     }
//   e.preventDefault() //sayfa yenilenmesin
// }


// function getTodosFromStorage(){
//     let todos;
//     if(localStorage.getItem("todos")===null){
//         todos=[];
//     }else{
//         todos=JSON.parse(localStorage.getItem("todos"))
//     }
//     return todos;
// }

// function addTodoToStorage(newTodo){
//     let todos=getTodosFromStorage();
//     todos.push(newTodo);
//     localStorage.setItem("todos",JSON.stringify(todos));
// }

/* <div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div> */
// function showAlert(type,message){
//     const div=document.createElement("div");
//     const hr=document.createElement("hr");
//     div.classList=`alert alert-${type}`;
//     div.setAttribute="role='alert'";
//     div.textContent=message;
//     firstCardBody.appendChild(hr);
//     firstCardBody.appendChild(div);
//     //bekletme
//     setTimeout(function(){
//         div.remove();
//         hr.remove();
//     },3000)

// }

/* <li class="list-group-item d-flex justify-content-between">Todo 1<a href = "#" class ="delete-item">
<i class = "fa fa-remove"></i></a>// </li> */

// function addTodoToUI(newTodo) {
//   //String değerini list item olarak ekleyecek
//   //List item oluşturma
//   const listItem = document.createElement('li') //yeni element oluşturduk
//   //Link Oluşturma
//   const link = document.createElement('a')
//   listItem.classList = 'list-group-item d-flex justify-content-between'
//   link.href = '#'
//   link.className = 'delete-item'
//   link.innerHTML = "<i class = 'fa fa-remove'></i>"
//   //Text Node Ekleme
//   listItem.appendChild(document.createTextNode(newTodo)) //Çocuk olarak ekledik
//   listItem.appendChild(link)
//   //Todo List'e List Item'ı Ekleme
//   todoList.appendChild(listItem)
//   todoInput.value = ''
// }