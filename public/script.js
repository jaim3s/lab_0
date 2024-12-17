// Referencia al contenedor dinámico
const content = document.getElementById("content");

/*
 *
 *
 * INICIO
 *
 *
 */
document.getElementById("home-link").addEventListener("click", (e) => {
  e.preventDefault();

  // CRUD de personas (contenido dinámico)
  content.innerHTML = `
    <h1>Bienvenido al sistema de administración Nacional</h1>
    <ul>
      <li>Haz clic en "Personas" en el menú para acceder al CRUD de personas.</li>
      <li>Haz clic en "Municipios" en el menú para acceder al CRUD de municipios.</li>
      <li>Haz clic en "Viviendas" en el menú para acceder al CRUD de viviendas.</li>
      <li>Haz clic en "Persona tiene viviendas" en el menú para acceder al CRUD de personas tiene viviendas.</li>
      <li>Haz clic en "Contacto" en el menú para acceder a la información de contacto de los creadores del sistema de administración nacional.</li>
    </ul>
  `;
});

/*
 *
 *
 * CONTACTO
 *
 *
 */
document.getElementById("contacto").addEventListener("click", (e) => {
  e.preventDefault();

  // CRUD de personas (contenido dinámico)
  content.innerHTML = `
    <h1>Creadores del sistema de administración Nacional</h1>
    <table>
       <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
        </tr>
      </thead>
      <tr>
        <td>Juan David Jaimes Claros</td>
        <td>jujaimesc@unal.edu.co</td>
      </tr>
      <tr>
        <td>Daniel Alejandro Gonzales Calderon</td>
        <td>dgonzalezca@unal.edu.co</td>
      </tr>
      <tr>
        <td>Jose Esteban Alvarado Monroy</td>
        <td>joalvarado@unal.edu.co</td>
      </tr>
      <tr>
        <td>Breyner Ismael Ciro Otero</td>
        <td>bciro@unal.edu.co</td>
      </tr>
    </table>
  `;
});

/*
 *
 *
 * PERSONAS CRUD
 *
 *
 */
document.getElementById("crud-personas-link").addEventListener("click", (e) => {
  e.preventDefault();

  // CRUD de personas (contenido dinámico)
  content.innerHTML = `
    <h1>Gestión de Personas</h1>

    <!-- Formulario para crear/actualizar personas -->
    <form id="userForm">
      <div>
        <label for="userId">Persona ID:</label>
        <input type="number" id="userId" placeholder="Ingresa tu número de identificación" required>
      </div>
      <div>
        <label for="namePersona">Nombre:</label>
        <input type="text" id="namePersona" name="namePersona" placeholder="Ingresa tu nombre" required>
      </div>
      <div>
        <label for="telefono">Telefono:</label>
        <input type="text" id="telefono" name="telefono" pattern="3[0-9]{9}" placeholder="Ingresa tu número de telefono">
      </div>
      <div>
        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required min="1" max="130" placeholder="Ingresa tu edad">
      </div>
      <div>
      <label for="sexo">Sexo:</label>
        <select id="sexo" name="sexo" required>
          <option value="" disabled selected>Seleccione...</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>
      <div>
        <label for="vivienda">Vivienda:</label>
        <input type="number" id="vivienda" placeholder="Identificación de vivienda en donde habita">
      </div>
      <div>
        <label for="cf">Cabeza de familia:</label>
        <input type="number" id="cf" placeholder="Identificación de cabeza de familia">
      </div>
      <button type="submit">Guardar</button>
    </form>

    <hr>

    <!-- Tabla para mostrar personas -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>Edad</th>
          <th>Sexo</th>
          <th>Vivienda</th>
          <th>Cabeza de familia</th>
        </tr>
      </thead>
      <tbody id="userTable"></tbody>
    </table>
  `;

  // Carga lógica del CRUD
  setupCrudPersonas();
});

