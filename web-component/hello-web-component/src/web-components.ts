interface Todo {
  content: string;
}

customElements.define(
  "todo-list",
  class extends HTMLElement {
    constructor() {
      super();

      const todos: Todo[] = [
        {
          content: "My name is Ogu",
        },
        {
          content: "My name is Tokki",
        },
        {
          content: "My name is Ogu",
        },
        {
          content: "My name is Ogu",
        },
        {
          content: "My name is Ogu",
        },
      ];

      this.innerHTML = `
        <h2>Welcome Todolist</h2>
        ${todos
          .map((todo) => `<todo-item content="${todo.content}"></todo-item>`)
          .join("")}
      `;
    }
  }
);

customElements.define(
  "todo-item",
  class extends HTMLElement {
    constructor() {
      super();
      const content = this.getAttribute("content");
      //   console.log(this.attributes);
      this.innerHTML = `
        <p>${content}</p>
      `;
    }
  }
);

customElements.define(
  "test-element",
  class extends HTMLElement {
    constructor() {
      super();
      console.log(`hi?`);
      console.log(this.getAttributeNames());

      this.innerHTML = `
            <h2>TEST ELEMENT ${this.attributes}</h2>
        `;
    }
  }
);
