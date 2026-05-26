const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const app = express();

/* =========================
   CONFIG
========================= */

app.use(cors({
  origin: "*",
}));

app.use(express.json());

/* =========================
   TEST SERVER
========================= */

app.get("/", (req, res) => {
  res.send("Backend SPK SAW jalan 🚀");
});

/* =========================
   API DOCUMENTATION
========================= */

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API SPK SAW ACTIVE 🚀",

    endpoints: {
      auth: {
        register: "POST /register",
        login: "POST /login",
      },

      mahasiswa: {
        getAll: "GET /mahasiswa",
        create: "POST /mahasiswa",
        update: "PUT /mahasiswa/:nim",
        delete: "DELETE /mahasiswa/:nim",
      },

      kriteria: {
        getAll: "GET /kriteria",
        create: "POST /kriteria",
        update: "PUT /kriteria/:kode",
        delete: "DELETE /kriteria/:kode",
      },

      penilaian: {
        getAll: "GET /penilaian",
        create: "POST /penilaian",
        update: "PUT /penilaian/:id",
        delete: "DELETE /penilaian/:id",
      },

      saw: {
        hitung: "GET /saw",
        hasil: "GET /hasil-saw",
      },
    },
  });
});

/* =========================
   AUTH
========================= */

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, password, role, mahasiswaNim } = req.body;

    const user = await prisma.user.create({
      data: {
        username,
        password,
        role,
        mahasiswaNim: role === "MAHASISWA"
          ? mahasiswaNim
          : null,
      },
    });

    res.json({
      success: true,
      message: "Register berhasil",
      data: user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Register gagal",
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    res.json({
      success: true,
      message: "Login berhasil",

      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        mahasiswaNim: user.mahasiswaNim,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Login gagal",
    });
  }
});

/* =========================
   MAHASISWA
========================= */

// GET ALL
app.get("/mahasiswa", async (req, res) => {
  try {

    const data = await prisma.mahasiswa.findMany({
      include: {
        penilaian: true,
        hasilSAW: true,
      },
    });

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data mahasiswa",
    });
  }
});

// POST
app.post("/mahasiswa", async (req, res) => {
  try {

    const { nim, nama, judul_ta } = req.body;

    const data = await prisma.mahasiswa.create({
      data: {
        nim,
        nama,
        judul_ta,
      },
    });

    res.json({
      success: true,
      message: "Mahasiswa berhasil ditambahkan",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Tambah mahasiswa gagal",
    });
  }
});

// PUT
app.put("/mahasiswa/:nim", async (req, res) => {
  try {

    const { nama, judul_ta } = req.body;

    const data = await prisma.mahasiswa.update({
      where: {
        nim: req.params.nim,
      },
      data: {
        nama,
        judul_ta,
      },
    });

    res.json({
      success: true,
      message: "Mahasiswa berhasil diupdate",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal update mahasiswa",
    });
  }
});

// DELETE
app.delete("/mahasiswa/:nim", async (req, res) => {
  try {

    await prisma.mahasiswa.delete({
      where: {
        nim: req.params.nim,
      },
    });

    res.json({
      success: true,
      message: "Mahasiswa berhasil dihapus",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal hapus mahasiswa",
    });
  }
});

/* =========================
   KRITERIA
========================= */

// GET
app.get("/kriteria", async (req, res) => {
  try {

    const data = await prisma.kriteria.findMany();

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil kriteria",
    });
  }
});

// POST
app.post("/kriteria", async (req, res) => {
  try {

    const {
      kode_kriteria,
      nama,
      bobot,
      jenis,
    } = req.body;

    const data = await prisma.kriteria.create({
      data: {
        kode_kriteria,
        nama,
        bobot: parseFloat(bobot),
        jenis,
      },
    });

    res.json({
      success: true,
      message: "Kriteria berhasil ditambahkan",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Tambah kriteria gagal",
    });
  }
});

// PUT
app.put("/kriteria/:kode", async (req, res) => {
  try {

    const { nama, bobot, jenis } = req.body;

    const data = await prisma.kriteria.update({
      where: {
        kode_kriteria: req.params.kode,
      },
      data: {
        nama,
        bobot: parseFloat(bobot),
        jenis,
      },
    });

    res.json({
      success: true,
      message: "Kriteria berhasil diupdate",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal update kriteria",
    });
  }
});

