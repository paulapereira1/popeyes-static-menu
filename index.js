const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
app.use(express.static('Public'));
app.use(express.json());

app.post('/clicks', async function(request, response) {
  const allInfo = request.body;
  console.log(allInfo.id);
   
  const result = await db.query(
  `INSERT INTO clicks (clickX, clickY, tracking, target, time, id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
  [
  allInfo.clickX,
  allInfo.clickY,
  allInfo.tracking,
  allInfo.target,
  allInfo.time,
  allInfo.id,
  ]
  );
  console.log(result);
   
  response.json({ click: 'tracked' });
});

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);