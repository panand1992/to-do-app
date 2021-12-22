const addTaskBtn = document.getElementById("addTaskBtn");
const editTaskBtn = document.getElementById("editTaskBtn");
const taskListWrapper = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterTaskType1 = document.getElementById("filterTaskType1");
const filterTaskType2 = document.getElementById("filterTaskType2");
const filterTaskType3 = document.getElementById("filterTaskType3");

addTaskBtn.onclick = function () {
	const taskDescription = document.getElementById("addTaskDescription");
	const taskType = document.getElementById("addTaskType");

	const rowEl = document.createElement("TR");
	rowEl.id = "task-" + taskListWrapper.children.length;
	rowEl.innerHTML = '<th scope="row">' + taskListWrapper.children.length + '</th>'
    	+ '<td>' + taskDescription.value + '</td>'
    	+ '<td>' + taskType.value + '</td>'
    	+ '<td>'
        	+ '<button type="button" class="btn btn-primary me-2" data-bs-toggle="modal"'
            + 'data-bs-target="#editTaskModal" onclick="openEditForm(' + taskListWrapper.children.length + ')">'
            + 'Edit'
        	+ '</button>'
        	+ '<button type="button" class="btn btn-danger" onclick="deleteTask(' + taskListWrapper.children.length + ')">Delete</button>'
    	+ '</td>';

	taskListWrapper.appendChild(rowEl);

	taskDescription.value = "Add Description";
	taskType.selectedIndex = 0;
}

editTaskBtn.onclick = function () {
	const taskDescription = document.getElementById("editTaskDescription");
	const taskType = document.getElementById("editTaskType");
	taskListWrapper.children[currentEditTask].children[1].textContent = taskDescription.value;
	taskListWrapper.children[currentEditTask].children[2].textContent = taskType.value;
}

function renderTaskList() {
	if (searchInput.value) {
		renderFilteredTasks();
	} else {
		if (filterTaskType1.checked || filterTaskType2.checked || filterTaskType3.checked) { 
			renderFilteredTasks();
		} else {
			for (let i = 0; i < taskListWrapper.children.length; i++) {
				taskListWrapper.children[i].style.display = 'table-row';
			}
		}
	}
}

function openEditForm(i) {
	currentEditTask = i;
	document.getElementById("editTaskDescription").value = taskListWrapper.children[i].children[1].textContent;
	document.getElementById("editTaskType").value = taskListWrapper.children[i].children[2].textContent;
}

function deleteTask(i) {
	taskListWrapper.removeChild(taskListWrapper.children[i]);
}

searchInput.addEventListener('keyup', function () {
	renderTaskList();
});

function renderFilteredTasks() {
	const taskC = taskListWrapper.children;
	if (filterTaskType1.checked && filterTaskType2.checked && filterTaskType3.checked) {
		for (let i = 0; i < taskC.length; i++) {
			if (taskC[i].children[1].textContent.search(searchInput.value) > -1) {
				taskC[i].style.display = 'table-row';
			} else {
				taskC[i].style.display = 'none';
			}
		}
	} else if (filterTaskType1.checked && filterTaskType2.checked) {
		for (let i = 0; i < taskC.length; i++) {
			if (filterTaskType1.value == taskC[i].children[2].textContent
				|| filterTaskType2.value == taskC[i].children[2].textContent && (searchInput
					&& taskC[i].children[1].textContent.search(searchInput.value) > -1)) {
				taskC[i].style.display = 'table-row';
			} else {
				taskC[i].style.display = 'none';
			}
		}
	} else if (filterTaskType2.checked && filterTaskType3.checked) {
		for (let i = 0; i < taskC.length; i++) {
			if (filterTaskType2.value == taskC[i].children[2].textContent
				|| filterTaskType3.value == taskC[i].children[2].textContent && (searchInput
					&& taskC[i].children[1].textContent.search(searchInput.value) > -1)) {
				taskC[i].style.display = 'table-row';
			} else {
				taskC[i].style.display = 'none';
			}
		}
	} else if (filterTaskType1.checked && filterTaskType3.checked) {
		for (let i = 0; i < taskC.length; i++) {
			if (filterTaskType1.value == taskC[i].children[2].textContent
				|| filterTaskType3.value == taskC[i].children[2].textContent && (searchInput
					&& taskC[i].children[1].textContent.search(searchInput.value) > -1)) {
				taskC[i].style.display = 'table-row';
			} else {
				taskC[i].style.display = 'none';
			}
		}
	} else if (filterTaskType1.checked) {
		for (let i = 0; i < taskC.length; i++) {
			if (filterTaskType1.value == taskC[i].children[2].textContent && (searchInput
				&& taskC[i].children[1].textContent.search(searchInput.value) > -1)) {
				taskC[i].style.display = 'table-row';
			} else {
				taskC[i].style.display = 'none';
			}
		}
	} else if (filterTaskType2.checked) {
		for (let i = 0; i < taskC.length; i++) {
			if (filterTaskType2.value == taskC[i].children[2].textContent && (searchInput
				&& taskC[i].children[1].textContent.search(searchInput.value) > -1)) {
				taskC[i].style.display = 'table-row';
			} else {
				taskC[i].style.display = 'none';
			}
		}
	} else if (filterTaskType3.checked) {
		for (let i = 0; i < taskChildren.length; i++) {
			if (filterTaskType3.value == taskC[i].children[2].textContent && (searchInput
				&& taskC[i].children[1].textContent.search(searchInput.value) > -1)) {
				taskC[i].style.display = 'table-row';
			} else {
				taskC[i].style.display = 'none';
			}
		}
	} else {
		if(searchInput) {
			for (let i = 0; i < taskListWrapper.children.length; i++) {
				if(taskC[i].children[1].textContent.search(searchInput.value) > -1) {
					taskC[i].style.display = 'table-row';
				} else {
					taskC[i].style.display = 'none';
				}
			}
		} else {
			for (let i = 0; i < taskC.length; i++) {
				taskChildren[i].style.display = 'table-row';
			}
		}
	}
}

