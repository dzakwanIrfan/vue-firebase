Berikut adalah modifikasi README dengan Tugas 9 yang baru:

# TUGAS 9 dan TUGAS 10 Praktikum Mobile

Nama: Dzakwan Irfan Ramdhani  
NIM: H1D022043  
Shift Lama: C  
Shift Baru: D  

# DAFTAR ISI

- [Tugas 9](#tugas-9)
- [Tugas 10](#tugas-10)

## Tugas 9: Autentikasi Google API: Implementasi Login dan Pengambilan Data Profil

### Fitur Aplikasi
Aplikasi ini memanfaatkan Firebase dan Google API untuk autentikasi pengguna serta pengambilan data profil. Proses autentikasi didukung oleh library `@codetrix-studio/capacitor-google-auth` dengan manajemen state menggunakan Pinia. Berikut adalah fitur-fitur utama aplikasi:

### 1. Halaman Login  
![iPhone-13-PRO-localhost](https://github.com/user-attachments/assets/19cca009-2b7b-452b-be3a-c51c117a8c3b)
Halaman ini berfungsi sebagai landing page yang menampilkan tombol "Sign In with Google". Tombol ini akan memulai proses autentikasi Google saat ditekan. Jika proses login gagal, aplikasi akan menampilkan alert yang memberitahukan pengguna untuk mencoba kembali.

### 2. Popup Google Sign-In  
![Screenshot 2024-11-21 070012](https://github.com/user-attachments/assets/b1d0175a-83d5-48d7-969a-7f8dc6b69218)  
![Screenshot 2024-11-21 070018](https://github.com/user-attachments/assets/d7cbabd8-529d-4e2e-bf52-bf64d92edfaf)  
Setelah tombol login ditekan, popup autentikasi dari Google OAuth muncul, memungkinkan pengguna memilih akun yang akan digunakan untuk login.

### 3. Halaman Home  
![iPhone-13-PRO-localhost (1)](https://github.com/user-attachments/assets/6e26a110-bb58-4369-ad98-c6083753c3b0)  
Setelah berhasil login, pengguna diarahkan ke halaman Home. Halaman ini menampilkan header, konten utama, dan navigasi berbasis tab. Proteksi route memastikan halaman ini hanya dapat diakses oleh pengguna yang sudah terautentikasi.

### 4. Halaman Profile  
![iPhone-13-PRO-localhost (2)](https://github.com/user-attachments/assets/4c1314f7-d172-4423-9387-dbd3a12d2523)  
Halaman profil menampilkan informasi pengguna yang diambil dari akun Google, termasuk foto profil, nama lengkap, dan email. Juga terdapat tombol logout di pojok kanan atas untuk mengakhiri sesi.

### 5. Firebase Authentication Panel  
Halaman ini menampilkan daftar pengguna yang telah berhasil login di Firebase Console.

## Alur Kerja Autentikasi  

1. **Inisialisasi Firebase dan Google Auth**  
   - Firebase dikonfigurasi menggunakan kredensial yang diperoleh dari Firebase Console.  
   - Google Auth diatur dengan Client ID yang didaftarkan di Google Cloud Console.

2. **Proses Login**  
   - Pengguna menekan tombol "Sign In with Google" untuk memulai proses autentikasi.  
   - Popup Google OAuth muncul untuk memilih akun dan memberikan izin yang diperlukan.  
   - Token autentikasi yang diterima diverifikasi oleh Firebase.  
   - Data pengguna disimpan di Firebase Authentication dan Pinia store.

3. **Manajemen Data dan Proteksi Route**  
   - Data pengguna seperti foto, nama, dan email diambil dari akun Google dan disimpan di state aplikasi.  
   - `onAuthStateChanged` digunakan untuk memantau status autentikasi pengguna.  
   - Router guard memastikan hanya pengguna yang terautentikasi yang dapat mengakses halaman tertentu.

4. **Logout**  
   - Ketika tombol logout ditekan, fungsi `signOut` dipanggil untuk keluar dari Firebase dan Google Auth.  
   - State pengguna dihapus dan aplikasi mengarahkan kembali ke halaman login.

## Troubleshooting  

1. **Client ID Tidak Valid**  
   - Pastikan Client ID di Google Cloud Console sudah benar dan URL aplikasi telah terdaftar.

2. **Popup Terblokir**  
   - Periksa pengaturan browser untuk memastikan popup tidak diblokir.

3. **Token Kedaluwarsa**  
   - Implementasikan logika untuk menyegarkan token guna mencegah sesi berakhir secara otomatis.

4. **Masalah CORS**  
   - Pastikan domain aplikasi telah terdaftar di Firebase Console dan Google Cloud Console.

## Cuplikan Kode  

### Setup Firebase  
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
```  

### Implementasi Login  
```typescript
const loginWithGoogle = async () => {
  try {
    await GoogleAuth.initialize({
      clientId: "YOUR_CLIENT_ID",
      scopes: ["profile", "email"],
      grantOfflineAccess: true,
    });
    const googleUser = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(
      googleUser.authentication.idToken
    );
    await signInWithCredential(auth, credential);
    router.push("/home");
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
};
```  

## Tugas 10

### 1. Menambahkan Todo

| Tampilan Awal | Formulir Tambah Todo | Hasil Penambahan |
|:-------------:|:-------------------:|:----------------:|
| ![WhatsApp Image 2024-11-25 at 22 13 40](https://github.com/user-attachments/assets/d706d594-e143-497b-a67a-48bb41d4f385) | ![WhatsApp Image 2024-11-25 at 22 13 41](https://github.com/user-attachments/assets/58504cb9-58bf-4557-8b7a-d9958a8f98a3) | ![WhatsApp Image 2024-11-25 at 22 13 41 (1)](https://github.com/user-attachments/assets/7500f318-66c8-4fa7-a0d7-f077c7214c8c) |

Fitur tambah todo memungkinkan pengguna membuat task baru. Dimulai dengan tampilan daftar todo yang ada. Ketika tombol "+" ditekan, formulir untuk menambah todo akan muncul. Pengguna dapat memasukkan judul task baru dan setelah menekan tombol submit, todo baru akan ditambahkan dan ditampilkan langsung di halaman utama.

### 2. Mengedit Todo

| Tampilan Todo | Formulir Edit | Hasil Edit |
|:-------------:|:-------------:|:----------:|
| ![WhatsApp Image 2024-11-25 at 22 17 18](https://github.com/user-attachments/assets/fd58c565-a829-403e-b302-a3bdd3f5d4e4) | ![WhatsApp Image 2024-11-25 at 22 17 22](https://github.com/user-attachments/assets/187caae1-9f70-45de-b9fa-03ea89032541) | ![WhatsApp Image 2024-11-25 at 22 17 23](https://github.com/user-attachments/assets/e945c1e1-db50-4b16-b613-e57276275037) |

Untuk mengedit todo yang sudah ada, pengguna dapat menggeser ke kiri task yang sudah dibuat, kemudian menekan tombol edit berwarna biru dengan ikon pensil. Formulir edit akan muncul dengan data todo yang ada, memungkinkan pengguna untuk mengganti judul dan deskripsi task. Setelah perubahan disimpan, todo akan diperbarui dengan data baru.

### 3. Menandai Todo Sebagai Selesai

| Tampilan Awal | Hasil Setelah Ditandai |
|:-------------:|:----------------------:|
| ![WhatsApp Image 2024-11-25 at 22 19 18](https://github.com/user-attachments/assets/87928d5e-922c-475e-9741-bef173617699) | ![WhatsApp Image 2024-11-25 at 22 19 19](https://github.com/user-attachments/assets/b0e49271-b6fe-4d73-b155-266f58711f9c) |

Pengguna dapat menandai todo sebagai selesai dengan menggeser task yang telah dibuat ke kiri dan menekan tombol centang hijau. Setelah ditandai selesai, status todo berubah menjadi "completed" untuk menunjukkan bahwa task tersebut telah diselesaikan. Status ini akan tetap terlihat meskipun aplikasi diakses lagi.

### 4. Mengaktifkan Kembali Todo yang Selesai

| Todo Selesai | Hasil Pengaktifan |
|:------------:|:-----------------:|
| ![WhatsApp Image 2024-11-25 at 22 21 33](https://github.com/user-attachments/assets/d81f5eab-4bc7-444e-9e8a-38a0e2680ada) | ![WhatsApp Image 2024-11-25 at 22 21 34](https://github.com/user-attachments/assets/4ddbe2ca-cbc6-4a30-b8de-84a0b6baf0d1) |

Todo yang telah ditandai selesai dapat diaktifkan kembali dengan menggeser task ke kiri dan menekan tombol "x" berwarna kuning. Ini akan mengembalikan status todo ke aktif dan menandakan bahwa task tersebut perlu dikerjakan lagi. Fitur ini berguna jika pengguna tidak sengaja menandai todo sebagai selesai.

### 5. Menghapus Todo

| Sebelum Dihapus | Setelah Dihapus |
|:---------------:|:---------------:|
| ![WhatsApp Image 2024-11-25 at 22 21 34 (1)](https://github.com/user-attachments/assets/07f6e6f5-ae10-42dc-8fa5-8694e8210d9b) | ![WhatsApp Image 2024-11-25 at 22 21 34 (2)](https://github.com/user-attachments/assets/f013f993-3ce4-48bd-84b0-4d43a4a7cb17) |

Untuk menghapus todo, pengguna dapat menggeser ke kanan task yang ingin dihapus sampai muncul ikon tempat sampah. Setelah konfirmasi, todo akan dihapus secara permanen dari

 daftar. Proses ini tidak memiliki konfirmasi lebih lanjut, jadi pengguna perlu berhati-hati saat menghapus. Setelah dihapus, todo tidak akan muncul lagi di daftar.

## Membuat APK Ionic dan Konfigurasi Firebase untuk Android

Berikut adalah langkah-langkah untuk membangun APK dari aplikasi Ionic:

### 1. Persiapkan Environment
Pastikan semua dependensi yang diperlukan telah terinstal.
```bash
# Instal Ionic CLI
npm install -g @ionic/cli

# Instal dependensi proyek
npm install
```

### 2. Menambahkan Platform Android
Tambahkan platform Android ke proyek Ionic sekali saja pada setup pertama.
```bash
ionic cap add android
```

### 3. Membangun Proyek Ionic
Lakukan build proyek Ionic untuk menghasilkan file yang dibutuhkan untuk aplikasi Android.
```bash
ionic build
```

### 4. Sinkronisasi dengan Capacitor
Setelah build selesai, sinkronkan proyek untuk memperbarui perubahan ke dalam proyek Android.
```bash
ionic cap sync android
```

### 5. Membuka Proyek di Android Studio
Buka proyek Android yang sudah digenerate untuk membuat APK.
```bash
ionic cap open android
```

### 6. Membuat APK Signed

Setelah Anda menyelesaikan pengaturan proyek dan konfigurasi Firebase, langkah berikutnya adalah membuat APK yang sudah signed untuk bisa dipublikasikan di Google Play Store. Ikuti langkah-langkah berikut di Android Studio:

1. **Buka Proyek di Android Studio:**
   - Setelah sinkronisasi selesai, buka proyek Android Anda di Android Studio dengan perintah:
   ```bash
   ionic cap open android
   ```

2. **Membuat Keystore:**
   Jika Anda belum memiliki file keystore untuk menandatangani APK, Anda dapat membuatnya menggunakan `keytool`. Gunakan perintah berikut untuk menghasilkan keystore baru (sesuaikan dengan nama dan password yang Anda inginkan):
   ```bash
   keytool -genkeypair -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```

3. **Tambahkan Keystore di Gradle:**
   - Tempatkan file keystore di dalam folder `android/app/`.
   - Tambahkan konfigurasi keystore ke file `android/app/build.gradle` di bagian `signingConfigs` seperti berikut:
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file("my-release-key.keystore")
               storePassword "your_store_password"
               keyAlias "my-key-alias"
               keyPassword "your_key_password"
           }
       }
   }
   ```

4. **Generate Signed APK di Android Studio:**
   - Pilih menu "Build" > "Generate Signed Bundle / APK".
   - Pilih "APK" dan klik "Next".
   - Pilih konfigurasi keystore yang telah Anda tentukan sebelumnya, dan masukkan password untuk keystore dan key alias.
   - Pilih "Release" sebagai build variant.
   - Klik "Finish" untuk memulai proses pembuatan APK signed.
   - Setelah proses selesai, APK signed akan tersedia di direktori:
     ```
     android/app/build/outputs/apk/release/app-release.apk
     ```

5. **Uji APK:**
   - Sebelum mengunggah ke Google Play Store, pastikan Anda menguji APK di perangkat Android untuk memastikan semuanya berjalan lancar.

### 7. Konfigurasi Firebase

Untuk mengonfigurasi Firebase di aplikasi Android Anda, ikuti langkah-langkah berikut:

1. **Mendapatkan `google-services.json`:**
   - Masuk ke [Firebase Console](https://console.firebase.google.com/), pilih proyek Anda.
   - Di panel kiri, klik "Project settings" (ikon roda gigi).
   - Di bagian "Your apps", pilih aplikasi Android.
   - Salin file `google-services.json` yang telah dikonfigurasi.
   - Letakkan file ini di dalam folder `android/app/` di proyek Anda.

2. **Menambahkan Plugin Firebase di Gradle:**
   - Di file `android/build.gradle`, pastikan Anda menambahkan plugin Firebase seperti berikut di bagian `dependencies`:
   ```gradle
   buildscript {
       dependencies {
           classpath 'com.google.gms:google-services:4.3.15'  // Sesuaikan dengan versi terbaru
       }
   }
   ```
   - Pada file `android/app/build.gradle`, pastikan Anda menambahkan plugin di bawah ini:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

3. **Aktifkan Firebase Authentication:**
   - Kembali ke Firebase Console, pilih proyek Anda, dan aktifkan metode autentikasi yang Anda butuhkan di bagian Authentication > Sign-in method.
   - Pilih "Google" dan aktifkan.

4. **Menambahkan Firebase SDK di Proyek:**
   - Untuk menggunakan Firebase Authentication, pastikan Anda menambahkan dependensi Firebase SDK di file `android/app/build.gradle`:
   ```gradle
   dependencies {
       implementation 'com.google.firebase:firebase-auth:21.1.0'  // Sesuaikan dengan versi terbaru
   }
   ```

5. **Sinkronisasi dengan Capacitor:**
   Setelah menambahkan file konfigurasi `google-services.json` dan dependensi Firebase, jalankan perintah berikut untuk menyinkronkan perubahan ke proyek Android:
   ```bash
   ionic cap sync android
   ```

6. **Cek dan Uji Koneksi Firebase:**
   - Buka kembali aplikasi Anda di Android Studio dan pastikan aplikasi dapat terhubung dengan Firebase.
   - Anda bisa mengecek di logcat untuk memastikan tidak ada error terkait Firebase.

Setelah mengikuti langkah-langkah ini, aplikasi Anda akan siap untuk menggunakan Firebase Authentication dan layanan lainnya. Anda dapat melanjutkan dengan membangun APK dan mempublikasikannya ke Google Play Store jika semuanya sudah terkonfigurasi dengan benar.
