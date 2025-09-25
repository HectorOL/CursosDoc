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

    //Course Content
    mainContent.innerHTML = '';
    const goBackSection = document.createElement('section');
    goBackSection.className = 'go-back';
    goBackSection.innerHTML = `<a href="courses.html" class="go-back-link"><i class="fas fa-arrow-left"></i> Volver a Cursos</a>`;
    
    const bannerSection = document.createElement('section');
    bannerSection.className = 'course-banner';
    bannerSection.innerHTML = `
        <img src="${course.image}" alt="Imagen del Curso">
        <div class="course-banner-content">
            <h1>${course.title}</h1>
            <p>Por ${course.autor}</p>
        </div>
    `;
    
    const descriptionSection = document.createElement('section');
    descriptionSection.className = 'course-description';
    descriptionSection.innerHTML = `
        <p>${course.description}</p>
        <div class="extra-info">
            <span class="level"><i class="fas fa-signal"></i> Nivel: ${course.level}</span>
            <span class="number-classes"><i class="fas fa-book"></i> Lecciones: ${course.number_of_lessons}</span>
            <span class="duration"><i class="fas fa-clock"></i> Duración: ${course.duration} mins</span>
        </div>
    `;

    mainContent.append(goBackSection, bannerSection, descriptionSection);
    
    // Units and Lessons
    const contentSection = document.createElement('section');
    contentSection.className = 'course-content';
    mainContent.appendChild(contentSection);
    
    Object.entries(course.lessons).forEach(([unitName, lessons]) => {
        const unitSection = document.createElement('div');
        unitSection.classList.add('unit');
        const realUnitName = lessons.find(item => item.unit_name)?.unit_name || unitName;
        unitSection.innerHTML = `<h2>${realUnitName}</h2>`;

        const actualLessons = lessons.filter(lesson => lesson.hasOwnProperty('lesson_id'));
        actualLessons.sort((a, b) => a.number - b.number);
        
        const table = document.createElement('table');
        table.classList.add('lessons-table');
        table.innerHTML = `
        `;
        const tableBody = document.createElement('tbody');
        
        let i = 0;
        while (i < actualLessons.length) {
            const lesson = actualLessons[i];
            const row = document.createElement('tr');
            
            let docCellHTML = '';
            let videoCellHTML = '';

            if (lesson.type === 'document') {
                docCellHTML = `<a href="reader.html?url=${lesson.file_url}">${lesson.title}</a><span class="duration">${lesson.duration}</span>`;
                if (i + 1 < actualLessons.length && actualLessons[i + 1].type === 'video') {
                    const nextLesson = actualLessons[i + 1];
                    videoCellHTML = `<a href="${nextLesson.video_url}">${nextLesson.title}</a><span class="duration">${nextLesson.duration}</span>`;
                    i++;
                }
                i++;
            
            } else if (lesson.type === 'video') {
                videoCellHTML = `<a href="${lesson.video_url}">${lesson.title}</a><span class="duration">${lesson.duration}</span>`;
                i++;
            }
            row.innerHTML = `<td data-label="Documento">${docCellHTML}</td><td data-label="Video">${videoCellHTML}</td>`;
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
        unitSection.appendChild(table);
        contentSection.appendChild(unitSection);
    });
});