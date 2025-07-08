from django.shortcuts import render, redirect
from learn.models import Category, Curriculum
from accounts.models import LearningRecord

# category_list = home
def home(request):
    categories = Category.objects.all().order_by('id')
    
    categories_with_progress = []
    for category in categories:
        total_count = category.curriculums.count()
        
        # 로그인 유저면 LearningRecord에서 완료 강의 수 계산
        if request.user.is_authenticated:
            completed_count = LearningRecord.objects.filter(
                user=request.user,
                category=category
            ).count()
        else:
            # 비로그인 유저는 세션에서 관리하는 경우 (세션에 저장된 커리큘럼 id 리스트와 비교)
            completed_ids = request.session.get('completed_curriculums', [])
            completed_count = Curriculum.objects.filter(
                category=category,
                id__in=completed_ids
            ).count()
        
        categories_with_progress.append({
            'category': category,
            'total': total_count,
            'completed': completed_count,
        })

    context = {
        'categories_with_progress': categories_with_progress,
    }
    return render(request, 'home-login.html', context)

# 로그인한 사용자는 home(category_list) 보여주기
def first_page(request):
    if request.user.is_authenticated:
        return redirect('home')  
    return render(request, 'firstpage.html')