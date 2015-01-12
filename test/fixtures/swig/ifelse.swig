<h3>Is it ok for you to drive?</h3>
{% if drinksConsumed === 0 %}
<p>able to drive</p>
{% elif drinksConsumed === 1 %}
<p>chill for a bit</p>
{% elif drinksConsumed > 1 && drinksConsumed <= 4 %}
<p>not for a while</p>
{% elif drinksConsumed > 4 %}
<p>do not puke on me</p>