// DELETE
app.delete("/kriteria/:kode", async (req, res) => {
  try {

    await prisma.kriteria.delete({
      where: {
        kode_kriteria: req.params.kode,
      },
    });

    res.json({
      success: true,
      message: "Kriteria berhasil dihapus",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal hapus kriteria",
    });
  }
});

/* =========================
   PENILAIAN
========================= */

// GET
app.get("/penilaian", async (req, res) => {
  try {

    const data = await prisma.penilaian.findMany({
      include: {
        mahasiswa: true,
        kriteria: true,
      },
    });

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil penilaian",
    });
  }
});

// POST
app.post("/penilaian", async (req, res) => {
  try {

    const {
      mahasiswaNim,
      kode_kriteria,
      nilai,
    } = req.body;

    const data = await prisma.penilaian.create({
      data: {
        mahasiswaNim,
        kode_kriteria,
        nilai: parseFloat(nilai),
      },
    });

    res.json({
      success: true,
      message: "Penilaian berhasil ditambahkan",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Tambah penilaian gagal",
    });
  }
});

// PUT
app.put("/penilaian/:id", async (req, res) => {
  try {

    const {
      mahasiswaNim,
      kode_kriteria,
      nilai,
    } = req.body;

    const data = await prisma.penilaian.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        mahasiswaNim,
        kode_kriteria,
        nilai: parseFloat(nilai),
      },
    });

    res.json({
      success: true,
      message: "Penilaian berhasil diupdate",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal update penilaian",
    });
  }
});

// DELETE
app.delete("/penilaian/:id", async (req, res) => {
  try {

    await prisma.penilaian.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Penilaian berhasil dihapus",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal hapus penilaian",
    });
  }
});

/* =========================
   SAW
========================= */

app.get("/saw", async (req, res) => {
  try {

    const mahasiswa = await prisma.mahasiswa.findMany({
      include: {
        penilaian: true,
      },
    });

    const kriteria = await prisma.kriteria.findMany();

    const minMaxKriteria = {};

    for (const krit of kriteria) {

      const allNilai = mahasiswa
        .map((mhs) => {
          const p = mhs.penilaian.find(
            (p) =>
              p.kode_kriteria === krit.kode_kriteria
          );

          return p ? p.nilai : null;
        })
        .filter((n) => n !== null);

      if (allNilai.length > 0) {

        minMaxKriteria[krit.kode_kriteria] = {
          max: Math.max(...allNilai),
          min: Math.min(...allNilai),
        };

      } else {

        minMaxKriteria[krit.kode_kriteria] = {
          max: 1,
          min: 1,
        };
      }
    }

    let hasil = [];

    for (const mhs of mahasiswa) {

      let total = 0;

      for (const krit of kriteria) {

        const nilaiObj = mhs.penilaian.find(
          (p) =>
            p.kode_kriteria === krit.kode_kriteria
        );

        const nilai = nilaiObj
          ? nilaiObj.nilai
          : 0;

        if (nilai > 0) {

          const {
            max,
            min,
          } = minMaxKriteria[krit.kode_kriteria];

          let normalized = 0;

          // BENEFIT
          if (krit.jenis === "BENEFIT") {
            normalized =
              max === 0
                ? 0
                : nilai / max;
          }

          // COST
          else if (krit.jenis === "COST") {
            normalized =
              nilai === 0
                ? 0
                : min / nilai;
          }

          total += normalized * krit.bobot;
        }
      }

      const status =
        total >= 0.70
          ? "LAYAK"
          : "TIDAK LAYAK";

      await prisma.hasilSAW.upsert({
        where: {
          mahasiswaNim: mhs.nim,
        },

        update: {
          nilaiAkhir: total,
          status,
        },

        create: {
          mahasiswaNim: mhs.nim,
          nilaiAkhir: total,
          status,
        },
      });

      hasil.push({
        nama: mhs.nama,
        nim: mhs.nim,
        nilai_akhir: total,
        status,
      });
    }

    res.json({
      success: true,
      message: "Perhitungan SAW berhasil",
      data: hasil,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal menghitung SAW",
    });
  }
});

/* =========================
   HASIL SAW
========================= */

app.get("/hasil-saw", async (req, res) => {
  try {

    const data = await prisma.hasilSAW.findMany({
      include: {
        mahasiswa: true,
      },
    });

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil hasil SAW",
    });
  }
});

/* =========================
   SERVER RUN
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});