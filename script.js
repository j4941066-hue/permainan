// Variabel Global
let skor = 0;
let jawabanBenar = 0;
let soalSaatIni = 0;
const jumlahMaksimalSoal = 5;

// Elemen DOM
const scoreElement = document.getElementById('score');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('user-answer');
const submitBtn = document.getElementById('submit-btn');
const startBtn = document.getElementById('start-btn');
const feedbackElement = document.getElementById('feedback');

// Fungsi untuk membuat soal acak (Tambah atau Kurang)
function buatSoal() {
    // Angka acak antara 1 dan 20
    let angka1 = Math.floor(Math.random() * 20) + 1;
    let angka2 = Math.floor(Math.random() * 20) + 1;
    
    // Pilih operasi acak: 0 untuk tambah, 1 untuk kurang
    const operasi = Math.floor(Math.random() * 2);

    let soal;
    
    if (operasi === 0) {
        // Penjumlahan
        soal = `${angka1} + ${angka2}`;
        jawabanBenar = angka1 + angka2;
    } else {
        // Pengurangan (Pastikan angka pertama lebih besar)
        if (angka1 < angka2) {
            [angka1, angka2] = [angka2, angka1]; // Tukar nilai
        }
        soal = `${angka1} - ${angka2}`;
        jawabanBenar = angka1 - angka2;
    }
    
    questionElement.textContent = soal;
}

// Fungsi untuk memulai permainan
function mulaiGame() {
    skor = 0;
    soalSaatIni = 0;
    scoreElement.textContent = skor;
    feedbackElement.textContent = '';
    
    answerInput.disabled = false;
    submitBtn.disabled = false;
    startBtn.textContent = 'Soal Selanjutnya';
    startBtn.disabled = true; // Nonaktifkan tombol Mulai/Selanjutnya saat menjawab
    
    buatSoal();
    answerInput.value = '';
    answerInput.focus();
}

// Fungsi untuk memeriksa jawaban
function cekJawaban() {
    const jawabanUser = parseInt(answerInput.value);

    // Cek apakah input valid
    if (isNaN(jawabanUser)) {
        feedbackElement.textContent = 'Harap masukkan angka yang valid.';
        feedbackElement.className = 'feedback-text incorrect';
        answerInput.focus();
        return;
    }

    soalSaatIni++;

    if (jawabanUser === jawabanBenar) {
        feedbackElement.textContent = '✅ Benar!';
        feedbackElement.className = 'feedback-text correct';
        skor++;
        scoreElement.textContent = skor;
    } else {
        feedbackElement.textContent = `❌ Salah! Jawabannya adalah ${jawabanBenar}.`;
        feedbackElement.className = 'feedback-text incorrect';
    }
    
    answerInput.value = '';
    
    // Lanjut ke soal berikutnya atau akhiri game
    if (soalSaatIni < jumlahMaksimalSoal) {
        startBtn.disabled = false;
    } else {
        akhirGame();
    }
}

// Fungsi untuk mengakhiri permainan
function akhirGame() {
    questionElement.textContent = `Game Selesai! Skor akhir Anda: ${skor} dari ${jumlahMaksimalSoal}.`;
    feedbackElement.textContent = 'Tekan "Mulai Lagi" untuk mencoba lagi.';
    feedbackElement.className = 'feedback-text';
    
    answerInput.disabled = true;
    submitBtn.disabled = true;
    startBtn.textContent = 'Mulai Lagi';
    startBtn.disabled = false;
}

// Event Listeners
submitBtn.addEventListener('click', cekJawaban);

// Memungkinkan cek jawaban dengan menekan 'Enter' pada input
answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !submitBtn.disabled) {
        cekJawaban();
    }
});

startBtn.addEventListener('click', () => {
    if (soalSaatIni === jumlahMaksimalSoal) {
        // Jika game sudah selesai, mulai ulang
        mulaiGame();
    } else {
        // Lanjut ke soal berikutnya
        buatSoal();
        feedbackElement.textContent = '';
        startBtn.disabled = true; // Nonaktifkan lagi
        answerInput.focus();
    }
});
