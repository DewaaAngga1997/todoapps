document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });
});

// arti kode di atas

// document.addEventListener("DOMContentLoaded", function () {...});:

// Ini adalah event listener untuk event DOMContentLoaded. Ini berarti kode di dalam fungsi akan dijalankan setelah seluruh dokumen HTML selesai dimuat.
// const submitForm = document.getElementById("form");:

// Mengambil elemen formulir dengan ID "form" dan menyimpannya dalam variabel submitForm.
// submitForm.addEventListener("submit", function (event) {...});:

// Menambahkan event listener untuk event "submit" pada formulir. Ketika formulir tersebut di-submit, fungsi yang diberikan sebagai argumen akan dijalankan.
// event.preventDefault(); digunakan untuk mencegah perilaku default dari event submit formulir, yang biasanya adalah pengiriman formulir dan pembaruan halaman.
// Setelah mencegah perilaku default, fungsi addTodo() dipanggil.

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timestamp,
    false
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

//arti dari kode di atas
// function addTodo() {...}:
// Ini adalah fungsi yang ditetapkan untuk menangani penambahan tugas (todo).
// Mengambil nilai dari dua elemen input dengan ID "title" dan "date" dan menyimpannya dalam variabel textTodo dan timestamp.
// Memanggil fungsi generateId() untuk membuat ID unik.
// Memanggil fungsi generateTodoObject() dengan parameter yang sesuai untuk membuat objek tugas (todoObject).
// Menambahkan objek tugas ke dalam array todos.
// Memicu event dengan nama "RENDER_EVENT" menggunakan document.dispatchEvent(new Event(RENDER_EVENT));.
// Ini  merujuk pada event khusus yang akan mengakibatkan pembaruan antarmuka pengguna untuk mencerminkan perubahan dalam daftar tugas (todos).

function generateId() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}

// Berikut adalah penjelasan kode diatas:
// Fungsi generateId() berfungsi untuk menghasilkan identitas unik pada setiap item todo.
// Untuk menghasilkan identitas yang unik, kita manfaatkan +new Date() untuk mendapatkan timestamp pada JavaScript.
// Fungsi generateTodoObject() berfungsi untuk membuat object baru dari data yang sudah disediakan dari inputan (parameter function),
//  diantaranya id, nama todo (task), waktu (timestamp), dan isCompleted (penanda todo apakah sudah selesai atau belum).

const todos = [];
const RENDER_EVENT = "render-todo";

// Berikut adalah penjelasan kode diatas.
// Variabel todos adalah sebuah variabel berisi array yang akan menampung beberapa object. Object ini berisikan data-data Todo user.
// Variabel RENDER_EVENT bertujuan untuk mendefinisikan Custom Event dengan nama 'render-todo'.
// Custom event ini digunakan sebagai patokan dasar ketika ada perubahan data pada variabel todos,
// seperti perpindahan todo (dari incomplete menjadi complete, dan sebaliknya), menambah todo, maupun menghapus todo.

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    }
  }
});

//arti kode diatas
// document.addEventListener(RENDER_EVENT, function () {...});:
// Ini menambahkan event listener untuk event dengan nama RENDER_EVENT. Ketika event ini dipicu, fungsi yang diberikan sebagai argumen akan dijalankan.
// const uncompletedTODOList = document.getElementById("todos");:

// Mengambil elemen HTML dengan ID "todos" dan menyimpannya dalam variabel uncompletedTODOList.
// uncompletedTODOList.innerHTML = "";:

// Mengosongkan (menghapus semua HTML di dalam) elemen dengan ID "todos". Ini dilakukan sebelum membangun kembali daftar tugas untuk menghindari duplikasi.
// for (const todoItem of todos) {...}:

// Mengiterasi melalui array todos yang mungkin berisi objek-objek tugas (todo).
// const todoElement = makeTodo(todoItem);:

// Memanggil fungsi makeTodo() dengan objek tugas (todoItem) sebagai argumen untuk membuat elemen HTML yang mewakili tugas tersebut. Hasilnya disimpan dalam variabel todoElement.
// if (!todoItem.isCompleted) {...}:

// Mengecek apakah tugas (todoItem) belum selesai (isCompleted: false).
// uncompletedTODOList.append(todoElement);:

// Jika tugas belum selesai, elemen HTML yang mewakili tugas tersebut (todoElement) ditambahkan ke dalam elemen dengan ID "todos". Ini berarti elemen daftar tugas yang belum selesai diperbarui.

