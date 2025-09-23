const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');
const mainContent = document.getElementById('course-container');

const getCourseData = async (id) => {
    const response = await fetch(`/dictionary/${id}.json`);
    const courseData = await response.json();
    return courseData;
}

getCourseData(courseId).then(course => {
    mainContent.innerHTML = `
        <section class="go-back">
                <a href="courses.html" class="go-back-link"><i class="fa-solid fa-arrow-left"></i>Go Back to Courses</a>
            </section>
    `;

    // Course Title
    const sectionBanner = document.createElement('section');
    sectionBanner.classList.add('course-banner');
    sectionBanner.innerHTML = `
        <img src="${course.image}" alt="Course Image">
        <div class="course-banner-content">
            <h1>${course.title}</h1>
            <p>By ${course.autor}</p>
        </div>
       
    `;
    mainContent.appendChild(sectionBanner);

    //Corse Details
    const courseDescription = document.createElement('section');
    courseDescription.classList.add('course-description');
    courseDescription.innerHTML = `
        <p>${course.description}</p>
        <div class="extra-info">
            <span class="level">${course.level}</span>
            <span class="number-classes"><i class="fa-regular fa-bookmark"></i> ${course.number_of_lessons} classes</span>
            <span class="duration"><i class="fa-regular fa-clock"></i> ${course.duration} hours</span>
        </div>
    `;
    mainContent.appendChild(courseDescription);

    // Course Content
    const courseContent = document.createElement('section');
    courseContent.classList.add('course-content');
    courseContent.innerHTML = `<h2>Course Content</h2>`;
    const lessonsList = document.createElement('ul');
    lessonsList.classList.add('lessons-list');
    course.lessons.forEach(lesson => {
        const lessonItem = document.createElement('li');
        if (lesson.type === 'document') {
            lessonItem.innerHTML = `<a href="reader.html?url=${lesson.file_url}"><i class="fas fa-file-alt"></i> ${lesson.title}</a>`;
        } else if (lesson.type === 'video') {
            lessonItem.innerHTML = `<a href="${lesson.video_url}"><i class="fas fa-video"></i> ${lesson.title}</a>   <span class="duration">${lesson.duration}</span>`;
        }
        lessonsList.appendChild(lessonItem);
    });
    courseContent.appendChild(lessonsList);
    mainContent.appendChild(courseContent);

});