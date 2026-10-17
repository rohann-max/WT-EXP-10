import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        return response.json();
      })
      .then(data => setStudents(data))
      .catch(() => setError('Unable to load student records.'))
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="container">
      <h1>Student Directory</h1>
      <p className="subtitle">
        Student records fetched from the Express REST API
      </p>
      {loading && <p>Loading students...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <section className="student-list">
          {students.map(student => (
            <article className="student-card" key={student.id}>
              <h2>{student.name}</h2>
              <p><strong>ID:</strong> {student.id}</p>
              <p><strong>Branch:</strong> {student.branch}</p>
              <p><strong>Year:</strong> {student.year}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
export default App;