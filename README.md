# PeasyWidgets

[![PyPI - Version](https://img.shields.io/pypi/v/peasywidgets.svg)](https://pypi.org/project/peasywidgets)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/peasywidgets.svg)](https://pypi.org/project/peasywidgets)

-----

**Table of Contents**

- [Installation](#installation)
- [License](#license)
- [Styling](#styling)

## Installation

```console
pip install peasywidgets
```

1. Add `peasywidgets` to Django `INSTALLED_APPS`
2. Import the desired widgets 
```Python
from peasywidgets.datalist_widgets import DatalistMultiple, DatalistSingle
from peasywidgets.filter_widgets import ChoiceFilterMultiple, ChoiceFilterSingle
```
3. Run `collectstatic` and include the JavaScript in templates `{%  static 'peasywidgets.js' %}` and _optionally_ the CSS `{% static peasywidgets.css %}`

## Styling

The following default CSS is available to use with Django's `static` template tag, otherwise use these selectors to write custom CSS/Tailwind directives.

```CSS
/* peasywidgets.css */

p.choice-filter-errors {
    color: red;
}

.choice-filter-multi-container {
    border: 1px solid #ced4da;
    border-radius: .25rem;
    padding: 0.5rem;
}

.choice-filter-flex-row {
    display: flex;
    flex-direction: row;
    max-width: 100%;
}
.choice-filter-flex-col {
    display: flex;
    flex-direction: column;
}

.choice-filter-red {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}

.choice-filter-red:hover {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
}
input.choice-filter-multi-selected {
    flex-grow: 1;
    display: block;
    padding: 0;
    padding-top: 0.25rem;
    padding-left: 0.5rem;
    margin-left: 0.5rem;
    font-size: 0.8rem;
    line-height: 1.5;
    color: #495057;
    background-color: rgb(237, 237, 255);
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
}

.choice-filter-selected-box {
    overflow-y: auto;
    margin-top: 0;
    max-height: 12rem;
    padding-right: 0.5rem;
}
button.choice-filter-rm-btn {
    height: 1.5rem;
    width: 1.5rem;
    padding: 0;
    border-radius: 100%;
    cursor: pointer;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0.5rem;
    text-align: center;
}
button>svg {
    display: block;
    margin: auto;
}
.choice-filter-multi-input {
    border: none;
    background-color: transparent;
    flex-grow: 1;
    cursor: default;
}

input.choice-filter {
    border: 1px solid #ced4da;
    border-radius: .25rem;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    width: 100%;
    margin-bottom: 0.5rem;
    cursor: pointer;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 32 32"><path d="M16 22L6 10h20l-10 12z"/></svg>') no-repeat right .75rem center;
}

input.choice-filter.choice-filter-multi {
    margin-top: 0;
}

input.choice-filter.valid {
    background-color: rgb(237, 237, 255);
}

ul.choice-filter {
    list-style-type: none;
    margin-bottom: 0.5rem;
    max-height: 200px; 
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    background-color: white;
    border: 1px solid rgb(207, 207, 207);
    border-radius: 0.25rem;
    max-width: 90%;
    box-shadow: 0.4rem 0.6rem 1rem 0 rgb(153, 153, 153);
}

button.choice-filter {
    text-align: left;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    padding: 0 0.75rem;
    background-color: #fff;
    background-clip: padding-box;
    width: 100%;
}

button.choice-filter:focus, button.choice-filter:hover {
    background-color: blue;
    color: white;
}
```

## License

`peasywidgets` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
