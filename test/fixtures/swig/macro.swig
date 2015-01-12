{% macro favlink(address, site) %}
<a href="{{ address }}" class="favorite"> {{ site }}</a>
{% endmacro %}

{{ favlink("google.com", "google") }}