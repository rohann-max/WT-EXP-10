
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!API_URL) {
          throw new Error('VITE_API_URL is not configured.');
        }

        const response = await fetch(
          `${API_URL.replace(/\/+$/, '')}/api/students`
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Unable to load student records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [API_URL]);

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
          {students.map((student) => (
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
