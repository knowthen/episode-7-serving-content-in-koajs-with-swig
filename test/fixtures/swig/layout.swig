<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
  <link href='css/site.css' rel='stylesheet' />
</head>
<body>
  {% include './header.swig' %}
  <!-- this comment will
    exist in html -->
  {% block content %}
  {% endblock %}
  {# this comment won't render in html #}
  {% include './scripts.swig' %}
</body>
</html>