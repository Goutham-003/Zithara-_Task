const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "font-src data:;");
  next();
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "userdata",
  password: "vinnu2003",
  port: 5432,
});

app.get("/records", async (req, res) => {
  try {
    const { page = 1, sort_by = "created_at", search = "",sort_type="ASC" } = req.query;
    const limit = 20;
    var offset = (page - 1) * limit;
    if (search != "") {
      offset = 0;
    }
    let query = `
    select * from records where customer_name ilike '%${search}%' or location ilike '%${search}%' order by ${sort_by} ${sort_type}
    LIMIT 20 OFFSET ${offset}
    ;`;
    let countQuery = `
        SELECT COUNT(*) FROM records
        WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%';
    `;
    const countResult = await pool.query(countQuery);
    const totalCount = countResult.rows[0].count;
    const result = await pool.query(query);
    res.json({
      records: result.rows,
      records_count: totalCount,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
