//tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            contents.forEach(content => content.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));

            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                targetContent.classList.add('active');
                tab.classList.add('active');
            }
        });
    });
});

//editor
let zip = new JSZip();
zip.folder("documents/");
zip.folder("img/");
zip.folder("dictionary/");
let coursesList;
let addedCourses = [];
let addedImages = [];
let addedDocuments = [];

const loadCourses = async () => {
    try {
        const response = await fetch('/dictionary/courses-list.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading courses:', error);
    }
};

loadCourses().then(data => {
    coursesList = data;
    loadCoursesToRemove();
});

//Add course
const mdinput = document.getElementById('md-input');
const imginput = document.getElementById('img-input');
let newCourse = {};
let newCourseData = { "lessons": [] };
let lessonData = {};
const addCourseButton = document.getElementById('add-course-button');
const addLessonButton = document.getElementById('add-lesson-button');
const lessonTypeSelect = document.getElementById('lesson-type');


mdinput.addEventListener('change', () => {
    const mdFileInput = document.getElementById('lesson-file');
    const lessonFileLabel = document.getElementById('lesson-file-label');
    if (mdinput.checked && lessonTypeSelect.value !== 'Video') {
        lessonFileLabel.innerHTML = 'Lesson File (Markdown):';
        mdFileInput.type = 'file';
        mdFileInput.accept = '.md';
    } else {
        lessonFileLabel.innerHTML = 'Lesson File Name:';
        mdFileInput.type = 'text';
    }
});

imginput.addEventListener('change', () => {
    const imgInput = document.getElementById('image-file');
    const imageFileLabel = document.getElementById('image-file-label');
    const courseForm = document.getElementById('course-form');

    if (imginput.checked) {
        if (!imgInput) {
            const imageFileLabel = document.createElement('label');
            imageFileLabel.for = 'image-file';
            imageFileLabel.id = 'image-file-label';
            imageFileLabel.innerHTML = 'Linked Images:';
            document.querySelector('.controls').appendChild(imageFileLabel);
            const imgFileInput = document.createElement('input');
            imgFileInput.type = 'file';
            imgFileInput.id = 'image-file';
            imgFileInput.name = 'image-file';
            imgFileInput.multiple = true;
            imgFileInput.accept = 'image/*';
            courseForm.appendChild(imageFileLabel);
            courseForm.appendChild(imgFileInput);
        }
    } else {
        if (imgInput) {
            imgInput.remove();
            imageFileLabel.remove();
        }
    }
});

lessonTypeSelect.addEventListener('change', () => {
    const lessonFileInput = document.getElementById('lesson-file');
    const lessonFileLabel = document.getElementById('lesson-file-label');

    if (lessonTypeSelect.value === 'Video') {
        lessonFileLabel.innerHTML = 'Lesson File (Video URL):';
        lessonFileInput.type = 'text';
        lessonFileInput.accept = '';
    } else {
        if (mdinput.checked) {
            lessonFileLabel.innerHTML = 'Lesson File (Markdown):';
            lessonFileInput.type = 'file';
            lessonFileInput.accept = '.md';
        } else {
            lessonFileLabel.innerHTML = 'Lesson File Name:';
            lessonFileInput.type = 'text';
            lessonFileInput.accept = '';
        }
    }
});

