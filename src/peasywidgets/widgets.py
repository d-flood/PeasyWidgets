from django import forms
from django.http import QueryDict
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe

from peasywidgets.py.helpers import render_attributes


class Datalist(forms.Widget):
    """
    A widget that uses a datalist to provide a list of options to the user.
    If being used for a ForeignKey or ManyToManyField, the object_model
    parameter should be set to the model class of the related objects.
    """

    def __init__(
        self,
        multiple=True,
        object_model=None,
        choices=[],
        attrs=None,
        datalist_attrs=[],
        input_attrs=[],
        input_classlist=[],
        add_button_classlist=[],
        add_button_attrs=[],
        wrapper_div_classlist=[],
    ):
        self.multiple = multiple
        self.object_model = object_model
        self.choices = choices
        self.datalist_attrs = datalist_attrs
        self.input_attrs = input_attrs
        self.input_classlist = input_classlist
        self.add_btn_classlist = add_button_classlist
        self.add_btn_attrs = add_button_attrs
        self.wrapper_div_classlist = wrapper_div_classlist
        super().__init__(attrs)

    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = []
        elif not hasattr(value, "__iter__"):
            value = [value]
        current_values = (
            [o for o in self.object_model.objects.filter(pk__in=value)]
            if self.object_model
            else value
        )
        context = {
            "name": name,
            "current_values": current_values,
            "choices": self.choices,
            "single": "false" if self.multiple else "true",
            "datalist_attrs": render_attributes(self.datalist_attrs),
            "input_attrs": render_attributes(self.input_attrs),
            "input_classlist": " ".join(self.input_classlist),
            "add_btn_classlist": " ".join(self.add_btn_classlist),
            "add_btn_attrs": render_attributes(self.add_btn_attrs),
            "wrapper_div_classlist": " ".join(self.wrapper_div_classlist),
        }
        output = render_to_string("datalist.html", context)
        return mark_safe(output)

    def value_from_datadict(self, data: QueryDict, files, name):
        if self.multiple:
            return data.getlist(name, None)
        else:
            return super().value_from_datadict(data, files, name)
