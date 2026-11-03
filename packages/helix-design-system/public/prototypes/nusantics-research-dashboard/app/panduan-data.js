/* Panduan Penggunaan — content for the 7 steps (Figma: "Panduan - Helix").
   Text comes from the Figma frames. Where the frame only shows a collapsed/overridden part (FAQ answers, a few item descriptions)
   the wording is written here from the surrounding copy and marked  // authored  so it can be replaced with the real copy. */
window.PANDUAN=[
{ id:1, color:'#82431d', tile:'#ee9a63', icon:'users', short:`Akun & Kelompok Studi`,
  lead:`Pahami bagaimana peran Lead dan Member bekerja, serta batasan yang berlaku untuk kelompok studi Anda di Nusantics.`,
  intro:[
    `Setiap akun Nusantics terhubung ke satu atau lebih kelompok studi (division) di bawah institusi Anda. Kelompok studi adalah unit kerja sebenarnya, di sinilah kredit, run, dan keanggotaan dikelola, bukan di level institusi. Peran Anda di setiap kelompok studi adalah Lead atau Member, dan bisa berbeda antar kelompok studi yang berbeda.`,
    `Lead memiliki kendali atas keanggotaan dan kredit kelompok studinya, sementara Member dapat melihat semuanya secara transparan namun tidak dapat mengubahnya. Beberapa tindakan struktural, seperti mempromosikan Lead baru atau menghapus kelompok studi, memerlukan bantuan tim Nusantics.`],
  sections:[
    {type:'table', title:`Perbandingan Peran`, cols:[`Fitur`,`Lead`,`Member`,`Nusantics Support`], rows:[
      [`Membuat kelompok studi baru (dalam batas 3)`,1,0,1],
      [`Membuat kelompok studi tambahan (lebih dari batas 3)`,0,0,1],
      [`Mengundang anggota baru (Member)`,1,0,1],
      [`Mengeluarkan Member`,1,0,1],
      [`Mengeluarkan Lead (termasuk diri sendiri)`,0,0,1],
      [`Menjadikan anggota sebagai Lead`,0,0,1],
      [`Melihat anggota, saldo & riwayat kredit`,1,1,1],
      [`Mengedit info profil sendiri (nama, lokasi, bio, dll)`,1,1,1],
      [`Mengganti foto profil sendiri`,1,1,1],
      [`Mengedit gelar/jabatan sendiri di kelompok studi`,1,1,1],
      [`Redeem kredit dari kode SKU BiomeSeq`,1,0,1],
      [`Membeli kredit di luar BiomeSeq (top-up manual)`,1,0,1],
      [`Membuat run baru`,1,0,1],
      [`Mengunggah/menghapus identifikasi sampel`,1,0,1],
      [`Mengunggah/menghapus file FASTQ`,1,0,1],
      [`Mengubah nama kelompok studi`,1,0,1],
      [`Menghapus kelompok studi`,0,0,1],
      [`Menambah keterlibatan di institusi lain`,0,0,1],
      [`Mengganti email institusional`,0,0,1],
      [`Mengganti nomor telepon`,0,0,1],
      [`Mengganti password`,0,0,1],
      [`Menghapus akun`,0,0,1]]},
    {type:'items', title:`Jalur Eskalasi`, items:[
      {icon:'users', title:`Anda Member dan tidak bisa melakukan sesuatu, tapi Lead bisa?`, desc:`Hubungi Lead kelompok studi Anda langsung, cek tabel di atas untuk memastikan itu memang wewenang Lead.`},
      {icon:'chat', title:`Lead maupun Member sama-sama tidak bisa melakukannya?`, desc:`Hubungi tim Nusantics lewat tombol WhatsApp atau Email Support di pojok kiri bawah sidebar.`}]},
    {type:'notes', title:`Catatan Penting`, items:[
      {tone:'warn', text:`Kelompok studi wajib memiliki minimal satu Lead setiap saat, Lead tidak dapat mengeluarkan dirinya sendiri atau Lead lain secara mandiri.`},
      {tone:'info', text:`Satu pengguna maksimal memimpin 3 kelompok studi, dan satu kelompok studi maksimal menampung 20 orang (Lead + Member).`},
      {tone:'ok', text:`Semua tindakan yang memerlukan bantuan admin (promosi Lead, penghapusan kelompok studi/akun, keterlibatan institusi baru) dapat diajukan lewat WhatsApp atau Email Support di sidebar.`},
      {tone:'warn', text:`Member bersifat strict read-only untuk run: dapat melihat sampel, file FASTQ, dan status analisis, tapi tidak dapat mengunggah atau menghapus apa pun, maupun mengonfirmasi dan submit analisis. Seluruh proses submission hanya dapat dilakukan oleh Lead.`}]},
    {type:'faq', title:`Pertanyaan Umum`, items:[   // authored
      {q:`Siapa yang bisa menjadikan anggota sebagai Lead?`, a:`Hanya tim Nusantics. Ajukan lewat WhatsApp atau Email Support di sidebar dengan menyebutkan nama kelompok studi dan anggota yang dimaksud.`},
      {q:`Berapa batas kelompok studi yang bisa saya buat?`, a:`Satu pengguna dapat memimpin maksimal 3 kelompok studi. Untuk kelompok studi tambahan, hubungi tim Nusantics.`},
      {q:`Bagaimana cara mengganti email institusional?`, a:`Penggantian email belum bisa dilakukan sendiri. Hubungi tim Nusantics lewat WhatsApp atau Email Support di sidebar.`},
      {q:`Apa yang terjadi jika Lead keluar dari kelompok studi?`, a:`Kelompok studi wajib memiliki minimal satu Lead, jadi Lead tidak bisa keluar sendiri. Pengeluaran atau pergantian Lead diproses oleh tim Nusantics.`}]}
  ]},
{ id:2, color:'#292e3b', tile:'#7d8fd1', icon:'play', short:`Buat Run`, navTitle:`Buat Run`,
  lead:`Setiap sesi analisis dimulai dari sebuah Run, unit kerja utama platform Nusantics.`,
  intro:[
    `Run adalah container untuk satu batch analisis. Saat Anda membuat run, platform akan meminta dua informasi dasar: nama run yang deskriptif dan jenis kit BiomeSeq yang digunakan. Pilihan kit menentukan kapasitas sampel maksimum, konfigurasi pipeline, dan kebutuhan kredit; semua dikonfigurasi otomatis tanpa perlu sentuhan teknis dari pengguna.`,
    `Setelah run dibuat, Anda masuk ke alur 4-langkah: identifikasi sampel, upload FASTQ, validasi data, dan konfirmasi analisis. Seluruh riwayat — file, status, dan hasil — tersimpan permanen dalam satu run.`],
  sections:[
    {type:'items', title:`Yang Perlu Disiapkan`, items:[
      {icon:'edit', title:`Nama run yang deskriptif`, desc:`Contoh: "Sampel Usus Pasien Batch 3"`},
      {icon:'box', title:`Pilihan kit BiomeSeq`, desc:`BiomeSeq 16S rRNA 48, 96, atau 192 reactions. Sesuaikan dengan jumlah sampel Anda.`}]}
  ]},
{ id:3, color:'#a86a00', tile:'#e2b873', icon:'flask', short:`Daftar Sampel`,
  lead:`Daftarkan setiap sampel yang akan dianalisis beserta organisme, jenis sampel, dan library layout. Kode sampel yang Anda isi di sini akan digunakan untuk mencocokkan file FASTQ di langkah berikutnya.`,
  intro:[
    `Pada langkah ini Anda mendaftarkan seluruh sampel yang akan dianalisis dalam run ini. Setiap sampel memiliki empat kolom wajib: kode sampel, organisme, jenis sampel, dan library layout. Platform menyediakan dua metode pengisian: upload template Excel untuk banyak sampel sekaligus, atau isi formulir web satu per satu dengan panduan langkah demi langkah.`,
    `Kode sampel yang Anda daftarkan di sini harus cocok persis dengan nama file FASTQ yang akan diupload di langkah berikutnya. Ini adalah titik paling kritis dalam alur; inkonsistensi nama akan menyebabkan file FASTQ tidak dapat dipasangkan ke sampel yang benar.`],
  sections:[
    {type:'items', title:`Dua Metode Pengisian`, items:[
      {icon:'filetext', title:`Template Excel`, tag:`Batch`, desc:`Cocok untuk 10 sampel atau lebih. Download template, isi data secara offline, lalu upload kembali. Mendukung hingga 1.000 sampel per upload.`},
      {icon:'edit', title:`Formulir Web`, tag:`Manual`, desc:`Cocok untuk 1-5 sampel. Isi langsung di platform dengan validasi dan dropdown real-time. Setiap sampel dapat diduplikat untuk mempercepat pengisian.`}]},
    {type:'items', title:`Kolom yang Diperlukan per Sampel`, items:[
      {icon:'tag', title:`Kode Sampel`, tag:`Wajib`, tagTone:'brand', desc:`Unik dalam satu run. Hanya huruf, angka, dan tanda hubung. Tidak boleh ada double-dash atau hanya tanda hubung. Contoh nama sampel yang benar: SMPL-001, ITB-PRK-A1.`},
      {icon:'leaf', title:`Organisme`, tag:`Wajib`, tagTone:'brand', desc:`Pilih organisme sumber sampel dari daftar yang tersedia.`},   // authored
      {icon:'flask', title:`Jenis Sampel`, tag:`Wajib`, tagTone:'brand', desc:`Pilih jenis sampel (misalnya feses, tanah, atau air) dari daftar yang tersedia.`},   // authored
      {icon:'layers', title:`Library Layout`, tag:`Wajib`, tagTone:'brand', desc:`Pilih PAIRED_END atau SINGLE_END sesuai dengan jenis sekuensing yang digunakan. Pengaturan ini mempengaruhi cara sistem mencocokkan file R1/R2.`}]},
    {type:'notes', title:`Catatan Penting`, items:[
      {tone:'warn', text:`Kode sampel bersifat case-sensitive saat dicocokkan dengan nama file FASTQ. Jika sampel terdaftar sebagai SAMP-001, maka nama file FASTQ harus mengandung SAMP-001, bukan samp-001.`},
      {tone:'info', text:`Kode sampel tidak boleh mengandung spasi atau underscore. Karakter yang diperbolehkan hanya huruf (A-Z, a-z), angka (0-9), dan tanda hubung (-).`}]}
  ]},
{ id:4, color:'#4aaee0', tile:'#a6d6e9', icon:'upload', short:`Upload FASTQ`,
  lead:`Upload file FASTQ hasil sekuensing ke dropzone. Sistem mendeteksi pasangan R1/R2 secara otomatis berdasarkan nama file.`,
  intro:[
    `Seret file FASTQ Anda langsung ke area dropzone, atau klik untuk membuka file picker. Platform menerima banyak file sekaligus. Setiap file ditampilkan sebagai kartu dengan progres upload real-time: persentase selesai, kecepatan transfer, dan status akhir setelah upload berhasil.`,
    `Setelah semua file terupload, sistem secara otomatis memasangkan R1 dan R2 berdasarkan konvensi nama file lalu menjalankan validasi kualitas di Langkah 5. Tidak ada konfigurasi tambahan yang diperlukan, selama nama file mengikuti salah satu pola yang diterima.`],
  sections:[
    {type:'items', title:`Ekstensi yang Diterima`, items:[
      {icon:'file', title:`.fastq.gz`, tag:`Utama`, desc:`Format terkompresi gzip. Direkomendasikan karena ukuran file lebih kecil dan upload lebih cepat.`},
      {icon:'file', title:`.fq.gz`, tag:`Diterima`, desc:`Alias umum untuk .fastq.gz, diterima oleh sistem.`}]},
    {type:'items', title:`Pola Nama File yang Diterima`, items:[
      {icon:'file', title:`Output MiSeq (bcl2fastq)`, tag:`MiSeq`, desc:`Pola: {KODE}_S{#}_L00{#}_R1_001.fastq.gz. Contoh: ITB-001_S1_L001_R1_001.fastq.gz`},
      {icon:'file', title:`Format ringkas`, tag:`Umum`, desc:`Pola: {KODE}_R1.fastq.gz dan {KODE}_R2.fastq.gz. Contoh: ITB-001_R1.fastq.gz`},   // authored
      {icon:'file', title:`Single-end`, tag:`Single-end`, desc:`Pola: {KODE}.fastq.gz. Contoh: ITB-001.fastq.gz`}]},   // authored
    {type:'notes', title:`Catatan Penting`, items:[
      {tone:'info', text:`Jika ada file yang gagal atau ingin diganti, hapus file tersebut dari daftar lalu upload ulang. Validasi di Langkah 5 akan berjalan ulang secara otomatis.`}]}
  ]},
{ id:5, color:'#13863b', tile:'#80d3a1', icon:'check', short:`Validasi Data`,
  lead:`Platform memeriksa kualitas reads, kelengkapan pasangan file, dan kesesuaian format sebelum analisis dimulai. Notifikasi dikirim jika ada anomali.`,
  intro:[
    `Setelah semua file terupload, platform menjalankan validasi otomatis pada setiap sampel: pemeriksaan checksum MD5 untuk integritas file, penghitungan jumlah reads, dan identifikasi pasangan R1/R2. Setiap sampel dikategorikan ke dalam tiga status berdasarkan jumlah non-chimeric reads.`,
    `Anda memiliki kendali penuh atas sampel mana yang disertakan. Sampel yang lolos otomatis masuk ke analisis. Sampel dengan reads rendah dapat Anda sertakan secara manual dengan risiko yang dipahami. Sebelum analisis dikonfirmasi, modal ringkasan menampilkan jumlah kredit yang akan dipotong.`],
  sections:[
    {type:'items', title:`Status Validasi dan Threshold`, items:[
      {icon:'check', title:`Lolos: ≥ 20.000 non-chimeric reads`, tag:`Lolos`, tagTone:'ok', desc:`Disertakan otomatis. Tidak dapat dikecualikan dari analisis.`},
      {icon:'warn', title:`Perlu Perhatian: 1 hingga 19.999 reads`, tag:`Perhatian`, tagTone:'amber', desc:`Opt-in. Dicentang secara manual oleh pengguna. Kredit tetap dipotong jika disertakan.`},
      {icon:'xcircle', title:`Gagal: 0 reads atau error file`, tag:`Gagal`, tagTone:'red', desc:`Dikecualikan otomatis. Tidak dapat disertakan dalam analisis.`}]},
    {type:'notes', title:`Catatan Penting`, items:[
      {tone:'info', text:`Progress validasi ditampilkan secara real-time dengan progress bar (X dari N selesai). Anda bisa mulai meninjau sampel yang sudah tervalidasi tanpa menunggu semua selesai.`},
      {tone:'ok', text:`Modal konfirmasi sebelum analisis menampilkan ringkasan lengkap: jumlah sampel baik, sampel reads rendah yang disertakan, sampel gagal, total kredit dipotong, dan saldo setelah transaksi.`}]},
    {type:'faq', title:`Pertanyaan Umum`, items:[   // authored
      {q:`Apakah saya bisa mengeluarkan sampel yang lolos validasi dari analisis?`, a:`Tidak. Sampel berstatus Lolos disertakan otomatis dan tidak dapat dikecualikan dari analisis.`},
      {q:`Berapa lama proses validasi berlangsung?`, a:`Tergantung jumlah dan ukuran file. Progress ditampilkan secara real-time, dan Anda bisa meninjau sampel yang sudah selesai tanpa menunggu semuanya.`},
      {q:`Apakah saya bisa mengupload ulang file yang gagal validasi?`, a:`Bisa. Hapus file yang gagal dari daftar lalu upload ulang. Validasi akan berjalan ulang secara otomatis.`}]}
  ]},
{ id:6, color:'#0b6e82', tile:'#5fc3d5', icon:'pulse', short:`Analisis Pipeline`, navTitle:`Analisis Pipeline`,
  lead:`Proses komputasi utama yang mengolah seluruh data FASTQ menjadi profil mikrobioma. Proses ini berjalan otomatis di cloud dan bisa memakan waktu beberapa jam.`,
  intro:[
    `Setelah konfirmasi analisis, Nusantics menjalankan serangkaian komputasi berat secara otomatis di cloud. Pipeline memproses seluruh file FASTQ Anda melalui empat tahap berurutan: pembersihan data, klasifikasi taksonomi, klasifikasi spesies, dan analisis keragaman. Tidak ada yang perlu dilakukan dari sisi Anda selama proses ini berlangsung.`,
    `Ini adalah fase analisis upstream, fondasi dari seluruh hasil yang Anda terima. Prosesnya berjalan sekali, hasilnya tersimpan permanen, dan tidak dapat diulang tanpa membuat run baru. Itulah mengapa langkah ini dipisahkan dari Langkah 7: begitu pipeline selesai, semua eksplorasi, visualisasi, dan konfigurasi ulang di Langkah 7 dapat dilakukan kapan saja dan sebanyak yang Anda mau tanpa biaya tambahan karena bebannya ringan dan tidak memerlukan komputasi ulang dari awal.`],
  sections:[
    {type:'items', title:`Tahapan Pipeline`, plain:true, items:[
      {icon:'scissors', title:`Pembersihan Data`, desc:`Adapter dan primer dihapus, lalu setiap read difilter berdasarkan kualitas pembacaan dari mesin sekuensing. Nusantics menggunakan DADA2 untuk mengoreksi kesalahan mesin sekuensing dan menghasilkan sekuens berdasarkan Amplicon Sequence Variants (ASV) yang presisi, sekaligus menghapus chimera, yaitu sekuens hybrid artefak PCR yang jika dibiarkan akan muncul sebagai organisme palsu. Durasi tahap ini bergantung pada total ukuran data FASTQ yang diunggah dan bisa jauh lebih lama dibanding tahap lainnya.`},
      {icon:'network', title:`Klasifikasi Taksonomi`, desc:`Setiap ASV dicocokkan dengan database RefSeq untuk memperoleh label taksonomi dari tingkat phylum hingga genus. Hasil tahap ini menjadi dasar tabel komposisi mikrobioma dan seluruh visualisasi downstream.`},
      {icon:'leaf', title:`Klasifikasi Spesies`, desc:`Klasifikasi dilanjutkan ke tingkat spesies menggunakan database referensi tambahan berdasarkan sekuens 16S rRNA dengan ambang kecocokan yang lebih ketat. Tahap ini terpisah karena resolusi spesies membutuhkan pendekatan berbeda dari klasifikasi genus.`},
      {icon:'barchart', title:`Normalisasi dan Analisis Keragaman`, desc:`Jumlah reads antar sampel dinormalisasi menggunakan pendekatan rarefaction agar perbandingan tidak bias oleh perbedaan kedalaman sekuensing. Hasil rarefaction digunakan untuk menghitung metrik keragaman alpha yang bersifat spesifik untuk satu sampel, dengan metrik yang ditampilkan berupa Richness, Shannon dan Simpson. Ini adalah output analitik utama yang tersedia di workspace visualisasi.`}]},
    {type:'items', title:`File Output Pipeline`, items:[
      {icon:'filetext', title:`OTU table (raw)`, tag:`.tsv`, desc:`Matriks sampel x ASV sebelum normalisasi, berisi jumlah reads mentah per ASV di setiap sampel. Berguna jika Anda ingin menerapkan metode normalisasi alternatif secara mandiri. (filtered_otu_table.tsv)`},
      {icon:'filetext', title:`Taxonomy table`, tag:`.tsv`, desc:`Klasifikasi setiap ASV dari tingkat phylum hingga spesies. Nusantics melengkapi tabel taksonomi dengan taxon_name, berupa taxa terakhir yang dapat diidentifikasi untuk setiap ASV. Ini adalah referensi utama untuk identifikasi organisme. (taxonomy_sp_level_w_taxon_name.tsv)`},
      {icon:'filetext', title:`Pipeline statistics`, tag:`.tsv`, desc:`Ringkasan QC per sampel: jumlah reads di setiap tahap pembersihan data: input, filtered, denoised, merged, dan non-chimeric. Berguna untuk mengevaluasi kualitas data tiap sampel secara individual. (stats.tsv)`},
      {icon:'filetext', title:`Representative sequences`, tag:`.fasta`, desc:`Sekuens FASTA untuk setiap ASV. Dapat digunakan untuk analisis lanjutan di luar platform, seperti alignment dengan BLASTn atau pembuatan pohon filogenetik. (filtered_rep_seqs.fasta)`},
      {icon:'filetext', title:`Rarefied OTU table`, tag:`.tsv`, desc:`Matriks OTU setelah normalisasi kedalaman sekuensing (rarefaction). File ini menjadi dasar perhitungan semua metrik keragaman dalam platform ini. (rarefied_otu_table.tsv)`},
      {icon:'filetext', title:`Alpha diversity metrics`, tag:`.tsv`, desc:`Metrik keragaman dalam satu sampel: Shannon (mengukur distribusi jumlah dan kemerataan taksa), Simpson (mengukur probabilitas dominasi oleh suatu taksa), dan Richness (mengukur jumlah taksa unik yang terdeteksi dan bisa berbeda untuk setiap level taksa). Output ini didapatkan di laman workspace visualisasi.`}]},
    {type:'notes', title:`Catatan Penting`, items:[
      {tone:'ok', text:`Aman menutup browser. Pipeline berjalan di server Nusantics dan tidak terpengaruh oleh koneksi Anda. Notifikasi dikirim ke email dan WhatsApp saat selesai atau jika terjadi error.`},
      {tone:'info', text:`Durasi pipeline bervariasi tergantung jumlah sampel dan total ukuran FASTQ, umumnya antara 1 hingga beberapa jam. Tahap Pembersihan Data biasanya yang paling lama. ETA ditampilkan sebagai waktu absolut (HH:MM WIB) di layar tunggu.`},
      {tone:'warn', text:`Jika pipeline berhenti karena error di sisi infrastruktur (bukan kualitas data Anda), retry tersedia tanpa potongan kredit tambahan.`},
      {tone:'info', text:`Pipeline yang tersedia saat ini adalah 16S Metabarcoding, yaitu analisis komunitas mikrobioma berbasis amplikon 16S rRNA. Pipeline untuk aplikasi lain akan ditambahkan di versi mendatang.`}]},
    {type:'faq', title:`Pertanyaan Umum`, items:[   // authored
      {q:`Apakah analisis bisa dibatalkan setelah dikonfirmasi?`, a:`Tidak. Setelah dikonfirmasi, pipeline berjalan di cloud dan kredit langsung dipotong. Pastikan data sudah benar sebelum konfirmasi.`},
      {q:`Apa bedanya pipeline crash vs pipeline gagal?`, a:`Crash adalah error di sisi infrastruktur dan bisa di-retry tanpa potongan kredit tambahan. Gagal berarti pipeline berhenti karena masalah pada data Anda.`},
      {q:`Notifikasi dikirim ke mana?`, a:`Ke email dan WhatsApp yang terdaftar di akun Anda, saat pipeline selesai atau jika terjadi error.`},
      {q:`Bisakah saya memonitor progres pipeline secara detail?`, a:`Bisa. Layar tunggu menampilkan status tiap tahap dan estimasi selesai (HH:MM WIB). Detail subtask tersedia lewat tombol Detail Pipeline.`}]}
  ]},
{ id:7, color:'#2e4228', tile:'#8fb68a', icon:'barchart', short:`Hasil & Visualisasi`,
  lead:`Eksplorasi interaktif hasil pipeline: visualisasikan komposisi dan keragaman mikrobioma, sesuaikan tampilan chart, dan unduh output siap pakai untuk publikasi atau presentasi.`,
  intro:[
    `Setelah pipeline selesai, Anda masuk ke fase downstream yang berjalan on-demand di atas hasil yang sudah tersimpan. Berbeda dengan pipeline di Langkah 6 yang berjalan sekali dan bersifat final, eksplorasi hasil dapat dijalankan ulang kapan saja, berkali-kali, tanpa biaya tambahan. Anda bebas mengeksplorasi, mengganti konfigurasi visualisasi, atau mengupload metadata baru tanpa mengulang komputasi dari awal.`,
    `Kunci untuk membuka analisis komparatif adalah metadata sampel, yaitu informasi kontekstual seperti lokasi pengambilan, jenis perlakuan, waktu, atau kondisi lingkungan. Semakin lengkap metadata yang Anda sediakan, semakin kaya pengelompokan dan perbandingan yang bisa dieksplorasi dari kedua visualisasi yang tersedia.`],
  sections:[
    {type:'block', title:`Kartu Hasil Pipeline`, paras:[
      `Saat pipeline selesai, halaman run beralih ke tampilan Hasil Analisis. Kolom kiri menampilkan kartu ringkasan dengan tiga metrik utama: jumlah sampel yang diproses beserta kategori statusnya, nama dan versi pipeline yang berjalan, serta durasi komputasi dari mulai hingga selesai. Di bawah kartu ini tersedia ringkasan kredit yang dipotong, lengkap dengan ID transaksi untuk keperluan rekonsiliasi atau support, serta rekam jejak submisi berisi tautan permanen ke daftar identifikasi sampel dan file FASTQ yang tervalidasi.`,
      `Dua tombol aksi tersedia dari kartu pipeline: Detail Pipeline membuka rincian setiap subtask beserta statusnya, dan Lihat File Hasil membuka daftar file output yang siap diunduh: Filtered OTU table, taxonomy table, representative sequences, rarefied OTU table, dan hasil statistik proses pipeline bioinformatika dari sekuens. Hasil alpha diversity dapat diunduh melalui laman workspace visualisasi.`],
      items:[
      {icon:'list', title:`Sampel Diproses`, desc:`Jumlah total sampel yang masuk pipeline, diikuti badge kategori: baik (≥ 20.000 reads), reads rendah (1-19.999), atau gagal (0 reads / error file). Klik tautan di bawah angka untuk melihat daftar SampleID beserta statusnya.`},
      {icon:'pulse', title:`Pipeline`, desc:`Nama dan versi pipeline yang dijalankan pada run ini.`},   // authored
      {icon:'clock', title:`Durasi`, desc:`Total waktu komputasi dalam format jam dan menit. Baris sekunder menampilkan jam mulai dan jam selesai beserta tanggal (WIB), berguna sebagai bukti untuk pelaporan atau audit.`},
      {icon:'download', title:`Lihat File Hasil`, desc:`Membuka daftar file output pipeline yang dapat diunduh: Filtered OTU table, taxonomy table, representative sequences, rarefied OTU table, dan hasil statistik proses pipeline bioinformatika dari sekuens. Hasil alpha diversity dapat diunduh melalui laman workspace visualisasi.`},
      {icon:'layers', title:`Detail Pipeline`, desc:`Membuka rincian setiap subtask pipeline: data cleanup, klasifikasi taksonomi, klasifikasi spesies, dan normalisasi serta analisis keragaman, beserta status masing-masing tahap.`}]},
    {type:'block', title:`Upload Metadata`, paras:[
      `Kolom kanan halaman hasil analisis adalah area metadata, langkah opsional yang membuka fitur pengelompokan komparatif di workspace visualisasi. Saat pertama kali pipeline selesai, area ini menampilkan panduan dua langkah: download template lalu upload setelah diisi.`,
      `Template yang tersedia sudah memiliki kolom SampleID yang terisi otomatis dari daftar sampel run ini, sehingga tidak perlu mengetik ulang kode sampel. Tambahkan kolom kontekstual Anda di sebelahnya: lokasi pengambilan, kelompok perlakuan, kondisi lingkungan, waktu, atau variabel lain yang relevan dengan desain studi Anda. Setelah diisi, upload file dalam format .tsv, .csv, atau .xlsx. Workspace visualisasi dapat diakses sebelum maupun sesudah metadata diunggah, namun fitur pengelompokan baru aktif setelah metadata tersedia.`],
      items:[
      {icon:'download', title:`Template Metadata (SampleID otomatis)`, desc:`Unduh template yang sudah terisi SampleID dari run ini. Tambahkan kolom kontekstual Anda di sebelah kanan; nama dan jumlah kolom bebas, sesuaikan dengan desain studi Anda.`},
      {icon:'filetext', title:`Format yang diterima`, tag:`Info`, desc:`.tsv, .csv, atau .xlsx. Ukuran maksimum 10 MB per file.`},
      {icon:'layers', title:`Versi Metadata`, desc:`Setelah upload pertama, Anda dapat menambahkan versi metadata baru kapan saja tanpa menghapus yang sebelumnya. Pilih versi yang aktif melalui daftar versi di area metadata; visualisasi akan menggunakan versi yang sedang dipilih.`}]},
    {type:'block', title:`Taxa Bar Plot`, paras:[
      `Taxa Bar Plot menyajikan stacked bar chart kelimpahan relatif (%) per sampel; setiap warna mewakili satu level taksa. Secara default, ditampilkan 15 taksa teratas di level Phylum, namun semua parameter dapat dikonfigurasi ulang secara real-time. Lebar setiap bar bersifat konstan sehingga chart melebar seiring bertambahnya sampel, sehingga area workspace dapat di-scroll secara horizontal. Pada orientasi horizontal, tinggi setiap bar juga konstan dan chart dapat di-scroll secara vertikal.`],
      items:[
      {icon:'layers', title:`Level Taksonomi`, desc:`Pilih resolusi taksonomi dari Phylum hingga Last Taxa. Last Taxa bermakna Taxa Bar Plot akan menyajikan level taksonomi terakhir yang dapat diidentifikasi dari setiap sampel yang memenuhi filter. Semakin dalam level yang dipilih, semakin banyak taksa yang muncul dan semakin spesifik gambarannya.`},
      {icon:'sliders', title:`Filter: Top-N`, desc:`Tampilkan hanya N taksa dengan kelimpahan tertinggi; sisanya digabung. Default 15.`},   // authored
      {icon:'sliders', title:`Filter: Kelimpahan minimum`, desc:`Sembunyikan taksa yang kelimpahan relatifnya di bawah ambang yang Anda tentukan.`},   // authored
      {icon:'list', title:`Urut berdasarkan`, desc:`Atur urutan sampel pada sumbu chart.`},   // authored
      {icon:'maximize', title:`Orientasi`, desc:`Tampilkan chart secara vertikal (sampel di sumbu-X, label miring) atau horizontal (sampel di sumbu-Y, label terbaca penuh dari kiri). Mode horizontal lebih nyaman saat jumlah sampel banyak.`},
      {icon:'maximize', title:`Rasio tampilan`, desc:`Ubah proporsi tinggi chart di workspace menggunakan preset (16:9, 4:3, 3:2, 1:1, 2:3) atau tentukan ukuran kustom dengan memasukkan lebar dan tinggi dalam px (batas 200-2000 px). Perubahan langsung terlihat di workspace. PNG yang diunduh mengabadikan tampilan persis seperti yang sedang ditampilkan.`},
      {icon:'download', title:`Ekspor`, desc:`Unduh chart sebagai PNG sesuai tampilan yang sedang aktif.`}]},   // authored
    {type:'block', title:`Alpha Diversity`, paras:[
      `Alpha Diversity menyajikan scatter plot nilai keragaman per sampel untuk tiga metrik (Richness, Shannon dan Simpson) yang dapat dipilih satu per satu. Sumbu-Y selalu dimulai dari nol agar perbandingan antar kelompok akurat secara visual. Kekuatan utama visualisasi ini adalah fitur pengelompokan berdasarkan metadata: saat Anda memilih kolom metadata di dropdown "Kelompokkan", sampel dipisahkan di sumbu-X berdasarkan nilai kolom tersebut, sehingga perbedaan keragaman antar kelompok (misalnya lokasi A vs B, atau perlakuan kontrol vs treatment) langsung terlihat dalam satu chart.`],
      items:[
      {icon:'layers', title:`Level Taksonomi`, desc:`Pilih level taksonomi yang digunakan sebagai dasar perhitungan. Pengaturan ini konsisten dengan Taxa Bar Plot.`},
      {icon:'barchart', title:`Metrik: Shannon`, desc:`Metrik ini mengukur jumlah sekaligus kemerataan distribusi taksonomi berdasarkan level taksonomi yang dipilih. Nilai lebih tinggi menunjukkan komunitas yang lebih beragam dan seimbang.`},
      {icon:'barchart', title:`Metrik: Richness`, desc:`Metrik ini mengukur jumlah taksa unik yang terdeteksi dalam sampel berdasarkan level taksonomi yang dipilih. Metrik ini tidak mempertimbangkan kemerataan taksa. Nilai lebih tinggi menunjukkan semakin banyak taksa yang terdeteksi pada sampel.`},
      {icon:'barchart', title:`Metrik: Simpson`, desc:`Metrik ini mengukur probabilitas dominasi suatu taksa pada sampel berdasarkan level taksonomi yang dipilih. Nilai mendekati 0 menunjukkan adanya dominasi dari suatu taksa, sedangkan nilai mendekati 1 menunjukkan komunitas yang lebih beragam.`},
      {icon:'sliders', title:`Kelompokkan (sumbu-X)`, desc:`Pilih kolom dari metadata yang terupload untuk memisahkan sampel menjadi kelompok di sumbu-X. Tanpa metadata, semua sampel ditampilkan berdasarkan ID sampel tanpa pengelompokan.`},
      {icon:'maximize', title:`Rasio tampilan`, desc:`Sama seperti di Taxa Bar Plot. Ubah proporsi tinggi chart menggunakan preset atau ukuran kustom (lebar x tinggi). Berguna untuk menyesuaikan chart sebelum diunduh agar proporsional di slide atau poster.`},
      {icon:'download', title:`Ekspor`, desc:`Unduh chart sebagai PNG sesuai tampilan yang sedang aktif.`}]},   // authored
    {type:'block', title:`Fitur Workspace`, paras:[], items:[
      {icon:'maximize', title:`Mode layar penuh`, desc:`Klik ikon perbesar di pojok kanan atas area chart untuk masuk ke mode layar penuh. Chart ditampilkan terpusat secara vertikal dan horizontal di seluruh layar. Ikon berubah menjadi ikon perkecil selama mode aktif. Klik ikon yang sama atau tekan Esc untuk keluar.`}]},
    {type:'notes', title:`Catatan Penting`, items:[
      {tone:'ok', text:`Workspace visualisasi dapat dibuka kapan saja dari halaman hasil run. Tidak ada batas waktu akses dan tidak ada biaya tambahan untuk setiap kali menjalankan atau mengkonfigurasi ulang visualisasi.`}]},
    {type:'faq', title:`Pertanyaan Umum`, items:[   // authored
      {q:`Apakah workspace bisa diakses lagi di kemudian hari?`, a:`Bisa. Workspace dapat dibuka kapan saja dari halaman hasil run, tanpa batas waktu dan tanpa biaya tambahan.`},
      {q:`Format metadata seperti apa yang diterima platform?`, a:`File .tsv, .csv, atau .xlsx dengan ukuran maksimum 10 MB per file. Gunakan template yang sudah berisi SampleID dari run ini.`},
      {q:`Apakah metadata wajib diupload sebelum bisa menggunakan visualisasi?`, a:`Tidak wajib. Workspace dapat diakses sebelum maupun sesudah metadata diunggah, tetapi fitur pengelompokan baru aktif setelah metadata tersedia.`},
      {q:`Mengapa PNG yang diunduh berlatar transparan?`, a:`Agar chart mudah ditempatkan di slide, poster, atau dokumen dengan latar apa pun tanpa kotak putih di sekelilingnya.`},
      {q:`Berapa batas ukuran kustom di Rasio tampilan?`, a:`Lebar dan tinggi kustom dibatasi antara 200 hingga 2000 px.`}]}
  ]}
];
