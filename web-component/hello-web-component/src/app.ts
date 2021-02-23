const message = "hi";

interface Schema {}

interface User extends Schema {
  name: string;
}

interface Post extends Schema {
  content: string;
}

interface SchemaTypes {
  user: User;
  post: Post;
}
type CollectionName = keyof SchemaTypes;

interface Collection {
  <K extends keyof SchemaTypes>(collectionName: K): SchemaTypes[K];
}

const collection: Collection = (collectionName)=>{
    switch (collectionName){
        case "post":
            return {
                content : "hi"
            }
        case "user" :
            return {
                name : "kim"
            }
        default :
            throw 'damn'
    }
}
//  (collectionName) => {
//   switch (collectionName) {
//     case "post":
//       return {
//         content: "hi",
//       };
//     case "user":
//       return {
//         name: "string",
//       };
//   }
};
const userCollection = collection("user");

const div = document.createElement("div");
