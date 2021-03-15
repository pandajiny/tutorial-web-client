interface User {
  id: number;
  name: string;
  email: string;
}

function createUsersCollection(db: IDBDatabase) {
  const store = db.createObjectStore("users", { keyPath: "id" });
  store.createIndex("email", "email");
  store.createIndex("name", "name");
}

const $inputName: HTMLInputElement = document.querySelector(".name");
const $inputEmail: HTMLInputElement = document.querySelector(".email");
const $buttonSubmit: HTMLButtonElement = document.querySelector(".submit");

$buttonSubmit.onclick = () => {
  const user: User = {
    id: Math.random(),
    name: $inputName.value,
    email: $inputEmail.value,
  };

  addUser(user);
};

const dbInstance = async (): Promise<IDBDatabase> => {
  return new Promise((res) => {
    const idbRequest = window.indexedDB.open("db");
    idbRequest.onsuccess = () => {
      console.log(`success`);
      res(idbRequest.result);
    };
    idbRequest.onupgradeneeded = () => {
      console.log(`upgrade db`);
      createUsersCollection(idbRequest.result);
    };
    idbRequest.onerror = () => {
      throw `Cannot get instance of IDB`;
    };
  });
};

const storeUsers = async () => {
  const db = await dbInstance();
  return db.transaction("users", "readwrite").objectStore("users");
};

async function addUser(user: User) {
  const store = await storeUsers();
  store.add(user);
}

// dbInstance.onupgradeneeded = (ev) => {
//   console.log("upgrade db");
//   const db = dbInstance.result;
//   const store = db.createObjectStore("users", { keyPath: "id" });
//   store.createIndex("email", "email");
//   store.createIndex("name", "name");
//   store.transaction.oncomplete = () => {
//     const storeUsers = db
//       .transaction("users", "readwrite")
//       .objectStore("users");
//     users.forEach((user) => {
//       storeUsers.add(user);
//     });
//   };
// };

// dbInstance.onsuccess = (ev) => {
//   //   const db = instance.result;
//   //   const store = db.transaction("users", "readwrite").objectStore("users");
//   //   const request = store.add(users[0]);
//   //   request.onsuccess = () => {
//   //     console.log(`ogu has added`);
//   //   };
// };

// add();
// async function add() {
//   const instance = window.indexedDB.open("db");
//   instance.onsuccess = (ev) => {
//     const db = ev.target.result;
//     // console.log(db);
//     console.log(db.transaction);
//     const store = db.transaction.objectStore("users");
//     users.forEach((user) => {
//       const request = store.add(user);
//       request.onsuccess = (ev) => {
//         console.log(ev);
//       };
//     });
//   };
//   console.log(instance.transaction);
// }
