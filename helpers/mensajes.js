require("colors");

const mostrarMenu = () => {
	return new Promise((resolve) => {
		console.clear();
		console.log("==========================".america);
		console.log("  Seleccione una opción");
		console.log("==========================\n".america);

		console.log(`${"1.".red} Crear tarea`);
		console.log(`${"2.".red} Listar tareas`);
		console.log(`${"3.".red} Listar tareas completadas`);
		console.log(`${"4.".red} Listar tareas pendientes`);
		console.log(`${"5.".red} Completar tareas`);
		console.log(`${"6.".red} Una una tarea`);
		console.log(`${"0.".red} Salir \n`);

		const readLine = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		readLine.question("Seleccione una opción: ", (opt) => {
			readLine.close();
			resolve(opt);
		});
	});
};

const pausa = () => {
	return new Promise((resolve) => {
		const readLine = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		readLine.question(`\nPresione ${"ENTER".blue} para continuar.\n`, (opt) => {
			readLine.close();
			resolve();
		});
	});
};

module.exports = {
	mostrarMenu,
	pausa,
};
