const courseData = {
  bsc: { name: 'BSc', specializations: ['Computer Science', 'Data Science', 'Mathematics', 'Physics'], videos: ['BSc Computer Science roadmap', 'Data science for beginners'] },
  bca: { name: 'BCA', direct: true, specializations: [], videos: ['BCA career roadmap', 'Web development full course'] },
  bcom: { name: 'BCom', direct: true, specializations: [], videos: ['BCom career options', 'Accounting and finance basics'] },
  bba: { name: 'BBA', specializations: ['Marketing', 'Finance', 'Human Resources', 'Business Analytics'], videos: ['BBA career roadmap', 'Business analytics basics'] },
  mba: { name: 'MBA', specializations: ['Marketing', 'Finance', 'Human Resources', 'Business Analytics'], videos: ['MBA specializations explained', 'MBA skills for jobs'] },
  msc: { name: 'MSc', specializations: ['Computer Science', 'Data Science', 'Mathematics', 'Biotechnology'], videos: ['MSc career options', 'Data science learning path'] },
  mca: { name: 'MCA', direct: true, specializations: [], videos: ['MCA career roadmap', 'Programming for MCA students'] },
  mcom: { name: 'MCom', direct: true, specializations: [], videos: ['MCom career options', 'Advanced accounting basics'] },
  btech: { name: 'BTech', specializations: ['Computer Science', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering'], videos: ['BTech branch comparison', 'Engineering placement preparation'] }
};

const technologyRoles = {
  fresher: ['Junior Software Developer', 'Web Developer', 'QA Tester', 'Technical Support Associate', 'System Support Engineer', 'Junior Data Analyst', 'Cloud Support Associate', 'Database Assistant'],
  experienced: ['Software Engineer', 'Full-stack Developer', 'QA Automation Engineer', 'Technical Lead', 'Systems Analyst', 'Data Engineer', 'Cloud Engineer', 'Database Administrator']
};
const dataRoles = {
  fresher: ['Junior Data Analyst', 'Reporting Analyst', 'Research Assistant', 'BI Trainee', 'Data Quality Associate', 'MIS Executive', 'Operations Analyst', 'Junior Statistician'],
  experienced: ['Data Analyst', 'Data Scientist', 'Business Intelligence Analyst', 'Research Analyst', 'Data Engineer', 'Product Analyst', 'Analytics Consultant', 'Senior Statistician']
};
const businessRoles = {
  fresher: ['Business Development Executive', 'Marketing Executive', 'HR Associate', 'Operations Executive', 'Management Trainee', 'Sales Coordinator', 'Business Analyst Trainee', 'Client Relationship Executive'],
  experienced: ['Business Analyst', 'Marketing Manager', 'HR Generalist', 'Operations Manager', 'Product Manager', 'Sales Manager', 'Strategy Consultant', 'Client Success Manager']
};
const financeRoles = {
  fresher: ['Accounts Executive', 'Audit Assistant', 'Finance Associate', 'Tax Assistant', 'Banking Associate', 'Credit Analyst Trainee', 'Payroll Assistant', 'MIS Executive'],
  experienced: ['Financial Analyst', 'Senior Accountant', 'Tax Consultant', 'Audit Manager', 'Banking Relationship Manager', 'Credit Analyst', 'Finance Manager', 'Risk Analyst']
};
const engineeringRoles = {
  fresher: ['Graduate Engineer Trainee', 'Design Engineer Trainee', 'Site Engineer Trainee', 'Quality Engineer', 'Production Engineer', 'CAD Engineer', 'Maintenance Engineer', 'Project Coordinator'],
  experienced: ['Project Engineer', 'Design Engineer', 'Site Engineer', 'Quality Manager', 'Production Manager', 'CAD Design Lead', 'Maintenance Manager', 'Project Manager']
};
const roleCatalog = {};
const assignRoles = (names, roles) => names.forEach(name => { roleCatalog[name] = roles; });
assignRoles(['Computer Science', 'Computer Applications', 'Web Development', 'Software Development', 'Information Technology'], technologyRoles);
assignRoles(['Data Science', 'Data Analytics', 'Mathematics', 'Business Analytics'], dataRoles);
assignRoles(['Marketing', 'Human Resources'], businessRoles);
assignRoles(['Accounting & Finance', 'Banking & Insurance', 'Taxation', 'Accounting', 'Banking', 'Finance'], financeRoles);
assignRoles(['Physics', 'Biotechnology'], dataRoles);
assignRoles(['Cyber Security', 'Cloud Computing'], technologyRoles);
assignRoles(['BCA', 'MCA'], technologyRoles);
assignRoles(['BCom', 'MCom'], financeRoles);
assignRoles(['Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering'], engineeringRoles);

let selectedCourses = [];
let activeCourseKey = null;
let experience = 'fresher';
const specializationPanel = document.querySelector('#specialization-panel');
const specializationButtons = document.querySelector('#specialization-buttons');
const selectedCoursesElement = document.querySelector('#selected-courses');
const resultsSection = document.querySelector('#jobs');
const learningSection = document.querySelector('#learning');

document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: 'smooth' })));
document.querySelectorAll('[data-course]').forEach(button => button.addEventListener('click', () => toggleCourse(button)));

