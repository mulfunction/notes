---
title: "Weekly Report Muldan 04-09-2026"
description: "Weekly status update on the 3 September Dynastyshorts release: in-app purchase incident handling, Originals rebranding, player and subtitle fixes, video performance, monitoring, and the remaining deploy queue."
created: 2026-09-04
category: "Weekly Report"
tags:
  - note
  - journal
  - weeklyreport
draft: false
---
Summary Pekerjaan Minggu ini:

- Handling insiden pembayaran in-app (IAP) di hari campaign 3 September + bikin jaring pengaman otomatis supaya transaksi yang nyangkut tetap masuk
- Release app Android versi 1.2.8 (berisi perbaikan recovery pembelian)
- Rebranding tier VIP menjadi **Originals** di web, mobile web, dan app
- Perbaikan player: loading indicator, subtitle, dan user yang ke-logout sendiri
- Perbaikan episode yang kelihatan terkunci padahal user sudah berlangganan
- Perbaikan lag video (root cause ketemu: bitrate source terlalu besar)
- Pasang monitoring + alerting pembayaran, notif langsung masuk ke chat tim
- Landing page & tracking pixel Jaka Tingkir
- Bikin internal kanban board untuk tracking task lintas repo

## Details:

### 1. Insiden pembayaran (IAP) hari campaign

Di hari campaign 3 September ada beberapa user yang sudah bayar tapi koin/langganannya tidak otomatis masuk. Setelah ditelusuri sampai ke log server, penyebabnya kombinasi dua hal:

1. Google Play kadang tidak mengirim notifikasi pembelian ke server kita (bukan salah konfigurasi, sudah dibuktikan dengan transaksi pembanding di hari yang sama)
2. App versi lama tidak pernah mengecek ulang ke store waktu dibuka kembali, jadi pembelian yang nyangkut tidak pernah "ketemu" lagi

Yang dikerjakan:

- Sweep seluruh transaksi sejak akhir Agustus untuk memastikan tidak ada korban lain — hasilnya hanya 2 user, keduanya sudah di-handle manual di hari yang sama
- Bikin tool rekonsiliasi otomatis: server membandingkan laporan penjualan store dengan database kita, lalu grant otomatis transaksi yang belum masuk. Jalan tiap 4 jam, **tanpa perlu update app**
- Perbaikan permanen sisi server + sisi web sudah live; sisi native app ikut di release 1.2.8
- Perbaikan tambahan: pembelian yang gagal sekarang di-retry oleh store (sebelumnya langsung dianggap selesai), grant dibuat idempotent supaya tidak dobel, dan verifikasi one-time purchase dipindah ke endpoint Google yang baru

### 2. Release App 1.2.8

- Reset upload key Play Store dan perbaikan build release Android (build sempat gagal karena versi tooling)
- Bersih-bersih file signing dari repo
- Cold-start recovery pembelian sekarang jalan setelah app siap, bukan sebelum

### 3. Rebranding VIP → Originals

- Semua label VIP diganti Originals di web, mobile web, dan navigasi
- Ganti badge crown emoji dengan icon SVG sendiri (lebih ringan & konsisten)
- Menu Originals masuk sebagai kategori di home dan nav

### 4. Player, Subtitle & Session

- Subtitle: warna kuning disamakan di semua platform, tag markup yang bocor ke layar dibersihkan, dan subtitle default off untuk drama Originals
- Loading: spinner sekarang muncul waktu episode pertama kali load dan waktu pindah episode, jadi tidak terasa "diam" saja
- **Fix user ke-logout sendiri**: laporan "episode 9-10 terkunci, tapi bisa lagi setelah 10 menit" ternyata karena app menghapus sesi login setiap kali refresh token gagal sementara. Sekarang hanya sesi yang benar-benar invalid yang di-logout
- Popup promo registrasi tidak lagi muncul untuk user yang sudah login

### 5. Episode terkunci acak untuk subscriber

Subscriber aktif kadang melihat gembok muncul acak di beberapa episode. Penyebabnya pengecekan status unlock dilakukan satu per satu per episode dan gagal diam-diam saat traffic tinggi. Sudah diperbaiki jadi satu kali pengecekan batch, sudah merge, tinggal deploy.

### 6. Performa Video

- Root cause lag ketemu: file sumber masih raw ~15 Mbps 1080p60 dan tidak pernah lewat proses transcode
- Jaka Tingkir sudah di-re-encode dan lancar
- Sisanya (99 drama) masuk rencana, sekalian bikin stage transcode otomatis di worker supaya upload baru tidak mengulang masalah yang sama

### 7. Monitoring & Alerting

- Pasang metrik khusus jalur pembayaran (verifikasi, grant, webhook) dan 16 alert rule yang sudah dites otomatis
- Alert sekarang dikirim ke chat tim, jadi masalah pembayaran ketahuan dari notif, bukan dari komplain user

### 8. Lain-lain

- Landing page Jaka Tingkir: pasang Meta & TikTok pixel untuk tracking campaign
- Dashboard: satu paket langganan sekarang bisa mencakup lebih dari satu kategori
- Baseline tampilan jumlah view drama dinaikkan
- Bikin kanban board internal untuk tracking semua task lintas repo (backend, web, app, dashboard, worker) dalam satu papan

### Project lain

- Pipeline klasifikasi komentar: cache & laporan harian jalan otomatis tiap hari, dan satu integrasi mirror ke tool eksternal dihapus setelah dikonfirmasi tidak dipakai

## Rencana / Masih On Going

**Deploy queue (kode sudah selesai, tinggal naik ke server):**

1. Fix episode terkunci acak untuk subscriber — deploy di jam sepi (dini hari)
2. Fix loading cue saat scroll antar episode di mobile web
3. Fix app blank di iOS lama (di bawah 16.4) — build sekarang menargetkan Safari versi baru saja, sudah ada fix satu baris, tinggal deploy
4. Upload subtitle bahasa Inggris & Melayu di dashboard — sudah selesai & terverifikasi, tinggal merge + deploy

**Backlog:**

- Stage transcode otomatis di worker + re-encode 99 drama sisanya (~8.600 episode)
- Backfill poster untuk episode yang thumbnail-nya masih kosong (~19.465 episode, sudah discoping, dijalankan bertahap)
- Fix drama Originals tidak bisa tambah episode dari dashboard (sekarang masih pakai workaround upload sebagai tipe lain lalu diganti)
- Auto-assign kategori Original untuk drama Originals supaya tidak perlu tag manual
- Perbaikan progress bar bulk upload yang kadang berhenti di persentase lama padahal proses sudah selesai
- Hardening jalur pembayaran: guard untuk produk store yang belum di-mapping + hitung kegagalan konfirmasi pembelian
- Rapikan alert worker yang masih bisa salah bunyi saat pipeline idle
- Migrasi kredensial pembayaran ke akun milik sendiri (masih menumpang setup developer sebelumnya)
- Merge & deploy pindah episode tanpa reload untuk web desktop (menunggu approval)