addLessonButton.addEventListener('click', (e) => {
    e.preventDefault();
    const lessonID = document.getElementById('lesson-id').value;
    const lessonTitle = document.getElementById('lesson-title').value;
    const lessonType = document.getElementById('lesson-type').value;
    const lessonDuration = document.getElementById('lesson-duration').value;
    const lessonFileInput = document.getElementById('lesson-file');
    let lessonFile = '';
    if (lessonType === 'Video') {
        lessonFile = lessonFileInput.value;
        lessonData.video_url = lessonFile;
    } else {
        if (mdinput.checked) {
            const mdFile = lessonFileInput.files[0];
            lessonFile = `${document.getElementById('course-id').value}/${mdFile.name}`;
        } else {
            lessonFile = `${document.getElementById('course-id').value}/${lessonFileInput.value}`;
        }
        lessonData.file_url = lessonFile;
    }

    lessonData.lesson_id = lessonID;
    lessonData.title = lessonTitle;
    lessonData.type = lessonType;
    lessonData.duration = lessonDuration;
    newCourseData.lessons.push(lessonData);

    //Handle markdown file upload
    newCourseData.lessons.forEach(lesson => {
        if (mdinput.checked) {
            const mdFileInput = document.getElementById('lesson-file');
            if (lessonData.type !== 'Video') {
                const mdFile = mdFileInput.files[0];
                if (mdFile) {
                    const mdPath = `documents/${newCourse.id}/${mdFile.name}`;
                    addedDocuments.push({ file: mdFile, path: mdPath, courseId: document.getElementById('course-id').value });
                }
            }
        }
    });

    //Clear form
    document.getElementById('lesson-id').value = '';
    document.getElementById('lesson-title').value = '';
    document.getElementById('lesson-duration').value = '';
    document.getElementById('lesson-file').value = '';
    document.getElementById('lesson-type').value = 'Document';
    const lessonFileLabel = document.getElementById('lesson-file-label');
    if (mdinput.checked) {
        lessonFileLabel.innerHTML = 'Lesson File (Markdown):';
        lessonFileInput.type = 'file';
        lessonFileInput.accept = '.md';
    } else {
        lessonFileLabel.innerHTML = 'Lesson File Name:';
        lessonFileInput.type = 'text';
        lessonFileInput.accept = '';
    }
    lessonData = {};

    const lessonsView = document.getElementById('lessons-view');
    console.log(lessonsView);
    const lessonItem = document.createElement('div');
    lessonItem.classList.add('lesson-item');
    lessonItem.innerHTML = `
        <h4>${lessonTitle} (${lessonType})</h4>
        <p>Duration: ${lessonDuration}</p>
        <p>File: ${lessonFile}</p>
    `;
    const removeLessonButton = document.createElement('button');
    removeLessonButton.textContent = 'Remove Lesson';
    removeLessonButton.addEventListener('click', () => {
        lessonsView.removeChild(lessonItem);
        newCourseData.lessons = newCourseData.lessons.filter(lesson => lesson.lesson_id !== lessonID);
        addedDocuments = addedDocuments.filter(doc => !(doc.courseId === newCourse.id && doc.path.endsWith(lessonFile.split('/').pop())));
    });
    lessonItem.appendChild(removeLessonButton);
    lessonsView.appendChild(lessonItem);

    console.log(newCourseData);
});

addCourseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //Save course info
    newCourse.id = document.getElementById('course-id').value;
    newCourse.title = document.getElementById('course-title').value;
    newCourse.description = document.getElementById('course-short-description').value;
    newCourse.level = document.getElementById('course-level').value;
    newCourse.number_of_lessons = parseInt(document.getElementById('number-classes').value);
    newCourse.duration = document.getElementById('course-duration').value;

    //Save course data
    newCourseData.course_id = newCourse.id;
    newCourseData.title = newCourse.title;
    newCourseData.autor = document.getElementById('course-author').value;
    newCourseData.description = document.getElementById('course-long-description').value;
    newCourseData.level = newCourse.level;
    newCourseData.number_of_lessons = newCourse.number_of_lessons;
    newCourseData.duration = newCourse.duration;

    //Handle image upload
    if (imginput.checked) {
        const imgFileInput = document.getElementById('image-file');
        const imgFiles = imgFileInput.files;
        for (let i = 0; i < imgFiles.length; i++) {
            const imgFile = imgFiles[i];
            const imgPath = `img/${document.getElementById('course-id').value}/${imgFile.name}`;
            addedImages.push({ file: imgFile, path: imgPath, courseId: document.getElementById('course-id').value });
        }
    }

    //Generate JSON file for the course
    addedCourses.push(newCourseData);
    coursesList.courses.push(newCourseData);
    loadCoursesToRemove();

    //Reset form
    document.getElementById('course-id').value = '';
    document.getElementById('course-title').value = '';
    document.getElementById('course-short-description').value = '';
    document.getElementById('course-long-description').value = '';
    document.getElementById('course-level').value = 'beginner';
    document.getElementById('number-classes').value = '';
    document.getElementById('course-duration').value = '';
    document.getElementById('course-author').value = '';
    document.getElementById('lesson-id').value = '';
    document.getElementById('lesson-title').value = '';
    document.getElementById('lesson-duration').value = '';
    document.getElementById('lesson-file').value = '';
    document.getElementById('lesson-type').value = 'Video';
    newCourse = {};
    lessonData = {};
    document.getElementById('lessons-view').innerHTML = '';
    newCourseData = { "lessons": [] };
});

