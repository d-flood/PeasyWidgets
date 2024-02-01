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
3. Run `collectstatic` and include the JavaScript in templates `{%  static 'peasywidgets.js' %}``

## Styling

The following default CSS is available to use with Django's `static` template tag, otherwise use these selectors to write custom CSS/Tailwind directives.



## License

`peasywidgets` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