// Función para cargar todos las personas
async function loadUsers(API_URL) {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    userTable.innerHTML = users
      .map(
        (user) => `
      <tr>
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.telefono}</td>
        <td>${user.edad}</td>
        <td>${user.sexo}</td>
        <td>${user.vivienda_id_viv}</td>
        <td>${user.persona_id}</td>
        <td class="actions">
          <button class="update" onclick="editUser(${user.id}, '${user.nombre}', '${user.telefono}', '${user.edad}', '${user.sexo}', '${user.vivienda_id_viv}', '${user.persona_id}')">Editar</button>
          <button onclick="deleteUser(${user.id}, '${API_URL}')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error al cargar las personas:", err);
  }
}

async function deleteUser(id, API_URL) {
  if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadUsers(API_URL);
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
  }
}

async function editUser(id, name, telefono, edad, sexo, vivienda, cf) {
  const attr = [id, name, telefono, edad, sexo, vivienda, cf];
  console.log(attr)
  for (let i = 0; i < attr.length; i++) {

  }
  flag = false;
}

function setupCrudPersonas() {
  // Obtener referencias al DOM ( de la función editUser)
  const userForm = document.getElementById("userForm");
  const userTable = document.getElementById("userTable");
  const userIdInput = document.getElementById("userId");
  const nameInput = document.getElementById("namePersona");
  const telefonoInput = document.getElementById("telefono");
  const edadInput = document.getElementById("edad");
  const sexoInput = document.getElementById("sexo");
  const viviendaInput = document.getElementById("vivienda");
  const cfInput = document.getElementById("cf");
  var flag = true;

  const API_URL = "http://localhost:3000/personas";

  // Crear o actualizar usuario
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = userIdInput.value;
    const nombre = nameInput.value;
    const telefono = telefonoInput.value;
    const edad = edadInput.value;
    const sexo = sexoInput.value;
    const vivienda_id_viv = viviendaInput.value;
    const persona_id = cfInput.value;

    var method = "";
    var url = "";

    if (flag == true) {
      method = "POST";
      url = API_URL;
    } else {
      method = "PUT"
      url = `${API_URL}/${id}`
      flag = true;
    }

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id, 
          nombre, 
          telefono, 
          edad, 
          sexo, 
          vivienda_id_viv: vivienda_id_viv === "" ? null : vivienda_id_viv, 
          persona_id: persona_id === "" ? null : persona_id 
        }),
      });
      userForm.reset();
      loadUsers(API_URL);
    } catch (err) {
      console.error("Error al guardar usuario:", err);
    }
  });

  // Cargar usuarios al iniciar
  loadUsers(API_URL);
}

/*
 *
 *
 * MUNICIPIOS CRUD
 *
 *
 */
document.getElementById("crud-municipios-link").addEventListener("click", (e) => {
  e.preventDefault();

  // CRUD de municipios (contenido dinámico)
  content.innerHTML = `
    <h1>Gestión de Municipios</h1>

    <!-- Formulario para crear/actualizar municipios -->
    <form id="municipioForm">
      <div>
        <label for="municipioId">Municipio ID:</label>
        <input type="number" id="municipioId" placeholder="Ingresa el número de identificación del municipio" required>
      </div>
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" placeholder="Ingresa el nombre del municipio" required>
      </div>
      <div>
        <label for="area">Area:</label>
        <input type="number" id="area" name="area" step="0.01" placeholder="Ingresa el área del municipio" required>
      </div>
      <div>
        <label for="presupuesto">Presupuesto:</label>
        <input type="number" id="presupuesto" name="presupuesto" step="0.01" placeholder="Ingresa el presupuesto del municipio" required>
      </div>
      <div>
        <label for="gobernador">Gobernador ID:</label>
        <input type="number" id="gobernador" placeholder="Ingresa el número de identificación del gobernador">
      </div>
      <button type="submit">Guardar</button>
    </form>

    <hr>

    <!-- Tabla para mostrar municipios -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Área</th>
          <th>Presupuesto</th>
          <th>Gobernador ID</th>
        </tr>
      </thead>
      <tbody id="municipioTable"></tbody>
    </table>
  `;

  // Carga lógica del CRUD
  setupCrudMunicipios();
});

// Función para cargar todas los municipios
async function loadMunicipios(API_URL) {
  try {
    const response = await fetch(API_URL);
    const municipios = await response.json();
    municipioTable.innerHTML = municipios
      .map(
        (municipio) => `
      <tr>
        <td>${municipio.id_mun}</td>
        <td>${municipio.nombre}</td>
        <td>${municipio.area}</td>
        <td>${municipio.presupuesto}</td>
        <td>${municipio.persona_id}</td>
        <td class="actions">
          <button class="update" onclick="editMunicipio(${municipio.id_mun}, '${municipio.nombre}', '${municipio.area}', '${municipio.presupuesto}', '${municipio.persona_id}')">Editar</button>
          <button onclick="deleteMunicipio(${municipio.id_mun}, '${API_URL}')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error al cargar los municipios:", err);
  }
}

