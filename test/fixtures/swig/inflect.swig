<p>Liked by the following {{ word | inflect(people.length) }}: 
{% for person in people -%} 
{% if loop.index > 1 %}, {% endif -%}
{{ person -}}
{%- endfor -%}
</p>