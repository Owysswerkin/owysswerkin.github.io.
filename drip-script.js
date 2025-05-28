// Load saved tasks on page load
document.addEventListener("DOMContentLoaded", function () {
  loadSavedTasks("replacement");
  loadSavedTasks("delegation");
  loadSavedTasks("production");
  loadSavedTasks("investment");
});

// Add a new task
function addTask(category) {
  const inputField = document.getElementById(`${category}-input`);
  const taskText = inputField.value.trim();

  if (taskText) {
    // Get existing tasks or initialize empty array
    let tasks = JSON.parse(localStorage.getItem(`${category}Tasks`) || "[]");

    // Add new task
    tasks.push(taskText);

    // Save to localStorage
    localStorage.setItem(`${category}Tasks`, JSON.stringify(tasks));

    // Clear input field
    inputField.value = "";

    // Refresh the displayed tasks
    loadSavedTasks(category);
  }
}

// Delete a task
function deleteTask(category, index) {
  // Get current tasks
  let tasks = JSON.parse(localStorage.getItem(`${category}Tasks`) || "[]");

  // Remove the task at the specified index
  tasks.splice(index, 1);

  // Save updated tasks
  localStorage.setItem(`${category}Tasks`, JSON.stringify(tasks));

  // Refresh the displayed tasks
  loadSavedTasks(category);
}

