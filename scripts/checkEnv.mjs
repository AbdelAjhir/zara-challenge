import fs from "fs";
import chalk from "chalk";

if (!fs.existsSync(".env")) {
  console.error(
    chalk.red("ERROR: Falta el archivo .env en la raíz del proyecto")
  );
  console.error("Por favor, crea un archivo .env antes de ejecutar la app");
  console.error("Puedes hacerlo con: cp .env.example .env\n");
  process.exit(1);
}
