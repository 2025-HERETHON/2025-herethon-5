from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib import messages
from .models import LearningRecord
from collections import defaultdict

# 회원가입
def signup(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return render(request, 'complete.html', {'user': user})
    else:
        form = CustomUserCreationForm()
    return render(request, 'signup.html', {'form': form})

# 로그인
def login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        remember_me = bool(request.POST.get('remember_me'))
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            if not remember_me: # 로그인 유지를 하지 않으면
                request.session.set_expiry(0) # 브라우저 닫히면 세션 만료
                request.session.modified = True
            print('로그인 성공')
            return redirect('home')
        else: 
            error_message = "아이디 또는 비밀번호가 잘못되었습니다."  # 에러 메시지 설정
            return render(request, 'login.html', {'error_message': error_message})
    else:
        return render(request, 'login.html')

# 로그아웃
def logout(request):
    auth_logout(request)
    print('로그아웃 성공')
    return redirect('home')

# 비밀번호 변경
@login_required
def password_change(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, "비밀번호가 성공적으로 변경되었습니다!")
            return render(request, 'pwComplete.html', {'user':user})
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'mypage_pwChange.html', {'form':form})

# 학습 기록
@login_required
def learn_record(request):
    records = LearningRecord.objects.filter(user=request.user).order_by('-updated_at')

    # 날짜별로 그룹
    records_date=defaultdict(list)
    for r in records:
        date_obj = r.updated_at.date()
        records_date[date_obj].append(r)

    # 날짜별 안에서 순서 지정
    for rec_list in records_date.values():
        rec_list.sort(key=lambda r: r.curriculum.number)

    # 파트별로 그룹
    records_category=defaultdict(list)
    for r in records:
        category_name = r.category.name
        records_category[category_name].append(r)
    
    # 파트별 안에서 순서 지정
    for rec_list in records_category.values():
        rec_list.sort(key=lambda r: r.curriculum.number)

    context = {
       'records_date': dict(records_date),
       'records_category': dict(records_category),
    }

    return render(request, 'mypage_learning.html', context)
    
