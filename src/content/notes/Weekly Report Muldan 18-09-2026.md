---
title: "Weekly Report Muldan 18-09-2026"
description: "Weekly status update: proses banding akun developer Google Play dan laporan C-level, customer support, rekap pendapatan Google Play, serta perbaikan kuota egress kampanye.ai."
created: 2026-09-18
category: "Weekly Report"
tags:
  - note
  - journal
  - weeklyreport
draft: false
---
Summary Pekerjaan Minggu ini:

- Handling banding akun developer Google Play (ditutup Google 11 Sep): korespondensi dengan Google + laporan tertulis untuk C-level
- Customer support: pertanyaan soal tagihan otomatis / batal langganan
- Rekap pendapatan Google Play September + update daftar user terdaftar
- kampanye.ai: fix kuota egress Supabase yang jebol

## Details:

### 1. Banding akun developer Google Play

Konteks: 11 Sep Google menutup akun developer dengan alasan data informasi akun (Play Console Requirements dan Developer Distribution Agreement 11.4), tanpa menyebut data mana yang dipersoalkan. Banding beserta dokumen legalitas perusahaan diajukan di hari yang sama. Aplikasi Android tidak tersedia di Google Play sampai akun dipulihkan, dan rilis 1.2.8 ikut tertahan.

Minggu ini:

- **12 Sep** — Google mengonfirmasi banding sedang ditinjau. Google menulis: "This typically takes 7 days but may be longer."
- **14 Sep** — Ringkasan status untuk C-level disusun (web + PDF), termasuk batasan selama akun ditutup dengan rujukan ke halaman resmi Google
- **15 Sep** — Banding ditolak dengan balasan template, tanpa menyebut data mana yang tidak memenuhi syarat. Google juga menulis supaya tidak mendaftar akun developer baru: "Any new accounts will be closed, and your developer registration fee will not be refunded."
- **15 Sep** — Pertanyaan lanjutan dikirim di tiket yang sama: data mana yang bermasalah, ada tidaknya kaitan dengan akun lain, dan status saldo pembayaran.
- **15–18 Sep** — Laporan C-level ditulis ulang sebagai catatan faktual dan direvisi beberapa kali bersama supervisor; versi terakhir (PDF 2 halaman) selesai 18 Sep

Selama akun ditutup, akses ke Play Console terkunci, jadi tidak ada data akun yang bisa diubah dari sisi kita. Jalur resmi yang tersisa adalah korespondensi di tiket banding yang sudah berjalan.

Yang masih jalan: tool rekonsiliasi penjualan masih bisa membaca laporan penjualan Play, jadi data transaksi per order tetap terbaca walau Play Console tidak bisa diakses.

### 2. Customer support

- User khawatir kena tagihan otomatis dan mencari tombol "batalkan langganan" di halaman Pembayaran & Langganan. Sudah dicek sampai ke catatan Apple: paketnya tercatat sebagai pembelian satu kali, bukan langganan yang diperpanjang otomatis — jadi memang tidak ada yang perlu dibatalkan, akses berakhir sendiri di tanggal kedaluwarsa. Dengan ini sudah terverifikasi di kedua store (Google minggu lalu, Apple minggu ini), dan jadi pola jawaban baku untuk pertanyaan serupa
- User yang sama juga mengirim email dari alamat lain yang tidak terdaftar di akun. Dibalas singkat bahwa jawaban lengkap sudah dikirim ke email terdaftar — data akun hanya dibahas lewat email yang terdaftar, dan alamat terdaftarnya disamarkan di balasan

### 3. Report & data

- Rekap pendapatan Google Play 1–10 Sep dalam Google Sheet (penjualan kotor, potongan Google, dan bersih per hari). File CSV dari Google tidak bisa di-SUM karena tanda minusnya bukan karakter minus biasa sehingga terbaca sebagai teks — sudah dibersihkan, dan totalnya cocok dengan saldo akhir di Google
- Update daftar user terdaftar + status langganan (14 Sep), pakai script export yang sama dengan minggu lalu supaya kolom dan urutannya konsisten

### Project lain

- **kampanye.ai** — kuota cached egress Supabase jebol (210%) sehingga project dibatasi sampai kuota reset 20 Sep. Penyebabnya sebagian cover blog masih memakai URL storage langsung sehingga tidak lewat CDN. Sudah diperbaiki, plus dipasang pengaman supaya URL semacam itu langsung kelihatan gagal di development, bukan ketahuan dari tagihan
