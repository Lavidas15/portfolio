const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

let todos = [];

create_btn_el.addEventListener('click', CreateNewTodo);


function CreateNewTodo () {
	const item = {
		id: new Date().getTime(),
		text: "",
		complete: false
	}
    // coming first in my list
	todos.unshift(item);

    // create a function for new items in list
	const { item_el, input_el } = CreateTodoElement(item);

	list_el.prepend(item_el);

	input_el.removeAttribute("disabled");
	input_el.focus();

	Save();
}
// Form for the list [ item - checkbox - disable/enable - actions - icons]
function CreateTodoElement(item) {
	const item_el = document.createElement("div");
	item_el.classList.add("item");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = item.complete;

	if (item.complete) {
		item_el.classList.add("complete");
	}

	const input_el = document.createElement("input");
	input_el.type = "text";
	input_el.value = item.text;
	input_el.setAttribute("disabled", "");

	const actions_el = document.createElement("div");
	actions_el.classList.add("actions");

	const edit_btn_el = document.createElement("button");
	edit_btn_el.classList.add("material-icons");
	edit_btn_el.innerText = "edit";

	const remove_btn_el = document.createElement("button");
	remove_btn_el.classList.add("material-icons", "remove-btn");
	remove_btn_el.innerText = "remove_circle";

	actions_el.append(edit_btn_el);
	actions_el.append(remove_btn_el);

	item_el.append(checkbox);
	item_el.append(input_el);
	item_el.append(actions_el);

	// EVENTS check - uncheck the box from the list
	checkbox.addEventListener("change", () => {
		item.complete = checkbox.checked;

		if (item.complete) {
			item_el.classList.add("complete");
		} else {
			item_el.classList.remove("complete");
		}

		Save();
	});

	input_el.addEventListener("input", () => {
		item.text = input_el.value;
	});

	input_el.addEventListener("blur", () => {
		input_el.setAttribute("disabled", "");
		Save();
	});

	edit_btn_el.addEventListener("click", () => {
		input_el.removeAttribute("disabled");
		input_el.focus();
	});
    // removing an item from the list with specific ID,if you delete one item change all the IDs so we have again specific ID

	remove_btn_el.addEventListener("click", () => {
		todos = todos.filter(t => t.id != item.id);

		item_el.remove();

		Save();
	});

	return { item_el, input_el, edit_btn_el, remove_btn_el }
}

// Normally I stop here and we could say thats done but,we would like to save in localstorage our todos



// Here all the items stay in the list and I can edit them
function DisplayTodos() {
	Load();

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];

		const { item_el } = CreateTodoElement(item);

		list_el.append(item_el);
	}
}

DisplayTodos();

function Save() {
	const save = JSON.stringify(todos);
	
	localStorage.setItem("my_todos", save);
}

function Load() {
	const data = localStorage.getItem("my_todos");

	if (data) {
		todos = JSON.parse(data);
	}
}