function toggleCourse(button) {
  const key = button.dataset.course;
  const index = selectedCourses.indexOf(key);
  if (index === -1) {
    selectedCourses.push(key);
    activeCourseKey = key;
    if (courseData[key].direct) courseData[key].selectedSpecialization = null;
    button.classList.add('selected');
  } else {
    selectedCourses.splice(index, 1);
    courseData[key].selectedSpecialization = null;
    button.classList.remove('selected');
    activeCourseKey = selectedCourses[selectedCourses.length - 1] || null;
  }
  const pendingCourse = selectedCourses.find(courseKey => !courseData[courseKey].direct && !courseData[courseKey].selectedSpecialization);
  if (pendingCourse) {
    activeCourseKey = pendingCourse;
    specializationPanel.hidden = false;
    renderSpecializations();
  } else if (selectedCourses.length) {
    specializationPanel.hidden = true;
    showSuggestions();
  } else {
    specializationPanel.hidden = true;
    resultsSection.hidden = true;
    learningSection.hidden = true;
  }
}

function isCourseReady(key) {
  return courseData[key].direct || Boolean(courseData[key].selectedSpecialization);
}

function renderSpecializations() {
  const course = courseData[activeCourseKey];
  document.querySelector('#specialization-title').textContent = `Choose your ${course.name} specialization.`;
  selectedCoursesElement.innerHTML = selectedCourses.map(key => `<button class="selected-chip ${key === activeCourseKey ? 'active' : ''}" data-active-course="${key}">${courseData[key].name}${courseData[key].selectedSpecialization ? ` · ${courseData[key].selectedSpecialization}` : ''}</button>`).join('');
  selectedCoursesElement.querySelectorAll('[data-active-course]').forEach(button => button.addEventListener('click', () => { activeCourseKey = button.dataset.activeCourse; renderSpecializations(); }));
  specializationButtons.innerHTML = course.specializations.map(item => `<button class="${course.selectedSpecialization === item ? 'chosen' : ''}" data-specialization="${item}">${item}<span>${course.selectedSpecialization === item ? '✓' : '→'}</span></button>`).join('');
  specializationButtons.querySelectorAll('button').forEach(button => button.addEventListener('click', () => selectSpecialization(button.dataset.specialization)));
}

function selectSpecialization(specialization) {
  courseData[activeCourseKey].selectedSpecialization = specialization;
  renderSpecializations();
  const allCoursesReady = selectedCourses.every(isCourseReady);
  if (allCoursesReady) showSuggestions();
}

document.querySelector('#suggestion-button').addEventListener('click', showSuggestions);
function showSuggestions() {
  const readyCourses = selectedCourses.filter(isCourseReady);
  if (!readyCourses.length) return;
  document.querySelector('#selected-course').textContent = readyCourses.map(key => courseData[key].selectedSpecialization ? `${courseData[key].name} · ${courseData[key].selectedSpecialization}` : courseData[key].name).join(' + ');
  document.querySelector('#results-title').textContent = readyCourses.length > 1 ? 'Combined career suggestions.' : `${courseData[readyCourses[0]].selectedSpecialization || courseData[readyCourses[0]].name} jobs.`;
  resultsSection.hidden = false;
  learningSection.hidden = false;
  renderJobs(readyCourses);
  renderLearning(readyCourses);
}

function renderJobs(readyCourses = selectedCourses.filter(isCourseReady)) {
  const jobs = [...new Set(readyCourses.flatMap(key => roleCatalog[courseData[key].direct ? courseData[key].name : courseData[key].selectedSpecialization][experience]))];
  document.querySelector('#job-grid').innerHTML = jobs.map((job, index) => `<button class="job-card" data-role="${job}"><span>${String(index + 1).padStart(2, '0')}</span><h3>${job}</h3><p>${experience === 'fresher' ? 'Good starting role after learning the basics.' : 'A growth role for professionals with relevant experience.'}</p><b>Read role info →</b></button>`).join('');
  document.querySelectorAll('[data-role]').forEach(card => card.addEventListener('click', () => openRole(card.dataset.role)));
}

function renderLearning(readyCourses) {
  const videos = [...new Set(readyCourses.flatMap(key => courseData[key].videos))];
  document.querySelector('#learning-list').innerHTML = videos.map((video, index) => `<a class="learning-item" href="https://www.youtube.com/results?search_query=${encodeURIComponent(video)}" target="_blank" rel="noopener"><span class="play-icon">▶</span><span><b>${video}</b><small>YouTube learning path ${index + 1}</small></span><strong>↗</strong></a>`).join('');
}

document.querySelectorAll('[data-experience]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.experience-button.active').classList.remove('active');
  button.classList.add('active');
  experience = button.dataset.experience;
  if (!resultsSection.hidden) renderJobs();
}));

const roleModal = document.querySelector('#role-modal');
function openRole(role) {
  const related = selectedCourses.filter(isCourseReady).map(key => courseData[key].selectedSpecialization ? `${courseData[key].name} ${courseData[key].selectedSpecialization}` : courseData[key].name).join(' + ');
  document.querySelector('#role-details').innerHTML = `<h2>${role}</h2><p class="role-intro">${role} is a ${experience === 'fresher' ? 'beginner-friendly starting role' : 'growth role for professionals'} related to your ${related} selection.</p><div class="role-facts"><div><small>What you do</small><strong>Work on real tasks, collaborate with teams and build practical results.</strong></div><div><small>Start preparing</small><strong>Learn the basics, complete projects and practise role-specific interview questions.</strong></div><div><small>Useful skills</small><strong>Communication, problem solving and tools related to your selected specialization.</strong></div></div>`;
  roleModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeRole() { roleModal.hidden = true; document.body.style.overflow = ''; }
document.querySelector('#modal-close').addEventListener('click', closeRole);
roleModal.addEventListener('click', event => { if (event.target === roleModal) closeRole(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeRole(); });
