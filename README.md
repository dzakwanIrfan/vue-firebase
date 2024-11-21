# Autentikasi Google API: Implementasi Login dan Pengambilan Data Profil  
Nama: Dzakwan Irfan Ramdhani 
NIM: H1D022043
Shift Lama: C  
Shift Baru: D  

## Fitur Aplikasi
Aplikasi ini memanfaatkan Firebase dan Google API untuk autentikasi pengguna dan pengambilan data profil. Proses ini didukung oleh library `@codetrix-studio/capacitor-google-auth` serta manajemen state menggunakan Pinia. Berikut adalah fitur utamanya:  

### 1. Halaman Login  
![iPhone-13-PRO-localhost](https://github.com/user-attachments/assets/19cca009-2b7b-452b-be3a-c51c117a8c3b)
Halaman ini menjadi landing page aplikasi, menampilkan tombol "Sign In with Google" yang memulai proses autentikasi saat ditekan. Jika login gagal, aplikasi menampilkan alert untuk mencoba kembali.  

### 2. Popup Google Sign-In  
![Screenshot 2024-11-21 070012](https://github.com/user-attachments/assets/b1d0175a-83d5-48d7-969a-7f8dc6b69218)
![Screenshot 2024-11-21 070018](https://github.com/user-attachments/assets/d7cbabd8-529d-4e2e-bf52-bf64d92edfaf)
Ketika tombol login ditekan, muncul popup dari Google OAuth yang memungkinkan pengguna memilih akun untuk autentikasi.  

### 3. Halaman Home  
![iPhone-13-PRO-localhost (1)](https://github.com/user-attachments/assets/6e26a110-bb58-4369-ad98-c6083753c3b0)
Setelah login berhasil, pengguna diarahkan ke halaman Home yang menampilkan header, konten utama, serta navigasi berbasis tab. Halaman ini hanya dapat diakses oleh pengguna yang sudah terautentikasi melalui proteksi route.  

### 4. Halaman Profile  
![iPhone-13-PRO-localhost (2)](https://github.com/user-attachments/assets/4c1314f7-d172-4423-9387-dbd3a12d2523)
Menampilkan data pengguna yang diambil dari akun Google, meliputi:  
- Foto profil  
- Nama lengkap  
- Email  
Juga tersedia tombol logout untuk mengakhiri sesi.  

### 5. Firebase Authentication Panel  
Menampilkan daftar pengguna yang telah berhasil login di Firebase Console.  

## Alur Kerja Autentikasi  

1. **Inisialisasi Firebase dan Google Auth**  
   - Firebase dikonfigurasi dengan kredensial dari Firebase Console.  
   - Google Auth diatur menggunakan Client ID dari Google Cloud Console.  

2. **Proses Login**  
   - Tombol "Sign In with Google" memulai autentikasi.  
   - Popup Google OAuth muncul untuk memilih akun dan memberikan izin.  
   - Token autentikasi diterima dan diverifikasi oleh Firebase.  
   - Data pengguna disimpan di Firebase Authentication dan Pinia store.  

3. **Manajemen Data dan Proteksi Route**  
   - Data pengguna (foto, nama, email) diambil dari akun Google dan disimpan di state.  
   - `onAuthStateChanged` memonitor status autentikasi.  
   - Router guard memastikan hanya pengguna terautentikasi yang dapat mengakses halaman tertentu.  

4. **Logout**  
   - Tombol logout memanggil fungsi `signOut` pada Firebase dan Google Auth.  
   - State pengguna dihapus, dan aplikasi mengarahkan kembali ke halaman login.  

## Troubleshooting  

1. **Client ID Tidak Valid**  
   - Pastikan Client ID di Google Cloud Console sesuai dan URL aplikasi terdaftar.  

2. **Popup Blocked**  
   - Periksa pengaturan browser agar tidak memblokir popup.  

3. **Token Expired**  
   - Implementasikan logika refresh token untuk mencegah sesi kedaluwarsa.  

4. **CORS Issues**  
   - Pastikan domain aplikasi terdaftar di Firebase Console dan Google Cloud Console.  

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
