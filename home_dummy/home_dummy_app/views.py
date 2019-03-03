from django.http import HttpResponse
from django.shortcuts import render
#from home_dummy_app.templatetags.get_temp_once import get_temp_once

def index(request):
    #get_temp_once()
    return render(request, "index.html")