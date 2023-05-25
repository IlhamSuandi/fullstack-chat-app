ini adalah sebuah aplikasi realtime chat

tech stack: - backend : nodejs, expressjs, socketio - database : mysql - frontend : react native expo

untuk menjalankan programnya:

1. pastikan sudah menginstall docker di komputer, jika belum maka dapat melihat tutorial di link : https://www.youtube.com/watch?v=ymJFoSHFmEw&pp=ygUqaG93IHRvIGluc3RhbGwgZG9ja2VyIGluIHdpbmRvd3MgYW5kIGxpbnVz

2. jika sudah pastikan port 19000-19006, 3306 dan 5000 sedang tidak digunakan. cara memastikannya 'buka secara administrator command prompt yang ada di windows, kemudian ketik netstat -aon ![myimage-alt-tag](https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/02/Screenshot_3-48.png?w=669&ssl=1)
   jika port yang disebutkan sedang terpakai bisa untuk di stop terlebih dahulu dengan mengetikan command: `taskkill /PID {PORT} /F` -> ganti kata PORT dengan port yang mau di stop misal `taskkill /PID 5000 /F` untuk stop port 5000.

3. jika semua sudah dilakukan, pastikan untuk berada di folder root. setelah itu,
   ketikan command : docker-compose up --build
   dan tunggu hingga selesai

4. setelah itu buka browser dan masuk ke http://localhost:19006/ dan aplikasi sudah siap dipakai.

NOTE:
untuk login dapat memakai akun :
akun 1: -username: ilham suandi -password: password
akun 2: -username: ardi winata -password: password

untuk memastikan bahwa real time chatnya berhasil buka 2 url menggunakan url http://localhost:19006/ dan masukan kedua akun tersebut setelah itu mulai chat.
