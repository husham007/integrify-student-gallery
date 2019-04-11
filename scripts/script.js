const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const infoBtn = document.querySelector(".info-btn");
const imageDiv = document.querySelector(".image-div");
const imagesSection = document.querySelector(".images-section");
const content = document.querySelector("p");
let gallery = null;

let modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

class Student {
    constructor(studentInfo) {
        this.firstName = studentInfo.firstName;
        this.lastName = studentInfo.lastName;
        this.title = studentInfo.title;
        this.nationality = studentInfo.nationality;
        this.src = studentInfo.src;
        this.alt = studentInfo.alt;
        this.skills = studentInfo.skills;
        this.whySoftDev = studentInfo.whySoftDev;
        this.vision = studentInfo.vision;
        this.motivation = studentInfo.motivation;
        this.quote = studentInfo.quote;
        this.joined = studentInfo.joined;
    }
  }

class Gallery {
    students = [];

  constructor(students) {
   
    students.forEach(student => {
        this.students.push(new Student(student));
    });
    this.currentIndex = 0;
    this.currentStudent = this.students[0];
  }

  get getCurrentIndex() {
    return this.currentIndex;
  }

  set setCurrentIndex(index) {
    this.currentIndex = index;
  }

  showStudent(index, div, cssClass, append) {
      if (!append){
        div.innerHTML = "";
      }
    let imageWrapper = document.createElement("div");
    imageWrapper.className = cssClass;
    let image = document.createElement("img");
    image.addEventListener('click', (e)=>{
        this.showStudent(index, imageDiv, 'image-div', false);
        this.currentIndex = index;
    });
    image.src = `assets/images/${this.students[index].src}`;    
    imageWrapper.appendChild(image);
    div.appendChild(imageWrapper);
  }

  showStudents(){
    imagesSection.innerHTML = '';
    this.students.forEach((student, index)=> {
        this.showStudent(index, imagesSection, 'image-section', true);
       // console.log(index);
    });
  }

  showInfo(index) {
    modal.style.display = "block";
    content.textContent = this.students[index].firstName;
    
  }
}



loadStudents();

function loadStudents() {
  fetch("./data.json")
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        //console.log(data);
       
        gallery = new Gallery([...data]);

        gallery.showStudent(gallery.currentIndex, imageDiv,'image-div', false);
        gallery.showStudents();
        //console.log(students);
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

nextBtn.addEventListener("click", e => {
  if (gallery.currentIndex === gallery.students.length-1){
      gallery.currentIndex = 0;
  }else
  {
    gallery.currentIndex += 1;
  }
  
  gallery.currentStudent = gallery.students[gallery.currentIndex ];
  gallery.showStudent(gallery.currentIndex, imageDiv);
});

prevBtn.addEventListener("click", e => {
    if (gallery.currentIndex === 0){
        gallery.currentIndex = gallery.students.length-1;
    }else
    {
      gallery.currentIndex -= 1;
    }
    
    gallery.currentStudent = gallery.students[gallery.currentIndex ];
    gallery.showStudent(gallery.currentIndex, imageDiv);
  });



infoBtn.addEventListener("click", e => {
  gallery.showInfo(gallery.currentIndex);
});




// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

