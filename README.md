# 🧑‍💼 Job Portal

A full-stack Job Portal application where users can apply for jobs and recruiters can manage job postings and view applications.

Deployed Frontend: [Vercel Link](https://job-portal-omega-inky.vercel.app/)  
Deployed Backend: [Render Link](https://job-portal-nsz5.onrender.com)

---

## 🚀 Features

### 👤 User (Job Seeker)
- View available job listings.
- Apply for jobs with a single click.
- Check application status (Accepted / Rejected / Pending).
- Prevents multiple applications for the same job.

### 🧑‍💼 Recruiter
- Add new job postings.
- View all jobs they have posted.
- Manage job posts.
- View applications received for a specific job.
- Change the status of user applications (e.g., Accept or Reject).

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Axios
- React Router
- Tailwind CSS / Bootstrap (if applicable)

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcrypt for password hashing
- CORS and dotenv

---

## 📁 Folder Structure

```bash
job-portal/
├── client/              # Frontend (React)
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/              # Backend (Node + Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── README.md

🧪 How to Run Locally
1. Clone the repository
  git clone https://github.com/AayushSinghRajput/job-portal.git
  cd job-portal
2. Frontend Setup
 cd client
 npm install
 npm start
3. Backend Setup
  cd server
  npm install
  node server.js
