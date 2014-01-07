---
layout: post
title: "Simple interactive Ember.js web application on Django"
date: 2013-11-04
---

With everyone wanting more ambitious web applications, with complex UIs, quick response times and mind-blowing features, the challenge for developers to build such websites has become greater and greater. Luckily, we as [lazy developers](http://developerexcuses.com/), have some great tools to make our lives easier. In the last years, a whole new set of tools has emerged, that make developing complex and dynamic websites a breeze. In this blog post I will try to demonstrate how easy it is to build such a web app from scratch, using [Django](https://www.djangoproject.com/) and [Ember.js](http://emberjs.com/).

In this tutorial we will be creating the django backend for the [TodoMVC](http://todomvc.com/) application. If you are new to Django or Ember.js, do not fear, they both have great documentation on their website. You should be able to follow this tutorial with only some basic Javascript, and Python knowledge. If you would like to skip all the jabber, the final code is [available on github](http://www.github.com/alesdotio).

Please note that the code used in this tutorial might not suitable for production use, it merely serves for demonstration purposes.


## Project setup

First of all, we need to setup our environment and install some requirements. After creating and activating your [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/), install the following packages with pip.

	pip install Django djangorestframework

[Django-rest-framework](http://django-rest-framework.org/) is, as the name suggests, an awesome tool to create Web APIs. You could use another API framework to achieve the same goal like [Tastypie](http://django-tastypie.readthedocs.org/), but the integration with Ember is incredibly easy with Django REST framework, as we will se later.

Now let's create a new django project with ``django-admin.py startproject app``. All we have to change in settings.py, is the database setting. For this example we will simply use SQLite.

{% highlight python %}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite',
    }
}
{% endhighlight %}

We also need to add ``'django.contrib.admin'``, ``'app'`` and ``'rest_framework'`` to INSTALLED_APPS.


## Models

Our Task model will be very simple -- just a name and a "completed" flag. Create a models.py file like:

{% highlight python %}
from django.db import models

class Task(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
{% endhighlight %}

Now we can run ``python manage.py syncdb`` to create the required database tables.


## URLs and views

Our app will only have three entry points:
* the root, which will render the app to the user;
* the API, which our app will access for data,
* and the admin panel.

The API will consist of a task list view (used to list and create tasks) and a task detail view (to edit and remove tasks). Your urls.py should look something like this:

{% highlight python %}
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
from views import TaskListView, TaskDetailView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='home.html'), name='home'),
    url(r'^api/tasks/$', TaskListView.as_view()),
    url(r'^api/tasks/(?P<pk>\d+)/$', TaskDetailView.as_view()),
    url(r'^admin/', include(admin.site.urls)),
)
{% endhighlight %}

Note that we import the views -- we still have to create those. So let's make a views.py file in our app folder, and write some. Django REST framework makes it really easy with generic views.

{% highlight python %}
from models import Task
from rest_framework import generics

class TaskListView(generics.ListCreateAPIView):
    model = Task

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Task
{% endhighlight %}

This way we created two public API points. If we would like to make the task list only viewable by registered users, and editable only by admins, we could simply add a permission class to our views.

{% highlight python %}
from models import Task
from rest_framework import generics, permissions


class AdminOrReadOnlyPerm(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated() and (request.method in permissions.SAFE_METHODS or (request.user and request.user.is_staff))


class TaskListView(generics.ListCreateAPIView):
    model = Task
    permission_classes = [AdminOrReadOnlyPerm]


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Task
    permission_classes = [AdminOrReadOnlyPerm]
{% endhighlight %}

At this point we can run our app with ``python manage.py runserver``, and visit localhost:8000/api/tasks/. We will be presented with the awesome browse-able Django REST framework interface.

![django rest framework interface 1]({{ site.url }}/media/django-rest-framework-01.png)

As you can see, we receive a 403-forbidden error, which means our custom permission class works! After we log in through the admin interface at localhost:8000/admin/, we can try visiting the API again, and will be presented with an empty list of tasks. Using the interface, let's add some.

![django rest framework interface 2]({{ site.url }}/media/django-rest-framework-02.png)

And with this, we are finished with the backend implementation! That's right, we have a RESTful API complete with authentication and browse-able interface, which we used to add some data. Well that was easy, wasn't it? Let's look at what we need to do in the fronted next.


## Frontend

The only template we need is home.html, which we serve at the root of our app. This template needs to contain all the scripts and all the handlebars templates Ember will render.

Let's start with the basic HTML and including all the requirements. BTW, I highly recommend using [django-compressor](https://github.com/jezdez/django_compressor) to compress your static files.

{% highlight html %}
<!doctype html>
<html>
<head></head>
<body>
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://builds.emberjs.com/handlebars-1.0.0.js"></script>
    <script src="http://builds.emberjs.com/tags/v1.1.2/ember.min.js"></script>
    <script src="http://builds.emberjs.com/beta/ember-data.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/ember-data-django-rest-adapter/0.13.1/ember-data-django-rest-adapter.min.js"></script>
</body>
</html>
{% endhighlight %}

These are all pretty standard Ember requirements, except for the last one. And that is where all the magic happens. [Ember-data-django-rest-adapter](https://github.com/toranb/ember-data-django-rest-adapter/) allows us to use Django REST framework's generic views together with Ember data, without writing a line of code. The whole communication between the backend and frontend is completely covered and we don't have to worry about it at all. Magic!


Next, let's add the root Ember template.

{% highlight html %}
{{ "{% verbatim" }} %}
<script type="text/x-handlebars-template">
    {{ "{{" }}outlet}}
</script>
{{ "{% endverbatim" }} %}
{% endhighlight %}

There is one small caveat with using Django together with Handlebars. Handlebars templates use ``{{ "{{" }}`` tags which clash with the Django templates syntax. Since handlebars does not have a setting to change those tags, our only options (as far as I know) to work around this are:
 * wrap all handlebars templates in Django's ``{{ "{% verbatim" }} %}`` ``{{ "{% endverbatim " }} %}`` tags or
 * use a custom template tag that includes templates without running them through Django first (for example, [this one](https://github.com/niwibe/django-rawinclude) or simply [this one](https://gist.github.com/HenrikJoreteg/742160)).








## Final thoughts

Although this tutorial only covers the basics of working with Ember and Django, I think it provides a solid base for real-life solutions as well. I can attest to that by having build a few for customers at my favourite web agency [Divio](http://www.divio.ch) and at my startup [LiveSystems](http://www.livesystems.info).

Was this blog post useful to you? Should I do more of these? If you have any feedback, or want to air your opinion about the subject, feel free to drop me an email.

The complete source code used in this tutorial is available on Github at [www.github.com/alesdotio](http://www.github.com/alesdotio). You can fork, share, do whatever you want with it. Cheers!