// Eliminar municipio
async function deleteMunicipio(id, API_URL) {
  if (!confirm("¿Estás seguro de eliminar este municipio?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadMunicipios(API_URL);
  } catch (err) {
    console.error("Error al eliminar el municipio:", err);
  }
}

// Rellenar el formulario para editar el municipio
function editMunicipio(id, name, area, presupuesto, gobernador) {
  userIdInput.value = id;
  nameInput.value = name;
  areaInput.value = area;
  presupuestoInput.value = presupuesto;
  gobernadorInput.value = gobernador;
  flag = false;
}

function setupCrudMunicipios() {
  // Obtener referencias al DOM
  const municipioForm = document.getElementById("municipioForm");
  const municipioTable = document.getElementById("municipioTable");
  const municipioIdInput = document.getElementById("municipioId");
  const nameInput = document.getElementById("name");
  const areaInput = document.getElementById("area");
  const presupuestoInput = document.getElementById("presupuesto");
  const gobernadorInput = document.getElementById("gobernador");
  var flag = true;

  const API_URL = "http://localhost:3000/municipios";
  
  // Crear o actualizar municipio
  municipioForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id_mun = municipioIdInput.value;
    const nombre = nameInput.value;
    const area = areaInput.value;
    const presupuesto = presupuestoInput.value;
    const persona_id = gobernadorInput.value;

    var method = "";
    var url = "";

    if (flag == true) {
      method = "POST";
      url = API_URL;
    } else {
      method = "PUT"
      url = `${API_URL}/${id_mun}`
      flag = true;
    }

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id_mun, 
          nombre, 
          area, 
          presupuesto, 
          persona_id: persona_id === "" ? null : persona_id
        }),
      });
      municipioForm.reset();
      loadMunicipios(API_URL);
    } catch (err) {
      console.error("Error al guardar el municipio:", err);
    }
  });

  // Cargar municipios al iniciar
  loadMunicipios(API_URL);
}

/*
 *
 *
 * VIVIENDAS CRUD
 *
 *
 */
document.getElementById("crud-viviendas-link").addEventListener("click", (e) => {
  e.preventDefault();

  // CRUD de viviendas (contenido dinámico)
  content.innerHTML = `
    <h1>Gestión de Viviendas</h1>

    <!-- Formulario para crear/actualizar viviendas -->
    <form id="viviendaForm">
      <div>
        <label for="viviendaId">Vivienda ID:</label>
        <input type="number" id="viviendaId" placeholder="Ingresa el número de identificación de la vivienda" required>
      </div>
      <div>
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" placeholder="Ingresa la dirección de la vivienda"  required>
      </div>
      <div>
        <label for="capacidad">Capacidad:</label>
        <input type="number" id="capacidad" name="capacidad" placeholder="Ingresa la capacidad de la vivienda" required>
      </div>
      <div>
        <label for="niveles">Niveles:</label>
        <input type="number" id="niveles" name="niveles" placeholder="Ingresa el número de niveles de la vivienda" required>
      </div>
      <div>
        <label for="municipio">Municipio ID:</label>
        <input type="number" id="municipio" placeholder="Ingresa el número de identificación del municipio en donde se encuentra la vivienda">
      </div>
      <button type="submit">Guardar</button>
    </form>

    <hr>

    <!-- Tabla para mostrar viviendas -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Dirección</th>
          <th>Capacidad</th>
          <th>Niveles</th>
          <th>Municipio ID</th>
        </tr>
      </thead>
      <tbody id="viviendaTable"></tbody>
    </table>
  `;

  // Carga lógica del CRUD
  setupCrudViviendas();
});