// Load and display saved tasks
function loadSavedTasks(category) {
  const taskList = document.getElementById(`${category}-tasks`);
  const tasks = JSON.parse(localStorage.getItem(`${category}Tasks`) || "[]");

  // Clear current tasks
  taskList.innerHTML = "";

  // Add each task to the list
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "×";
    deleteButton.onclick = function () {
      deleteTask(category, index);
    };

    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// Show preview modal
function showPreview() {
  const modal = document.getElementById("previewModal");
  modal.style.display = "flex";
  updatePreview();
}

// Close preview modal
function closePreview() {
  const modal = document.getElementById("previewModal");
  modal.style.display = "none";
}

// Store current settings for PDF generation
let currentViewFormat = "list";

// Update preview based on selected options
function updatePreview() {
  const viewFormat = document.querySelector(
    'input[name="viewFormat"]:checked'
  ).value;

  // Store current settings
  currentViewFormat = viewFormat;

  const previewContent = document.getElementById("previewContent");

  // Generate content based on view format
  if (viewFormat === "list") {
    generateListView(previewContent);
  } else {
    generateMatrixView(previewContent);
  }
}

// Generate list view
function generateListView(container) {
  const categories = [
    {
      id: "replacement",
      title: "Replacement Tasks",
      description:
        "Tasks that generate income but don't energize you. Best delegated or outsourced to free up time.",
    },
    {
      id: "investment",
      title: "Investment Tasks",
      description:
        "Tasks that both energize and make you money. This is your genius zone—spend most of your time here.",
    },
    {
      id: "delegation",
      title: "Delegation Tasks",
      description:
        "Tasks that don't energize you but make money. Key to scaling efficiently.",
    },
    {
      id: "production",
      title: "Production Tasks",
      description:
        "Tasks that energize you but don't bring direct income. Important for your mental well-being.",
    },
  ];

  // Create list view content
  container.innerHTML = `
        <div class="list-view">
          <h1 style="text-align: center; margin-bottom: 10px;">DRIP Matrix</h1>
          <p style="text-align: center; margin-top: 0; margin-bottom: 30px; color: #555;">
            Your tasks organized by priority quadrants
          </p>
          
          ${categories
            .map((category) => {
              const tasks = JSON.parse(
                localStorage.getItem(`${category.id}Tasks`) || "[]"
              );

              return `
              <div class="section">
                <h2>${category.title}</h2>
                <p class="description">${category.description}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Task</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${
                      tasks.length > 0
                        ? tasks
                            .map((task) => `<tr><td>${task}</td></tr>`)
                            .join("")
                        : '<tr><td style="font-style: italic; color: #777;">No tasks added yet</td></tr>'
                    }
                  </tbody>
                </table>
              </div>
            `;
            })
            .join("")}
          
          <div style="font-size:12px;">This tool is independently developed and not affiliated with Dan Martell.
Learn more and support the original work at buybackyourtime.com</div>
        </div>
      `;
}

// Generate matrix view
function generateMatrixView(container) {
  const replacementTasks = JSON.parse(
    localStorage.getItem("replacementTasks") || "[]"
  );
  const investmentTasks = JSON.parse(
    localStorage.getItem("investmentTasks") || "[]"
  );
  const delegationTasks = JSON.parse(
    localStorage.getItem("delegationTasks") || "[]"
  );
  const productionTasks = JSON.parse(
    localStorage.getItem("productionTasks") || "[]"
  );

  // Create completely redesigned matrix view
  container.innerHTML = `
        <div style="width: 100%;">
          <h1 style="text-align: center; margin-bottom: 10px;">DRIP Matrix</h1>
          <p style="text-align: center; margin-top: 0; margin-bottom: 20px; color: #555;">
            Your tasks organized by priority quadrants
          </p>
          
          <div style="position: relative; width: 100%; height: 600px;">
            <!-- Vertical Axis Label -->
            <div style="position: absolute; left: 10px; top: 50%; transform: rotate(-90deg) translateX(-50%); transform-origin: left center; font-weight: bold;">
              Makes You Money
            </div>
                        
            <!-- Horizontal Axis Label -->
            <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-weight: bold;">
              Makes You Happy
            </div>
            
            <!-- Matrix Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; position: absolute; top: 30px; left: 50px; right: 30px; bottom: 50px; border: 1px solid #ddd;">
              <!-- Replacement - Top Left -->
              <div style="border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 15px; overflow-y: auto;">
                <h3 style="margin-top: 0; margin-bottom: 10px;">Replacement</h3>
                <ul style="padding-left: 20px; margin: 0;">
                  ${
                    replacementTasks.length > 0
                      ? replacementTasks
                          .map((task) => `<li>${task}</li>`)
                          .join("")
                      : '<li style="font-style: italic; color: #777;">No tasks added yet</li>'
                  }
                </ul>
              </div>
              
              <!-- Investment - Top Right -->
              <div style="border-left: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 15px; overflow-y: auto;">
                <h3 style="margin-top: 0; margin-bottom: 10px;">Investment</h3>
                <ul style="padding-left: 20px; margin: 0;">
                  ${
                    investmentTasks.length > 0
                      ? investmentTasks
                          .map((task) => `<li>${task}</li>`)
                          .join("")
                      : '<li style="font-style: italic; color: #777;">No tasks added yet</li>'
                  }
                </ul>
              </div>
              
              <!-- Delegation - Bottom Left -->
              <div style="border-right: 1px solid #ddd; border-top: 1px solid #ddd; padding: 15px; overflow-y: auto;">
                <h3 style="margin-top: 0; margin-bottom: 10px;">Delegation</h3>
                <ul style="padding-left: 20px; margin: 0;">
                  ${
                    delegationTasks.length > 0
                      ? delegationTasks
                          .map((task) => `<li>${task}</li>`)
                          .join("")
                      : '<li style="font-style: italic; color: #777;">No tasks added yet</li>'
                  }
                </ul>
              </div>
              
              <!-- Production - Bottom Right -->
              <div style="border-left: 1px solid #ddd; border-top: 1px solid #ddd; padding: 15px; overflow-y: auto;">
                <h3 style="margin-top: 0; margin-bottom: 10px;">Production</h3>
                <ul style="padding-left: 20px; margin: 0;">
                  ${
                    productionTasks.length > 0
                      ? productionTasks
                          .map((task) => `<li>${task}</li>`)
                          .join("")
                      : '<li style="font-style: italic; color: #777;">No tasks added yet</li>'
                  }
                </ul>
              </div>
            </div>
          </div>
          
          <div style="text-align: right; font-size: 0.8rem; color: #777; margin-top: 10px; padding-right: 10px;">
            This tool is independently developed and not affiliated with Dan Martell.
Learn more and support the original work at buybackyourtime.com
          </div>
        </div>
      `;
}

// Print the PDF with proper handling
function printPDF() {
  // Get the printable container
  const printableContent = document.getElementById("printable-content");

  // Copy current view to printable area with current settings
  if (currentViewFormat === "list") {
    generateListView(printableContent);
  } else {
    generateMatrixView(printableContent);
  }

  // Delay slightly to ensure content is populated
  setTimeout(() => {
    window.print();
  }, 100);
}

// Tooltip functionality for mobile
if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
  document.querySelectorAll(".tooltip-container").forEach((container) => {
    container.addEventListener("click", function (e) {
      e.stopPropagation();
      const tooltip = container.querySelector(".tooltip-text");
      tooltip.classList.toggle("show");
      setTimeout(() => {
        tooltip.classList.remove("show");
      }, 3000);
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".tooltip-text.show").forEach((t) => {
      t.classList.remove("show");
    });
  });
}

// Allow adding tasks by pressing Enter
document.querySelectorAll(".task-input").forEach((input) => {
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const category = this.id.split("-")[0];
      addTask(category);
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      item.classList.toggle("active");
    });
  });
});
