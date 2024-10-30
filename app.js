const express = require('express');

const app = express();

const PORT = 5325;

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));