function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  //berikut adalah arti dari code di atas
  // Mari kita kupas satu persatu beberapa kode di atas agar mendapatkan pemahaman secara menyeluruh.
  // Mulai dari document.createElement(). Method tersebut berfungsi untuk membuat objek DOM, yakni elemen HTML.
  // Sebagai contoh, jika Anda ingin membuat elemen Heading level-2 (seperti yang dicontoh di atas),
  // Anda bisa mengisi argumentnya dengan nama dari tag tersebut sehingga hasilnya menjadi document.createElement("h2").
  // Tipe argumen atau parameter yang diperlukan adalah string. Jika ingin membuat elemen lain seperti <div> dan sebagainya,
  // Anda dapat menyesuaikan nama tag yang dituju pada parameter tersebut.

  // Jika berhasil dibuat, elemen baru ini akan memiliki properti innerText.
  // Properti ini berfungsi untuk menyematkan konten berupa teks (tak berformat HTML) pada elemen HTML.
  // Jika kamu belum memahami apa fungsi dari innerText atau innerHTML

  // Kemudian jika dilihat secara desain,
  // teks yang berada di variabel textTimestamp dan textTitle merupakan konten atau child element dari <div> (variabel textContainer).
  // Untuk mencapai ini, kita bisa menggunakan method append() dari variabel textContainer (elemen container) tersebut.

  // Karena semua style sudah disediakan berdasarkan class-class selector tertentu pada CSS,
  // kita perlu menerapkan style tersebut secara dinamis dengan menggunakan DOM.
  // Salah satu cara yang bisa dilakukan adalah dengan menggunakan property classList,
  // yang mana kita bisa menambahkan satu atau beberapa class dengan menggunakan classList.add().

  // Kemudian, agar setiap todo item mudah di-track dan dikelola, kita perlu memberikan identitas (ID) unik pada setiap elemen todo tersebut.
  // Untuk menetapkan id pada elemen, kita bisa menggunakan setAttributes("id", "").
  // Agar elemen yang telah kita buat tadi bisa digunakan,
  // kita perlu mengembalikan hasilnya dengan menggunakan return statement.

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);

    //arti dari code diatas
    // Untuk beberapa implementasi kode seperti createElement, classList.add(), dan append() sudah kita bahas sebelumnya.
    // Intinya, beberapa kode tersebut membuat sebuah button dengan mengimplementasikan class check-button.
    // Class tersebut adalah sebuah selector CSS yang terdapat beberapa konfigurasi style di dalamnya.

    // Kemudian, agar tombol tersebut bisa diinteraksikan, kita perlu menerapkan event listener “click”,
    // dengan fungsi yang memanggil fungsi lain sesuai dengan konteks dari tombol tersebut.
    // Misalnya, pada tombol ini (checkButton) memanggil addTaskToCompleted, yang mana akan memindahkan todo dari rak “Yang harus dilakukan” ke rak “Yang sudah dilakukan”.

    // Tombol lain, seperti undoButton & trashButton, juga menerapkan hal yang sama, di mana memanggil fungsi undoTaskFromCompleted dan removeTaskFromCompleted.
    // Yang mana masing - masing akan memindahkan todo dari selesai ke belum selesai, dan menghapus todo.
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  //arti kode diatas
  // else {: Ini menandakan bahwa blok kode di dalamnya akan dieksekusi jika kondisi yang terkait dengannya di blok if sebelumnya tidak terpenuhi.
  // Dengan kata lain, ini adalah bagian dari struktur pengendalian alur seperti if-else.

  // const checkButton = document.createElement("button");:
  // Membuat elemen button baru menggunakan document.createElement("button") dan menyimpannya dalam variabel checkButton.

  // checkButton.classList.add("check-button");:
  // Menambahkan kelas CSS "check-button" ke elemen button yang baru dibuat. Kebanyakan waktu,
  // ini digunakan untuk memanipulasi tampilan dan gaya elemen dengan menggunakan aturan CSS yang telah ditentukan untuk kelas tersebut.

  // checkButton.addEventListener("click", function () {...});:
  // Menambahkan event listener pada elemen button untuk event "click".
  // Artinya, ketika tombol ini diklik, fungsi yang didefinisikan di dalamnya akan dijalankan.

  // addTaskToCompleted(todoObject.id);:
  // Fungsi yang dipanggil saat tombol "check" diklik. Dengan menggunakan todoObject.id sebagai argumen,
  // tampaknya ini berfungsi untuk menandai tugas (todo) sebagai selesai atau memindahkannya ke daftar tugas yang telah selesai.

  // container.append(checkButton);: Menambahkan elemen button ke dalam elemen yang disebut container.
  // Ini diasumsikan bahwa sebelumnya ada suatu variabel atau elemen yang disebut container di dalam scope yang sama.
  // Menempatkan tombol check ini ke dalam container merupakan cara untuk menambahkan kontrol tombol ke dalam struktur tampilan yang sesuai.

  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
  }

  function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  return container;
}
