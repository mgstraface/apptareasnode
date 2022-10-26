const { guardarDb, leerDb } = require("./helpers/guardarArchivo");
const {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
	let opt = "";
	const tareas = new Tareas();

	const tareasDb = leerDb();

	if (tareasDb) {
		tareas.cargarTareasFromArray(tareasDb);
	}

	do {
		//imprimir el menú
		opt = await inquirerMenu();
		switch (opt) {
			case "1":
				//crear opcion
				const desc = await leerInput("Descripción: ");
				tareas.crearTarea(desc);
				break;

			case "2":
				//listar todas
				tareas.listadoCompleto();
				break;

			case "3":
				//listar completadas
				tareas.listarPendientesCompletadas(true);
				break;

			case "4":
				//listar pendientes
				tareas.listarPendientesCompletadas(false);
				break;

			case "5":
				//completadas o pendientes
				const ids = await mostrarListadoCheckList(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;

			case "6":
				//eliminar una tarea
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id !== "0") {
					const ok = await confirmar("¿Está seguro?");
					if (ok) {
						tareas.borrarTarea(id);
						console.log("Tarea borrada".green);
					}
				}
				break;

			default:
				break;
		}

		guardarDb(tareas.listadoArr);

		await pausa();
	} while (opt !== "0");
};

main();
