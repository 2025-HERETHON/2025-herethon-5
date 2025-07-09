from django.shortcuts import render, redirect, get_object_or_404
from .models import Category, Curriculum
from accounts.models import LearningRecord
from django.contrib.auth.decorators import login_required

# def category_list(request):
#     categories = Category.objects.all().order_by('id')
    
#     categories_with_progress = []
#     for category in categories:
#         total_count = category.curriculums.count()
        
#         # 로그인 유저
#         if request.user.is_authenticated:
#             completed_count = LearningRecord.objects.filter(
#                 user=request.user,
#                 category=category
#             ).count()
        
#         # 비로그인 유저
#         else:
#             completed_ids = request.session.get('completed_curriculums', [])
#             completed_count = Curriculum.objects.filter(
#                 category=category,
#                 id__in=completed_ids
#             ).count()
        
#         categories_with_progress.append({
#             'category': category,
#             'total': total_count,
#             'completed': completed_count,
#         })

#     context = {
#         'categories_with_progress': categories_with_progress,
#     }
#     return render(request, 'learn/category_list.html', context)

def curriculum(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    curriculums = category.curriculums.all()  # number 순 정렬됨 (Meta ordering)

    if request.user.is_authenticated:
        completed_curriculum_ids = set(LearningRecord.objects.filter(
            user=request.user,
            category=category
        ).values_list('curriculum_id', flat=True))
    else:
        completed_curriculum_ids = set(request.session.get('completed_curriculums', []))

    curriculums_with_status = []
    accessible_found = False

    for c in curriculums:
        is_completed = c.id in completed_curriculum_ids

        if is_completed:
            is_accessible = True
        elif not accessible_found:
            is_accessible = True
            accessible_found = True
        else:
            is_accessible = False

        curriculums_with_status.append({
            'curriculum': c,
            'is_completed': is_completed,
            'is_accessible': is_accessible,
        })

    context = {
        'category': category,
        'curriculums_with_status': curriculums_with_status,
    }
    return render(request, 'learn/curriculum.html', context)

def curriculum_detail(request, category_slug, curriculum_number):
    category = get_object_or_404(Category, slug=category_slug)
    curriculum = get_object_or_404(Curriculum, category=category, number=curriculum_number)

    curriculums_in_category = Curriculum.objects.filter(
        category=category
    )

    number_in_category = curriculum.number  # 커리큘럼 number 

    subtitles_and_contents = [
        {'subtitle': curriculum.subtitle1, 'content': curriculum.content1},
        {'subtitle': curriculum.subtitle2, 'content': curriculum.content2},
        {'subtitle': curriculum.subtitle3, 'content': curriculum.content3},
    ]

    subtitles_and_contents = [item for item in subtitles_and_contents if item['subtitle']]

    context = {
        'category': curriculum.category,  
        'curriculum': curriculum,
        'number_in_category': number_in_category,
        'sections': subtitles_and_contents,
    }
    return render(request, 'learn/curriculum_detail.html', context)

def learn_complete(request, category_slug, curriculum_number):
    category = get_object_or_404(Category, slug=category_slug)
    curriculum = get_object_or_404(Curriculum, category=category, number=curriculum_number)

    number_in_category = curriculum.number

    if request.user.is_authenticated:
        LearningRecord.objects.update_or_create(
            user=request.user,
            category=category,
            curriculum=curriculum
        )
    else:
        completed = request.session.get('completed_curriculums', [])
        if curriculum.id not in completed:
            completed.append(curriculum.id)
            request.session['completed_curriculums'] = completed

    book_recommendations = curriculum.book_recommendations.all()

    next_curriculum = Curriculum.objects.filter(
        category=category,
        number__gt=curriculum.number
    ).order_by('number').first()

    context = {
        'category': category,
        'curriculum': curriculum,
        'next_curriculum': next_curriculum,
        'book_recommendations': book_recommendations,
        'number_in_category': number_in_category
    }
    return render(request, 'learn/learn_complete.html', context)



def category_complete(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    
    # 커리큘럼을 number 순서로 정렬
    curriculums = Curriculum.objects.filter(category=category).order_by('number')

    if request.user.is_authenticated:
        completed_ids = LearningRecord.objects.filter(
            user=request.user,
            category=category
        ).values_list('curriculum_id', flat=True)
    else:
        completed_ids = request.session.get('completed_curriculums', [])

    curriculums_with_status = []
    for curriculum in curriculums:
        is_completed = curriculum.id in completed_ids
        is_accessible = True  # 모두 접근 가능하게

        curriculums_with_status.append({
            'curriculum': curriculum,
            'is_completed': is_completed,
            'is_accessible': is_accessible,
            'number_in_category': curriculum.number  # 카테고리 number 필드 
        })

    # 마지막 커리큘럼 찾기
    last_curriculum = curriculums.last()

    context = {
        'category': category,
        'curriculums_with_status': curriculums_with_status,
        'last_curriculum': last_curriculum 
    }
    return render(request, 'learn/category_complete.html', context)

def check_all_curriculums_completed(user_or_session, category):
    all_curriculums = Curriculum.objects.filter(category=category)

    if hasattr(user_or_session, 'is_authenticated') and user_or_session.is_authenticated:
        completed_curriculum_ids = set(LearningRecord.objects.filter(
            user=user_or_session,
            category=category
        ).values_list('curriculum_id', flat=True))
    else:
        completed_curriculum_ids = set(user_or_session.get('completed_curriculums', []))

    return all(curriculum.id in completed_curriculum_ids for curriculum in all_curriculums)