// Función para cargar todas las viviendas
async function loadViviendas(API_URL) {
  try {
    const response = await fetch(API_URL);
    const viviendas = await response.json();
    viviendaTable.innerHTML = viviendas
      .map(
        (vivienda) => `
      <tr>
        <td>${vivienda.id_viv}</td>
        <td>${vivienda.direccion}</td>
        <td>${vivienda.capacidad}</td>
        <td>${vivienda.niveles}</td>
        <td>${vivienda.municipio_id_mun}</td>
        <td class="actions">
          <button class="update" onclick="editVivienda(${vivienda.id_viv}, '${municipio.direccion}', '${municipio.capacidad}', '${municipio.niveles}', '${municipio.municipio_id_mun}')">Editar</button>
          <button onclick="deleteVivienda(${vivienda.id_viv}, '${API_URL}')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error al cargar las viviendas:", err);
  }
}

// Eliminar vivienda
async function deleteVivienda(id, API_URL) {
  if (!confirm("¿Estás seguro de eliminar esta vivienda?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadViviendas(API_URL);
  } catch (err) {
    console.error("Error al eliminar la vivienda:", err);
  }
}

// Rellenar el formulario para editar la vivienda
function editVivienda(id, direccion, capacidad, niveles, municipio) {
  viviendaIdInput.value = id;
  direccionInput.value = direccion;
  capacidadInput.value = capacidad;
  nivelesInput.value = niveles;
  municipioInput.value = municipio;
  flag = false;
}

function setupCrudViviendas() {
  // Obtener referencias al DOM
  const viviendaForm = document.getElementById("viviendaForm");
  const viviendaTable = document.getElementById("viviendaTable");
  const viviendaIdInput = document.getElementById("viviendaId");
  const direccionInput = document.getElementById("direccion");
  const capacidadInput = document.getElementById("capacidad");
  const nivelesInput = document.getElementById("niveles");
  const municipioInput = document.getElementById("municipio");
  var flag = true;

  const API_URL = "http://localhost:3000/viviendas";
  
  // Crear o actualizar vivienda
  viviendaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id_viv = viviendaIdInput.value;
    const direccion = direccionInput.value;
    const capacidad = capacidadInput.value;
    const niveles = nivelesInput.value;
    const municipio_id_mun = municipioInput.value;

    var method = "";
    var url = "";

    if (flag == true) {
      method = "POST";
      url = API_URL;
    } else {
      method = "PUT"
      url = `${API_URL}/${id_viv}`
      flag = true;
    }

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id_viv, 
          direccion, 
          capacidad, 
          niveles, 
          municipio_id_mun: municipio_id_mun === "" ? null : municipio_id_mun
        }),
      });
      viviendaForm.reset();
      loadViviendas(API_URL);
    } catch (err) {
      console.error("Error al guardar la vivienda:", err);
    }
  });

  // Cargar viviendas al iniciar
  loadViviendas(API_URL);
}

/*
 *
 *
 * PERSONAS HAS VIVIENDA CRUD
 *
 *
 */
document.getElementById("crud-persona-has-vivienda-link").addEventListener("click", (e) => {
  e.preventDefault();

  // CRUD de personas has vivienda (contenido dinámico)
  content.innerHTML = `
    <h1>Gestión de Persona tiene vivienda</h1>

    <!-- Formulario para crear/actualizar personas tiene viviendas -->
    <form id="personaHasViviendaForm">
      <div>
        <label for="persona">Persona ID:</label>
        <input type="number" id="persona" placeholder="Ingresa el número de identificación de la persona" required>
      </div>
      <div>
        <label for="vivienda">Vivienda ID:</label>
        <input type="number" id="vivienda" placeholder="Ingresa el número de identificación de la vivienda" required>
      </div>
      <button type="submit">Guardar</button>
    </form>

    <hr>

    <!-- Tabla para mostrar persona tiene vivienda -->
    <table>
      <thead>
        <tr>
          <th>Persona ID</th>
          <th>Vivienda ID</th>
        </tr>
      </thead>
      <tbody id="personaHasViviendaTable"></tbody>
    </table>
  `;

  // Carga lógica del CRUD
  setupCrudPersonasHasViviendas();
});

// Función para cargar todas las viviendas
async function loadPersonasHasVivienda(API_URL) {
  try {
    const response = await fetch(API_URL);
    const personasHasViviendas = await response.json();
    personaHasViviendaTable.innerHTML = personasHasViviendas
      .map(
        (personasHasVivienda) => `
      <tr>
        <td>${personasHasVivienda.persona_id}</td>
        <td>${personasHasVivienda.vivienda_id_viv}</td>
        <td class="actions">
          <button class="update" onclick="editPersonaHasVivienda(${personasHasVivienda.persona_id}, '${personasHasVivienda.vivienda_id_viv}')">Editar</button>
          <button onclick="deletePersonaHasVivienda(${personasHasVivienda.vivienda_id_viv}, '${API_URL}')">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error al cargar las persona has vivienda:", err);
  }
}

// Eliminar persona has vivienda
async function deletePersonaHasVivienda(id, API_URL) {
  if (!confirm("¿Estás seguro de eliminar esta persona tiene vivienda?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadPersonasHasVivienda(API_URL);
  } catch (err) {
    console.error("Error al eliminar la persona has vivienda:", err);
  }
}

// Rellenar el formulario para editar la personas has vivienda
function editPersonaHasVivienda(persona, id) {
  personaInput.value = direccion;
  viviendaIdInput.value = id;
}

function setupCrudPersonasHasViviendas() {
  // Obtener referencias al DOM
  const personaHasViviendaForm = document.getElementById("personaHasViviendaForm");
  const personaHasViviendaTable = document.getElementById("personaHasViviendaTable");
  const personaIdInput = document.getElementById("persona");
  const viviendaIdInput = document.getElementById("vivienda");
  var flag = true;

  const API_URL = "http://localhost:3000/personas_has_viviendas";
  
  // Crear o actualizar persona has vivienda
  personaHasViviendaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const persona_id = personaIdInput.value;
    const vivienda_id_viv = viviendaIdInput.value;

    var method = "";
    var url = "";

    if (flag == true) {
      method = "POST";
      url = API_URL;
    } else {
      method = "PUT"
      url = `${API_URL}/${id_viv}`
      flag = true;
    }

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona_id, vivienda_id_viv }),
      });
      personaHasViviendaForm.reset();
      loadPersonasHasVivienda(API_URL);
    } catch (err) {
      console.error("Error al guardar la personas has vivienda:", err);
    }
  });

  // Cargar viviendas al iniciar
  loadPersonasHasVivienda(API_URL);
}
