function tambahData(event) {
    event.preventDefault();

    let nama = document.getElementById("nama").value;
    let email = document.getElementById("email").value;
    let hp = document.getElementById("hp").value;
    let alamat = document.getElementById("alamat").value;
    let tgl = document.getElementById("tgl").value;

    // jenis kelamin aman (tidak error kalau belum dipilih)
    let jkInput = document.querySelector('input[name="jk"]:checked');
    let jk = jkInput ? jkInput.value : "-";

    // ambil skill
    let skill = [];
    document.querySelectorAll(".skill:checked").forEach((item) => {
        skill.push(item.value);
    });

    let tentang = document.getElementById("tentang").value;

    let dataBaru = {
        nama: nama,
        email: email,
        hp: hp,
        alamat: alamat,
        tgl: tgl,
        jk: jk,
        skill: skill.join(", "),
        tentang: tentang
    };

    // ambil data lama
    let data = JSON.parse(localStorage.getItem("anggota")) || [];

    // tambah data
    data.push(dataBaru);

    // simpan
    localStorage.setItem("anggota", JSON.stringify(data));

    alert("Data berhasil ditambahkan!");

    // reset form
    event.target.reset();

    // update tabel (kalau ada di halaman lain)
    tampilkanData();
}

function tampilkanData() {
    let tabel = document.getElementById("tabelData");
    if (!tabel) return;

    tabel.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("anggota")) || [];

    if (data.length === 0) {
        tabel.innerHTML = `<tr><td colspan="7">Belum ada data</td></tr>`;
        return;
    }

    data.forEach((item) => {
        let row = `
            <tr>
                <td>${item.nama}</td>
                <td>${item.email}</td>
                <td>${item.hp}</td>
                <td>${item.jk}</td>
                <td>${item.alamat}</td>
                <td>${item.skill}</td>
                <td>${item.tentang}</td>
            </tr>
        `;
        tabel.innerHTML += row;
    });
}

// otomatis jalan saat halaman dibuka
window.onload = tampilkanData;
