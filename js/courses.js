const coursesDiv = document.getElementById('courses-container');
coursesDiv.innerHTML = '';

const getCourses = async () => {
    const response = await fetch('/dictionary/courses-list.json');
    const courses = await response.json();
    return courses;
}

getCourses().then(courses => {
    courses.courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course');
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <div class="course-level">
                <span class="level">${course.level}</span>
                <span class="number-classes">${course.classes} classes</span>
            </div>
            <h2>${course.title}</h2>
            <p>${course.description}</p>
            <a href="course.html?id=${course.id}" class="course-link">View Course</a>
        `;
        coursesDiv.appendChild(courseElement);
    });
});