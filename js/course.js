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
                <a href="courses.html" class="go-back-link">Go Back to Courses</a>
            </section>
    `;

    // Course Title
    const sectionBanner = document.createElement('section');
    sectionBanner.classList.add('course-banner');
    sectionBanner.innerHTML = `
        <h1>${course.title}</h1>
        <p>${course.autor}</p>
    `;
    mainContent.appendChild(sectionBanner);

    //Corse Details
    const courseDescription = document.createElement('section');
    courseDescription.classList.add('course-description');
    courseDescription.innerHTML = `
        <p>${course.description}</p>
        <div class="extra-info">
            <span class="level">Level: ${course.level}</span>
            <span class="number-classes">Number of Classes: ${course.number_of_lessons}</span>
            <span class="duration">Duration: ${course.duration}</span>
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
        if(lesson.type === 'document') {
            lessonItem.innerHTML = `<a href="reader.html?url=${lesson.file_url}"><i class="fas fa-file-alt"></i> ${lesson.title}</a>`;
        } else if(lesson.type === 'video') {
            lessonItem.innerHTML = `<a href="${lesson.video_url}"><i class="fas fa-video"></i> ${lesson.title}</a>   <span class="duration">${lesson.duration}</span>`;
        }
        lessonsList.appendChild(lessonItem);
    });
    courseContent.appendChild(lessonsList);
    mainContent.appendChild(courseContent);

});