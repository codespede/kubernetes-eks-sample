import * as shell from "shelljs";

// Copy all the view templates
shell.cp("-R", "src/themes", "dist/");
shell.cp("-R", "src/config", "dist/");
shell.cp("-R", ".env", "dist/");
