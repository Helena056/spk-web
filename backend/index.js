const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   TEST SERVER
========================= */
app.get("/", (req, res) => {
  res.send("Backend SPK SAW jalan 🚀");
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
        mahasiswaNim: role === "MAHASISWA" ? mahasiswaNim : null,
      },
    });

    res.json(user);

  } catch (error) {
    console.log(error);

    res.status(500).json({
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
        message: "Username atau password salah",
      });
    }

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      mahasiswaNim: user.mahasiswaNim,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
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

    res.json(data);

  } catch (error) {
    console.log(error);
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

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Tambah mahasiswa gagal",
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
      message: "Mahasiswa berhasil dihapus",
    });

  } catch (error) {
    console.log(error);
  }
});

// PUT (EDIT MAHASISWA)
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

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal update mahasiswa" });
  }
});

/* =========================
   KRITERIA
========================= */

// GET
app.get("/kriteria", async (req, res) => {
  try {

    const data = await prisma.kriteria.findMany();

    res.json(data);

  } catch (error) {
    console.log(error);
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

    res.json(data);

  } catch (error) {
    console.log(error);
  }
});

// PUT (EDIT)
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

res.json(data);
  } catch (error) {
  console.log(error);
  res.status(500).json({ message: "Gagal update kriteria" });
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
      message: "Kriteria berhasil dihapus",
    });

  } catch (error) {
    console.log(error);
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

    res.json(data);

  } catch (error) {
    console.log(error);
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

    res.json(data);

  } catch (error) {
    console.log(error);
  }
});

// PUT (EDIT)
app.put("/penilaian/:id", async (req, res) => {
  try {
    const { mahasiswaNim, kode_kriteria, nilai } = req.body;

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

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal update penilaian" });
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
      message: "Penilaian berhasil dihapus",
    });

  } catch (error) {
    console.log(error);
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

    // 1. Mencari nilai Minimum dan Maksimum untuk setiap kriteria (Tahap Normalisasi)
    const minMaxKriteria = {};
    for (const krit of kriteria) {
      const allNilai = mahasiswa
        .map((mhs) => {
          const p = mhs.penilaian.find((p) => p.kode_kriteria === krit.kode_kriteria);
          return p ? p.nilai : null;
        })
        .filter((n) => n !== null);

      if (allNilai.length > 0) {
        minMaxKriteria[krit.kode_kriteria] = {
          max: Math.max(...allNilai),
          min: Math.min(...allNilai),
        };
      } else {
        // Fallback jika belum ada nilai sama sekali
        minMaxKriteria[krit.kode_kriteria] = { max: 1, min: 1 };
      }
    }

    let hasil = [];

    // 2. Perhitungan nilai akhir tiap mahasiswa
    for (const mhs of mahasiswa) {
      let total = 0;

      for (const krit of kriteria) {
        const nilaiObj = mhs.penilaian.find(
          (p) => p.kode_kriteria === krit.kode_kriteria
        );

        const nilai = nilaiObj ? nilaiObj.nilai : 0;

        if (nilai > 0) {
          const { max, min } = minMaxKriteria[krit.kode_kriteria];
          let normalized = 0;

          // Rumus Normalisasi SAW
          if (krit.jenis === "BENEFIT") {
            normalized = max === 0 ? 0 : nilai / max;
          } else if (krit.jenis === "COST") {
            normalized = nilai === 0 ? 0 : min / nilai;
          }

          // Kalikan dengan Bobot
          total += normalized * krit.bobot;
        }
      }

      // 3. Penentuan Status berdasarkan batas threshold >= 0.70
      const status = total >= 0.70 ? "LAYAK" : "TIDAK LAYAK";

      // SIMPAN KE HASIL SAW
      await prisma.hasilSAW.upsert({
        where: {
          mahasiswaNim: mhs.nim,
        },
        update: {
          nilaiAkhir: total,
          status: status,
        },
        create: {
          mahasiswaNim: mhs.nim,
          nilaiAkhir: total,
          status: status,
        },
      });

      hasil.push({
        nama: mhs.nama,
        nim: mhs.nim,
        nilai_akhir: total,
        status: status,
      });
    }

    res.json(hasil);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal menghitung SAW" });
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

    res.json(data);

  } catch (error) {
    console.log(error);
  }
});

/* =========================
   SERVER RUN
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});