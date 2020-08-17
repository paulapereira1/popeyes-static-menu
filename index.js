const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const pg = require('pg');
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });


app.use(express.static('Public'));
app.use(express.json());

app.post('/clicks', async function(request, response) {
  const [clickX, clickY, tracking, target, time, id] = request.body;

  const result = await db.query(
    `INSERT INTO clicks (clickX, clickY, tracking, target, time, id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    );
    console.log(result);
  response.json({ click: 'tracked' });
});

db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
  id SERIAL PRIMARY KEY,
  time int NOT NULL,
  target VARCHAR(200) NOT NULL,
  tracking VARCHAR(200) NOT NULL,
  clickY VARCHAR(200) NOT NULL,
  clickX VARCHAR(200) NOT NULL,
  userId int NOT NULL
  );
`);

 
app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);