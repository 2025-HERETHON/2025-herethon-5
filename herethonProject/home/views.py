from django.shortcuts import render

def home(request):
    return render(request, 'home-login.html', {'user':request.user})

def first_page(request):
    return render(request, 'firstpage.html')