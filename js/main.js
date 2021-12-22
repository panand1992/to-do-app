const addTaskBtn = document.getElementById("addTaskBtn");
const editTaskBtn = document.getElementById("editTaskBtn");
const taskListWrapper = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterTaskType1 = document.getElementById("filterTaskType1");
const filterTaskType2 = document.getElementById("filterTaskType2");
const filterTaskType3 = document.getElementById("filterTaskType3");
const taskList = [];
let currentEditTask = 0;

addTaskBtn.onclick = function () {
	const taskDescription = document.getElementById("addTaskDescription");
	const taskType = document.getElementById("addTaskType");
	const newTask = {
		description: taskDescription.value,
		type: taskType.value
	}

	taskList[taskList.length] = newTask;
	taskDescription.value = "Add Description";
	taskType.selectedIndex = 0;
	renderTaskList();
}

editTaskBtn.onclick = function () {
	const taskDescription = document.getElementById("editTaskDescription");
	const taskType = document.getElementById("editTaskType");

	taskList[currentEditTask].description = taskDescription.value;
	taskList[currentEditTask].type = taskType.value;
	renderTaskList();
}

function renderTaskList() {
	let taskListHtml = "";
	if (searchInput.value) {
		let filteredArray = [...taskList];
		let newFilteredArray = filteredArray.filter(item => item.description.match(new RegExp(searchInput.value, "i")));
		let typefilteredTask = getTypefilter(newFilteredArray);
		for (let i = 0; i < typefilteredTask.length; i++) {
			taskListHtml += renderTaskRow(typefilteredTask[i], i);
		}
	} else {
		let typefilteredTask = getTypefilter(taskList);
		for (let i = 0; i < typefilteredTask.length; i++) {
			taskListHtml += renderTaskRow(typefilteredTask[i], i);
		}
	}
	taskListWrapper.innerHTML = taskListHtml;
}

function renderTaskRow(task, i) {
	return `<tr id="task-${i}">
    <th scope="row">${i + 1}</th>
    <td>${task.description}</td>
    <td>${task.type}</td>
    <td>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#editTaskModal" onclick="openEditForm(${i})">
            Edit
        </button>
        <button type="button" class="btn btn-danger" onclick="deleteTask(${i})">Delete</button>
    </td>
</tr>`
}

function openEditForm(i) {
	currentEditTask = i;
	document.getElementById("editTaskDescription").value = taskList[i].description;
	document.getElementById("editTaskType").value = taskList[i].type;
}

function deleteTask(i) {
	taskList.splice(i, 1);
	renderTaskList();
}

searchInput.addEventListener('keyup', function () {
	renderTaskList();
});

function getTypefilter(val) {
	let filteredArray = [];
	if (filterTaskType1.checked && filterTaskType2.checked && filterTaskType3.checked) {
		return val;
	} else if (filterTaskType1.checked && filterTaskType2.checked) {
		for(let i = 0; i < val.length; i++) {
			if (val[i].type == 1 || val[i].type == 2) {
				filteredArray[filteredArray.length] = val[i];
			}
		}
		return filteredArray;
	} else if (filterTaskType2.checked && filterTaskType3.checked) {
		for(let i = 0; i < val.length; i++) {
			if (val[i].type == 2 || val[i].type == 3) {
				filteredArray[filteredArray.length] = val[i];
			}
		}
		return filteredArray;
	} else if (filterTaskType1.checked && filterTaskType3.checked) {
		for(let i = 0; i < val.length; i++) {
			if (val[i].type == 1 || val[i].type == 3) {
				filteredArray[filteredArray.length] = val[i];
			}
		}
		return filteredArray;
	} else if (filterTaskType1.checked) {
		for(let i = 0; i < val.length; i++) {
			if (val[i].type == 1) {
				filteredArray[filteredArray.length] = val[i];
			}
		}
		return filteredArray;
	} else if (filterTaskType2.checked) {
		for(let i = 0; i < val.length; i++) {
			if (val[i].type == 2) {
				filteredArray[filteredArray.length] = val[i];
			}
		}
		return filteredArray;
	} else if (filterTaskType3.checked) {
		for(let i = 0; i < val.length; i++) {
			if (val[i].type == 1) {
				filteredArray[filteredArray.length] = val[i];
			}
		}
		return filteredArray;
	} else {
		return val;
	}
}

