let taskNameInput = document.querySelector("#task-name-input");
        let addTaskButton = document.querySelector("#add-task-btn");
        let startMessage = document.querySelector("#start-message");
        let taskList = document.querySelector(".task-list");

        addTaskButton.addEventListener("click", addTaskHandler);
        taskNameInput.addEventListener("keydown", function (e) {
            if (e.code == "Enter") addTaskHandler();
        })

        function createTask(text) {
            let div = document.createElement("div");
            div.classList.add("task");

            let input = document.createElement("input");
            input.addEventListener("click", changeTaskState);
            input.type = "checkbox";

            let p = document.createElement("p");
            p.innerText = text;

            let redBtn = document.createElement("button");
            redBtn.addEventListener("click", redTask);
            redBtn.classList.add("red-btn");
            redBtn.textContent = "Редагувати";

            let delBtn = document.createElement("button");
            delBtn.addEventListener("click", delTask);
            delBtn.classList.add("del-btn");
            delBtn.textContent = "Видалити";
            
            div.append(input);
            div.append(p);
            div.append(redBtn);
            div.append(delBtn);
            
            return div;
        }

        
        function redTask() {
            let taskText = this.parentElement.querySelector("p");
            let taskTextInput = document.createElement("input");
            taskTextInput.type = "text";
            taskTextInput.value = taskText.innerText;

            let saveBtn = document.createElement("button");
            saveBtn.textContent = "Сохранить";
            saveBtn.addEventListener("click", saveTask);

    taskTextInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            if (document.activeElement === taskTextInput) {
                saveTask();
                e.preventDefault();
            }
        }
    });

    function saveTask() {
        taskText.innerText = taskTextInput.value;
        taskText.style.display = "inline";
        this.parentElement.removeChild(taskTextInput);
        this.parentElement.removeChild(saveBtn);
    }
            taskText.style.display = "none";
            this.parentElement.insertBefore(taskTextInput, taskText);
            this.parentElement.insertBefore(saveBtn, taskText);
            
            taskTextInput.focus();

            taskTextInput.addEventListener("blur", function() {
            saveTask();
            });
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
        
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                displayCurrency(response);
            }
        };
        xhr.send();

        function displayCurrency(data) {
            let currencySelector = document.getElementById('currencySelector');
            let selectedCurrency = currencySelector.value;

            let currencyDiv = document.getElementById('currency');
            let html = '<p>Курс ' + selectedCurrency + ':</p>';
            for (let i = 0; i < data.length; i++) {
                if (data[i].cc === selectedCurrency) {
                    html += '<p>' + data[i].rate + ' грн' + '</p>';
                    break;
                }
            }
            currencyDiv.innerHTML = html;
        }

        document.getElementById('currencySelector').addEventListener('change', function() {
            displayCurrency(JSON.parse(xhr.responseText));
        });