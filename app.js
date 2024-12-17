const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',     // Cambia por tu usuario de PostgreSQL
  host: 'localhost',      // Cambia si tu servidor no está en localhost
  database: 'lab_0', // Nombre de la base de datos
  password: 'M3ssi#', // Contraseña de PostgreSQL
  port: 5432,             // Puerto de PostgreSQL
});

/*
 *
 *
 * MUNICIPIO CRUD
 *
 *
 */

// Crear un municipio
app.post("/municipios", async (req, res) => {
  const { id_mun, nombre, area, presupuesto, persona_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO municipio (id_mun, nombre, area, presupuesto, persona_id) VALUES ($1, $2, $3 ,$4, $5) RETURNING *",
      [id_mun, nombre, area, presupuesto, persona_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al crear el municipio" });
  }
});

// Leer todos los municipios
app.get("/municipios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM municipio");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener los municipios" });
  }
});

// Leer un municipio por id_mun
app.get("/municipios/:id_mun", async (req, res) => {
  const { id_mun } = req.params;

  try {
    const result = await pool.query("SELECT * FROM municipio WHERE id_mun = $1", [id_mun]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Municipio no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener el municipio" });
  }
});

// Actualizar un municipio
app.put("/municipios/:id_mun", async (req, res) => {
  const { id_mun } = req.params;
  const { nombre, area, presupuesto, persona_id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE municipio SET nombre = $2, area = $3, presupuesto = $4, persona_id = $5 WHERE id_mun = $1 RETURNING *",
      [id_mun, nombre, area, presupuesto, persona_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Municipio no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al actualizar la información del municipio" });
  }
});

// Eliminar un municipio
app.delete("/municipios/:id_mun", async (req, res) => {
  const { id_mun } = req.params;

  try {
    const result = await pool.query("DELETE FROM municipio WHERE id_mun = $1 RETURNING *", [id_mun]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Municipio no encontrado" });
    }
    res.status(200).json({ message: "Municipio eliminado" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al eliminar el municipio" });
  }
});

/*
 *
 *
 * VIVIENDA CRUD
 *
 *
 */

// Crear una vivienda
app.post("/viviendas", async (req, res) => {
  const { id_viv, direccion, capacidad, niveles, municipio_id_mun } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO vivienda (id_viv, direccion, capacidad, niveles, municipio_id_mun) VALUES ($1, $2, $3 ,$4, $5) RETURNING *",
      [id_viv, direccion, capacidad, niveles, municipio_id_mun]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al crear la vivienda" });
  }
});

// Leer todas las viviendas
app.get("/viviendas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vivienda");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener las viviendas" });
  }
});

// Leer una vivienda por id_viv
app.get("/viviendas/:id_viv", async (req, res) => {
  const { id_viv } = req.params;

  try {
    const result = await pool.query("SELECT * FROM vivienda WHERE id_viv = $1", [id_viv]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vivienda no encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener la vivienda" });
  }
});

// Actualizar una vivienda
app.put("/viviendas/:id_viv", async (req, res) => {
  const { id_viv } = req.params;
  const { direccion, capacidad, niveles, municipio_id_mun } = req.body;

  try {
    const result = await pool.query(
      "UPDATE vivienda SET direccion = $2, capacidad = $3, niveles = $4, municipio_id_mun = $5 WHERE id_viv = $1 RETURNING *",
      [id_viv, direccion, capacidad, niveles, municipio_id_mun]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vivienda no encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al actualizar la información de la vivienda" });
  }
});

// Eliminar una vivienda
app.delete("/viviendas/:id_viv", async (req, res) => {
  const { id_viv } = req.params;

  try {
    const result = await pool.query("DELETE FROM vivienda WHERE id_viv = $1 RETURNING *", [id_viv]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vivienda no encontrada" });
    }
    res.status(200).json({ message: "Vivienda eliminada" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al eliminar la vivienda" });
  }
});

/*
 *
 *
 * PERSONA CRUD
 *
 *
 */

// Crear una persona
app.post("/personas", async (req, res) => {
  const { id, nombre, telefono, edad, sexo, vivienda_id_viv, persona_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO persona (id, nombre, telefono, edad, sexo, vivienda_id_viv, persona_id) VALUES ($1, $2, $3 ,$4, $5, $6, $7) RETURNING *",
      [id, nombre, telefono, edad, sexo, vivienda_id_viv, persona_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al crear la persona" });
  }
});

// Leer todas las personas
app.get("/personas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM persona");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener las personas" });
  }
});

// Leer una personas por el id
app.get("/personas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM persona WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener la persona" });
  }
});

// Actualizar una persona
app.put("/personas/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, edad, sexo, vivienda_id_viv, persona_id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE persona SET nombre = $2, telefono = $3, edad = $4, sexo = $5, vivienda_id_viv = $6, persona_id = $7 WHERE id = $1 RETURNING *",
      [id, nombre, telefono, edad, sexo, vivienda_id_viv, persona_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al actualizar la información de la persona" });
  }
});

// Eliminar una persona
app.delete("/personas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM persona WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }
    res.status(200).json({ message: "Persona eliminada" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al eliminar la persona" });
  }
});

/*
 *
 *
 * PERSONA_HAS_VIVIENDA CRUD
 *
 *
 */

// Crear una persona has vivienda
app.post("/personas_has_viviendas", async (req, res) => {
  const { persona_id, vivienda_id_viv } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO persona_has_vivienda (persona_id, vivienda_id_viv) VALUES ($1, $2) RETURNING *",
      [persona_id, vivienda_id_viv]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al crear la persona has vivienda" });
  }
});

// Leer todas las persona has vivienda
app.get("/personas_has_viviendas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM persona_has_vivienda");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener las persona has vivienda" });
  }
});

// Leer viviendas por persona_id
app.get("/personas_has_viviendas/:vivienda_id_viv", async (req, res) => {
  const { vivienda_id_viv } = req.params;

  try {
    const result = await pool.query("SELECT * FROM persona_has_vivienda WHERE vivienda_id_viv = $1", [vivienda_id_viv]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Persona has vivienda no encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener la persona has vivienda" });
  }
});

// Actualizar una persona has vivienda
app.put("/personas_has_viviendas/:vivienda_id_viv", async (req, res) => {
  const { vivienda_id_viv } = req.params;
  const { persona_id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE persona_has_vivienda SET persona_id = $2 WHERE vivienda_id_viv = $1 RETURNING *",
      [vivienda_id_viv, persona_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Persona has vivienda no encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al actualizar la información de la persona has vivienda" });
  }
});

// Eliminar una persona has vivienda
app.delete("/personas_has_viviendas/:vivienda_id_viv", async (req, res) => {
  const { vivienda_id_viv } = req.params;

  try {
    const result = await pool.query("DELETE FROM persona_has_vivienda WHERE vivienda_id_viv = $1 RETURNING *", [vivienda_id_viv]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Persona has vivienda no encontrada" });
    }
    res.status(200).json({ message: "Persona has vivienda eliminada" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al eliminar la persona has vivienda" });
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
