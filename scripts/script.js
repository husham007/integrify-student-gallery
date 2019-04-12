//Global Variables

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const infoBtn = document.querySelector(".info-btn");
const imageDiv = document.querySelector(".image-div");
const imagesSection = document.querySelector(".images-section");
const content = document.querySelector("p");
const studentInfoDiv = document.querySelector(".student-info");
let gallery = null;

// Student Class

class Student {
  constructor(studentInfo) {
    this.firstName = studentInfo.firstName;
    this.lastName = studentInfo.lastName;
    this.title = studentInfo.title;
    this.nationality = studentInfo.nationality;
    this.src = studentInfo.src;
    this.alt = studentInfo.alt;
    this.skills = studentInfo.skills;
    this.whySoftDev = studentInfo.whySofterDeveloper;
    this.vision = studentInfo.longTermVision;
    this.motivation = studentInfo.motivatesMe;
    this.quote = studentInfo.favoriteQuote;
    this.joined = studentInfo.joinedOn;
  }
}

// Gallery Class

class Gallery {
  students = [];

  constructor(students) {
    students.forEach(student => {
      this.students.push(new Student(student));
    });
    this.currentIndex = 0;
   
  }

  get getCurrentIndex() {
    return this.currentIndex;
  }

  set setCurrentIndex(index) {
    this.currentIndex = index;
  }

  showStudent(index, div, cssClass, append) {
    if (!append) {
      div.innerHTML = "";
    }
    let imageWrapper = document.createElement("div");
    imageWrapper.className = cssClass;
    let image = document.createElement("img");
    image.addEventListener("click", e => {
      this.showStudent(index, imageDiv, "image-div", false);
      this.showBasicInfo(index, imageDiv);
      this.showDetailedInfo(index, studentInfoDiv);
      this.currentIndex = index;
    });
    image.src = `assets/images/${this.students[index].src}`;
    imageWrapper.appendChild(image);
    div.appendChild(imageWrapper);
  }

  showStudents() {
    imagesSection.innerHTML = "";
    this.students.forEach((student, index) => {
      this.showStudent(index, imagesSection, "image-section", true);
      // console.log(index);
    });
  }

  showBasicInfo(index, imageDiv) {
    imageDiv.innerHTML =
      imageDiv.innerHTML +
      `<h1>${this.students[index].firstName} ${
        this.students[index].lastName
      } </h1>
      <p class="title">${this.students[index].title} @ Integrify</p>
      
      <div style="margin: 24px 0;">
        <a href="#"><i class="fab fa-dribbble"></i></a> 
        <a href="#"><i class="fab fa-twitter"></i></a>  
        <a href="#"><i class="fab fa-linkedin"></i></a>  
        <a href="#"><i class="fab fa-facebook"></i></a> 
      </div>
      <p><button>Contact</button></p>`;
  }

  showDetailedInfo(index, detailsDiv) {
    detailsDiv.innerHTML = "";
    let content = `<br><h1 class = 'quote'>"${this.students[index].quote}"</h1>
                    <br>
                    <p class = 'student-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit quis, odit
                    sunt perspiciatis maiores eum harum voluptatum nostrum praesentium
                    temporibus soluta, ipsa saepe corporis optio dolores possimus inventore
                    amet sed?<p>`;

    detailsDiv.innerHTML = content;
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

        gallery.showStudent(gallery.currentIndex, imageDiv, "image-div", false);
        gallery.showBasicInfo(gallery.currentIndex, imageDiv);
        gallery.showDetailedInfo(gallery.currentIndex, studentInfoDiv);
        gallery.showStudents();
        //console.log(students);
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

nextBtn.addEventListener("click", e => {
  if (gallery.currentIndex === gallery.students.length - 1) {
    gallery.currentIndex = 0;
  } else {
    gallery.currentIndex += 1;
  }

  gallery.currentStudent = gallery.students[gallery.currentIndex];
  gallery.showStudent(gallery.currentIndex, imageDiv);
  gallery.showBasicInfo(gallery.currentIndex, imageDiv);
  gallery.showDetailedInfo(gallery.currentIndex, studentInfoDiv);
});

prevBtn.addEventListener("click", e => {
  if (gallery.currentIndex === 0) {
    gallery.currentIndex = gallery.students.length - 1;
  } else {
    gallery.currentIndex -= 1;
  }

  gallery.currentStudent = gallery.students[gallery.currentIndex];
  gallery.showStudent(gallery.currentIndex, imageDiv);
  gallery.showBasicInfo(gallery.currentIndex, imageDiv);
  gallery.showDetailedInfo(gallery.currentIndex, studentInfoDiv);
});


infoBtn.addEventListener("click", e => {
  gallery.showDetailedInfo(gallery.currentIndex, studentInfoDiv);
});
