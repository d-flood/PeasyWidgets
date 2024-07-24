// check that input value matches one of the available options
function validateInput(input, ulElem) {
    // don't validate multi inputs
    if (input.classList.contains("choice-filter-multi")) {
        return;
    }
    let liElems = ulElem.getElementsByTagName("li");
    let filter = input.value.trim().toLowerCase();
    for (let liElem of liElems) {
        let button = liElem.getElementsByTagName("button")[0];
        let txtValue = button.textContent.trim().toLowerCase();
        if (txtValue === filter) {
            document.getElementById(`${input.dataset.name}_errors`).innerHTML = "";
            input.classList.add("valid");
            return;
        }
    }
    document.getElementById(`${input.dataset.name}_errors`).innerHTML =
        "That option does not exist";
    document.getElementById(`${input.dataset.name}_hidden_input`).value = "";
    input.classList.remove("valid");
}

function sendFocusForward(currentElem) {
    let focusableElems = Array.from(
        document.querySelectorAll(
            "div.admin-container a, div.admin-container button:not(.filter-widget), div.admin-container input, div.admin-container select, div.admin-container textarea, div.admin-container [tabindex]:not([tabindex='-1'])"
        )
    );
    // restrict focusable elements to those that are visible
    focusableElems = focusableElems.filter(
        (elem) => elem === currentElem || elem.offsetParent !== null
    );
    let currentIndex = focusableElems.indexOf(currentElem);
    // If the current element is not found, or it's the last element, focus the first element
    if (currentIndex === -1 || currentIndex === focusableElems.length - 1) {
        focusableElems[0].focus();
    } else {
        // focus the next element
        focusableElems[currentIndex + 1].focus();
    }
}

function sendFocusBack(currentElem) {
    let focusableElems = Array.from(
        document.querySelectorAll(
            "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
        )
    );
    let currentIndex = focusableElems.indexOf(currentElem);
    if (currentIndex === -1 || currentIndex === 0) {
        focusableElems[focusableElems.length - 1].focus();
    } else {
        focusableElems[currentIndex - 1].focus();
    }
}

function choiceFilterRemoveItem(elem) {
    let li = elem.parentElement;
    if (li.nextElementSibling) {
        li.nextElementSibling.firstElementChild.focus();
    } else if (li.previousElementSibling) {
        li.previousElementSibling.firstElementChild.focus();
    }
    li.parentElement.removeChild(li);
}

// ###############################################################################
// DataList Functions

function datalistFilterAdd(button, event) {
    let datalist = document.getElementById(button.dataset.datalistid);
    let input = document.getElementById(button.dataset.inputid);
    let name = button.dataset.name;
    let targetUl = document.getElementById(button.dataset.targetul);
    let single = button.dataset.single === 'true';
    let success = false;
    if (input.value.includes(",") && event.ctrlKey) {
        // try to add multiple items
        let inputValues = input.value.split(",");
        for (let inputValue of inputValues) {
            success = datalistAddSingleItem(targetUl, inputValue.trim(), datalist, name, single);
            if (!success) {
                break;
            }
        }
    } else {
        // add single item
        success = datalistAddSingleItem(targetUl, input.value, datalist, name, single);
    }
    if (success) {
        input.value = "";
    }
}
function datalistAddSingleItem(targetUl, inputValue, datalist, name, single) {
    // Check if item already exists
    for (let item of targetUl.getElementsByTagName("input")) {
        if (item.value === inputValue) {
            document.getElementById(`${name}_errors`).innerHTML =
                `${inputValue}" is already added`;
            return;
        }
    }
    // Check if item exists in datalist
    if (!datalist.querySelector(`option[value='${inputValue}']`)) {
        document.getElementById(`${name}_errors`).innerHTML =
            `${inputValue}" is not a valid option`;
        return;
    }
    // get the value from the corresponding datalist.option's data-value attribute
    let value = datalist.querySelector(`option[value='${inputValue}']`).dataset.value;
    let newItem = `
      <li class="peasy-flex-row">
          <input class="peasy-datalist-selected" type="text" value="${inputValue}" readonly>
          <input type="hidden" name="${name}" value="${value}">
          <button type="button" class="peasy-datalist-rm-btn peasy-red" title="Remove ${inputValue}"
              onclick="choiceFilterRemoveItem(this)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
          </button>
      </li>`;
    if (single) {
        targetUl.innerHTML = newItem;
    } else {
        targetUl.innerHTML += newItem;
    }
    // clear errors
    document.getElementById(`${name}_errors`).innerHTML = "";
    // focus the created input
    targetUl.lastElementChild.firstElementChild.focus();
    return true;
}