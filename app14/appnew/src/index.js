const express = require('express');

const students = [
  { id: 1, name: 'John', age: 20, city: 'New York' },
  { id: 2, name: 'Jane', age: 22, city: 'Los Angeles' },
  { id: 3, name: 'Mike', age: 21, city: 'Chicago' },
];

const app = express();

app.get('/', (req, res) => {
  res.send('response from server');
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


