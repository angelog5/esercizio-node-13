import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: "planets_db",
  user: "your_username",
  password: "your_password",
});

export const setupDb = async () => {
  await db.none("DROP TABLE IF EXISTS planets;");
  await db.none(`
    CREATE TABLE planets (
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);
  await db.none("INSERT INTO planets (name) VALUES ($1), ($2);", [
    "Earth",
    "Mars",
  ]);
};

setupDb().catch((error) => {
  console.error("Error setting up the database:", error);
});
