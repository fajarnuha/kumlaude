---
title: "Contribution Guide"
cover: "/img/colaboration.jpg"
---
## Wanna be evaluator/developer? contact me! 

## Kumlaude?
> Kumlaude adalah project open source untuk mahasiswa ilmu komputer ugm, berisi materi-materi belajar yang bersangkutan dengan ilmu komputer. Website dari repo ini adalah https://fajarnuha.github.io/kumlaude
<hr>

## Konten 
Semua konten-konten disini adalah hasil kolaborasi penulisan mahasiswa-mahasiswa ilmu komputer. Semua orang bisa mengajukan usulan penulisan dengan pull-request(PR), dan akan di review oleh maintainer repository ini, jika kiranya bermanfaat, usulan akan diterima dan di publish ke website Kumlaude

Konten bisa berisi tulisan, gambar, links, video, tips-trick, review dosen, info ujian, code, atau apapun asal bermanfaat

Konten tidak harus yang panjang dan ribet. Hanya 1-2 baris boleh asalkan bermanfaat. Tidak usah takut salah, project ini open source, jadi kalau salah ntar akan ada orang yang benerin

Kamu boleh nambah tulisan di artikel yang sudah ada, atau bisa juga buat konten/folder/topic jika belum ada. Tinggal PR aja!
<hr>

## Siapa saja yang berkolaborasi disini?
Semua orang, tapi ada 4 kategori orang di project ini:
1. User : semua mahasiswa ilmu komputer yang ingin belajar biar cumlaude
2. Content Contributor : semua mahasiswa yang menulis hal yg bermanfaat disini
3. Code Contributor : mahasiswa yang membuat website ini berjalan dan beraparas lebih keren
4. Maintainers : mahasiswa yang mengevaluasi PR dan maintain website

<hr>

## Cara Kontribusi Konten
Konten-konten di kumlaude, termasuk guide ini, berupa file-file [markdown](https://en.wikipedia.org/wiki/Markdown) yang notabene mirip txt biasa tp lebih canggih.

Jadi belajar trik-trik markdown dulu biar kontennya makin apik. [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#lists)

Sebelumnya, kalau kamu ini di website, pergi dulu ke [Github](http://github.com/fajarnuha/kumlaude) nya

Ada 2 cara kontribusi:<br>
**Gampang**
1. Pergi ke `content/colab` di repo kumlaude, cari artikel yang ingin ditulis atau diedit. Biasanya nama filenya index.md di tiap topic folder
2. Click icon pensil "Edit this file" dan buat changes dalam file di Github-flavored Markdown
3. Scroll kebawah dan tambahkan commit message yang menerangkan changes kamu. Kemudian pilih "Create a new branch for this commit and start a pull-request", kemudian pilih "Propose file changes"
4. Kemudian, kamu bisa tambahkan detail lainnya, lalu "Create pull request"
<br><br>

[![Gif contoh dari project serupa freeCodeCamp](https://i.imgur.com/0cmxJwN.gif)](https://i.imgur.com/0cmxJwN.gif)

**Developer Way**
1. Fork repo
2. clone repo ke local dengan command `git clone https://github.com/YOUR-GITHUB-USERNAME/kumlaude.git`
3. Tambah remote upstream `git remote add upstream https://github.com/fajarnuha/kumlaude.git`
4. Buat branch baru untuk kerjaanmu dengan `git checkout -b NEW-BRANCH-NAME`. Kasih nama yang logis
5. Commit changes di lokal dulu dengan `git commit -m "SHORT MESSAGE"`. Push ke remote `git push origin NEW-BRANCH-NAME`
6. Ke repo kamu di Github terus open PR
7. Lihat [issues](https://github.com/fajarnuha/kumlaude/issues) di Github jika ingin contribute code

more on [Pull Request](https://github.com/Roshanjossey/first-contributions)

<hr>

## Rewards
> Pahala insyaaAllah, karena ini termasuk amalan *ilmu yang bermanfaat* (setiap kali dibaca orang lain). Uang ga ada. However, maintainers dan top contributor akan ada di halaman [About](https://fajarnuha.github.io/kumlaude/about). Jadi berlomba-lombalah!
<hr>

## Content Style Guide
*masih on progress, jadi belum ada aturan aneh-aneh, yang penting website ini terisi dulu*

Supaya pull request kamu diterima, coba perhatikan hal berikut:

### File
1. Wajib kasih `title` di markdown 
2. Nama file adalah `index.md` kecuali di topic notes, which is sesuai notes yg ditulis, eg `binary-search.md`
3. Taruh gambar cover dengan kasih `cover` di frontmatter (optional, jika kosong gambar akan random)

contoh `index.md` di folder kalkulus-1 dengan cover
```
---
title: "Calculus 1"
cover: "http://dennydio.staf.akprind.ac.id/wp/wp-content/uploads/2017/09/images.png"
---
```

### Folder
1. Mewakili kategori yang bersangkutan.
2. Nama folder harus mengikuti skema `kebab-case`
<hr>

## Developer Guide
You are more than welcome to make this site better/prettier

In this repo, we learn:

- Gatsby JS
- JS Components
- GraphQL
- Markdown
- SCSS
- Git
- Travis CI
