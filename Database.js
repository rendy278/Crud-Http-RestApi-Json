import * as fs from "fs/promises";

const Database = {
  init: async () => {
    const db = await fs.readFile("./db.json", "utf8");
    return JSON.parse(db);
  },
  save: async (dbModified) => {
    await fs.writeFile(
      "./db.json",
      JSON.stringify(dbModified, null, 2),
      "utf-8"
    );
  },
};

export default Database;
