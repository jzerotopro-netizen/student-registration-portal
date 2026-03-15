// ================================
//   GGU STUDENT PORTAL - app.js
// ================================

const API_BASE = 'http://192.168.1.15:8080/api';
const ADMIN_PASSWORD = 'ggu@admin123';

let allStudents = [];

// ---- Toggle Buttons (Year / Semester / Section) ----
function selectToggle(field, value, btn) {
  const groupId = field + 'Group';
  document.querySelectorAll(`#${groupId} .toggle-btn`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(field).value = value;
}

// ---- Form Submit ----
async function submitForm(e) {
  e.preventDefault();

  const fullName   = document.getElementById('fullName').value.trim();
  const pinNumber  = document.getElementById('pinNumber').value.trim();
  const department = document.getElementById('department').value;
  const year       = document.getElementById('year').value;
  const semester   = document.getElementById('semester').value;
  const section    = document.getElementById('section').value;
  const email      = document.getElementById('email').value.trim();

  const skills = [];
  document.querySelectorAll('#skillsGrid input[type="checkbox"]:checked').forEach(cb => {
    skills.push(cb.value);
  });

  const msgEl = document.getElementById('formMessage');

  // Validate
  if (!year)      { showMsg('Please select a Year.', 'error'); return; }
  if (!semester)  { showMsg('Please select a Semester.', 'error'); return; }
  if (!section)   { showMsg('Please select a Section.', 'error'); return; }
  if (skills.length === 0) { showMsg('Please select at least one skill.', 'error'); return; }

  const payload = { fullName, pinNumber, department, year: parseInt(year), semester: parseInt(semester), section, email, skills: skills.join(', ') };

  const btn = document.querySelector('.submit-btn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Registering...';

  try {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast('✅ Registration successful!', 'success');
      document.getElementById('registrationForm').reset();
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('year').value = '';
      document.getElementById('semester').value = '';
      document.getElementById('section').value = '';
      msgEl.textContent = '';
    } else {
      const err = await res.json();
      showMsg(err.message || 'Registration failed. Please try again.', 'error');
    }
  } catch (err) {
    showMsg('Cannot connect to server. Make sure the backend is running on port 8080.', 'error');
  } finally {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Register Now';
  }
}

function showMsg(text, type) {
  const el = document.getElementById('formMessage');
  el.textContent = text;
  el.className = 'form-message ' + type;
}

// ---- Admin Login ----
function openAdminLogin() {
  document.getElementById('adminPassword').value = '';
  document.getElementById('adminError').textContent = '';
  openModal('adminLoginModal');
}

function verifyAdmin() {
  const pwd = document.getElementById('adminPassword').value;
  if (pwd === ADMIN_PASSWORD) {
    closeModal('adminLoginModal');
    openDashboard();
  } else {
    document.getElementById('adminError').textContent = '❌ Incorrect password. Try again.';
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminPassword').focus();
  }
}

// ---- Dashboard ----
async function openDashboard() {
  openModal('adminDashboard');
  await loadStudents();
}

async function loadStudents() {
  try {
    const res = await fetch(`${API_BASE}/students`);
    allStudents = await res.json();
    renderTable(allStudents);
    document.getElementById('studentCount').textContent = `Total Registered: ${allStudents.length} students`;
  } catch {
    document.getElementById('studentTableBody').innerHTML =
      '<tr><td colspan="10" class="loading-row" style="color:red">⚠️ Cannot connect to backend. Make sure Spring Boot is running.</td></tr>';
  }
}

function renderTable(students) {
  const tbody = document.getElementById('studentTableBody');
  if (!students.length) {
    tbody.innerHTML = '<tr><td colspan="10" class="loading-row">No students registered yet.</td></tr>';
    return;
  }
  tbody.innerHTML = students.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${s.fullName}</strong></td>
      <td>${s.pinNumber}</td>
      <td>${s.department}</td>
      <td>${s.year}</td>
      <td>${s.semester}</td>
      <td>${s.section}</td>
      <td>${s.email}</td>
      <td>${(s.skills || '').split(',').map(sk => `<span class="skill-tag">${sk.trim()}</span>`).join('')}</td>
      <td><button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button></td>
    </tr>
  `).join('');
}

function filterStudents() {
  const q    = document.getElementById('searchInput').value.toLowerCase();
  const dept = document.getElementById('filterDept').value;
  const filtered = allStudents.filter(s => {
    const matchQ    = !q || s.fullName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.pinNumber.toLowerCase().includes(q);
    const matchDept = !dept || s.department === dept;
    return matchQ && matchDept;
  });
  renderTable(filtered);
}

async function deleteStudent(id) {
  if (!confirm('Are you sure you want to delete this student?')) return;
  try {
    await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' });
    showToast('Student deleted.', 'success');
    await loadStudents();
  } catch {
    showToast('Delete failed. Check backend.', 'error');
  }
}

// ---- Modal Helpers ----
function openModal(id)  { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function closeOnOverlay(e, id) { if (e.target === document.getElementById(id)) closeModal(id); }

// ---- Toast ----
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  setTimeout(() => { t.className = 'toast'; }, 3500);
}
