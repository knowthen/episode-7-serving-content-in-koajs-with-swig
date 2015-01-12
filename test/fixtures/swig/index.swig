{% extends './layout.swig' %}
{% block content %}
  <h1>Pros and Cons of using Swig</h1>
  <h2>Pros</h2>
  <ul>
    {% for pro in pros %}
    <li>{{pro}}</li>
    {% endfor %}
  </ul>
  <h2>Cons</h2>
  <ul>
    {% for con in cons %}
    <li>{{con}}</li>
    {% endfor %}
  </ul>
{% endblock %}