//remove course
const loadCoursesToRemove = () => {
    const courseListElement = document.getElementById('courses-to-remove');
    courseListElement.innerHTML = '';
    coursesList.courses.forEach(course => {
        const listItem = document.createElement('li');
        listItem.textContent = course.title;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeCourse(course.id));
        listItem.appendChild(removeButton);
        courseListElement.appendChild(listItem);
    });
};

const removeCourse = (courseId) => {
    coursesList.courses = coursesList.courses.filter(course => course.id !== courseId);
    //remove files associated with the course
    addedCourses = addedCourses.filter(course => course.course_id !== courseId);
    addedImages = addedImages.filter(img => img.courseId !== courseId);
    addedDocuments = addedDocuments.filter(doc => doc.courseId !== courseId);
    loadCoursesToRemove();
};

//Modify course
const updateCorseButton = document.getElementById('update-course-button');
updateCorseButton.addEventListener('click', () => {
    updateCoursestoModify();
});

const updateCoursestoModify = () => {
    const courseListElement = document.getElementById('courses-to-update');
    courseListElement.innerHTML = '';

    coursesList.courses.forEach(course => {
        const listItem = document.createElement('li');
        listItem.textContent = course.title;
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update-button');
        updateButton.addEventListener('click', () => loadCourseDataForUpdate(course.id));
        listItem.appendChild(updateButton);
        courseListElement.appendChild(listItem);
    });
};

const loadCourseDataForUpdate = (courseId) => {
    const courseData = coursesList.courses.find(course => course.id === courseId);
    let courseDataFull;

    fetch(`/dictionary/${courseId}.json`)
        .then(response => response.json())
        .then(data => {
            courseDataFull = data;
            // Populate the update form with the fetched data
            document.getElementById('update-course-title').value = courseDataFull.title;
            document.getElementById('update-course-short-description').value = courseData.description
            document.getElementById('update-course-long-description').value = courseDataFull.description;
            document.getElementById('update-course-author').value = courseDataFull.autor;
            console.log(courseDataFull.level);
            document.getElementById('update-course-level').value = courseDataFull.level.toLowerCase();
            document.getElementById('update-number-classes').value = courseDataFull.number_of_lessons;
            document.getElementById('update-course-duration').value = courseDataFull.duration;
        });
};


// Download zip
const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', () => {
    zip.folder("dictionary/").file('courses-list.json', JSON.stringify(coursesList, null, 2));

    addedCourses.forEach(course => {
        const courseJson = JSON.stringify(course, null, 2);
        zip.folder("dictionary/").file(`${course.course_id}.json`, courseJson);
    });
    const coursesListJson = JSON.stringify(coursesList, null, 2);
    zip.folder("dictionary/").file('courses-list.json', coursesListJson);

    addedImages.forEach(img => {
        zip.folder(`img/${img.courseId}/`).file(img.file.name, img.file);
    });

    addedDocuments.forEach(doc => {
        zip.folder(`documents/${doc.courseId}/`).file(doc.file.name, doc.file);
    });

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // see FileSaver.js
            saveAs(content, "blog-doctor-data.zip");
        });
});