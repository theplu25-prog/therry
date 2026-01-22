const estudiantesPorCurso = JSON.parse(localStorage.getItem("estudiantesPorCurso")) || {
    octavo: [],
    noveno: [],
    decimo: [],
    primeroBachillerato: [],
    segundoBachillerato: [],
    terceroBachillerato: []
};

const cursoSelect = document.getElementById("cursoSelect");
const nombreAlumnoInput = document.getElementById("nombreAlumno");
const edadAlumnoInput = document.getElementById("edadAlumno");
const cedulaAlumnoInput = document.getElementById("cedulaAlumno");
const agregarAlumnoBtn = document.getElementById("agregarAlumno");
const cursosListadosDiv = document.getElementById("cursosListados");
const especialidadDiv = document.getElementById("especialidadDiv");
const especialidadSelect = document.getElementById("especialidadSelect");

cursoSelect.addEventListener("change", () => {
    const cursoSeleccionado = cursoSelect.value;
    especialidadDiv.style.display = (cursoSeleccionado.includes("Bachillerato")) ? "block" : "none";
});

function agregarEstudiante() {
    const curso = cursoSelect.value;
    const nombre = nombreAlumnoInput.value.trim();
    const edad = edadAlumnoInput.value.trim();
    const cedula = cedulaAlumnoInput.value.trim();
    const especialidad = especialidadSelect.value;

    if (!nombre || !edad || !cedula) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    const estudiante = { nombre, edad, cedula };
    if (curso.includes("Bachillerato")) estudiante.especialidad = especialidad;

    estudiantesPorCurso[curso].push(estudiante);
    estudiantesPorCurso[curso].sort((a, b) => a.nombre.localeCompare(b.nombre));

    localStorage.setItem("estudiantesPorCurso", JSON.stringify(estudiantesPorCurso));

    nombreAlumnoInput.value = "";
    edadAlumnoInput.value = "";
    cedulaAlumnoInput.value = "";

    mostrarEstudiantes();
}

function mostrarEstudiantes() {
    cursosListadosDiv.innerHTML = "";

    for (const curso in estudiantesPorCurso) {
        const estudiantes = estudiantesPorCurso[curso];
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");

        const header = document.createElement("div");
        header.classList.add("accordion-header");
        header.textContent = `Curso: ${curso} (${estudiantes.length} Estudiante${estudiantes.length === 1 ? "" : "s"})`;

        const content = document.createElement("div");
        content.classList.add("accordion-content");

        const ul = document.createElement("ul");
        estudiantes.forEach((estudiante, index) => {
            let estudianteTexto = `${index + 1}. ${estudiante.nombre} (Edad: ${estudiante.edad}, Cédula: ${estudiante.cedula})`;
            if (estudiante.especialidad) estudianteTexto += `, Especialidad: ${estudiante.especialidad}`;

            const li = document.createElement("li");
            li.textContent = estudianteTexto;
            ul.appendChild(li);
        });

        content.appendChild(ul);
        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        cursosListadosDiv.appendChild(accordionItem);

        header.addEventListener("click", () => {
            accordionItem.classList.toggle("active");
        });
    }
}

agregarAlumnoBtn.addEventListener("click", agregarEstudiante);
mostrarEstudiantes();