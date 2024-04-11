let taskNameInput = document.querySelector("#task-name-input");
        let addTaskButton = document.querySelector("#add-task-btn");
        let startMessage = document.querySelector("#start-message");
        let taskList = document.querySelector(".task-list");

        addTaskButton.addEventListener("click", addTaskHandler);
        

        function createTask(text) {
            let div = document.createElement("div");
            div.classList.add("task");

            let input = document.createElement("input");
            input.addEventListener("click", changeTaskState);
            input.type = "checkbox";

            let p = document.createElement("p");
            p.innerText = text;

            let delBtn = document.createElement("button");
            delBtn.addEventListener("click", delTask);
            delBtn.classList.add("del-btn");
            delBtn.textContent = "Видалити";
            
            div.append(input);
            div.append(p);
            div.append(delBtn);
            
            return div;
        }
        
        function delTask(){
            this.parentElement.remove();
        }

        function changeTaskState() {
            if (this.checked) {
                this.parentElement.classList.add("completed");
            } else { 
                this.parentElement.classList.remove("completed");
            }
        }

        function addTaskHandler() {
            if (taskNameInput.value) {
                if (!startMessage.hidden) startMessage.hidden = true;

                let newTask = createTask(taskNameInput.value);
                taskList.append(newTask);
                taskNameInput.value = "";
                
            } else { 
                alert("введіть ім'я завдання");
            }
        }