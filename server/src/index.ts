import app from "./app.js";
import { seedInitialData } from './repositories/seedData.js';

const PORT = process.env.PORT ?? 3000;

seedInitialData();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
