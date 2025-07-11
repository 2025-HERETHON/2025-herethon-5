from django.shortcuts import render, redirect, get_object_or_404
from .models import Category, Curriculum
from accounts.models import LearningRecord
from django.contrib.auth.decorators import login_required

# 커리큘럼 목록
def curriculum(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug) # slug로 카테고리 객체 가져오기, 없으면 404
    curriculums = category.curriculums.all()  # number 순 정렬됨 (Meta ordering)

    # 로그인 유저 ( 학습 완료 기록 조회 )
    if request.user.is_authenticated:
        completed_curriculum_ids = set(LearningRecord.objects.filter(
            user=request.user,
            category=category
        ).values_list('curriculum_id', flat=True))

    # 비로그인 유저
    else:
        completed_curriculum_ids = set(request.session.get('completed_curriculums', []))

    # 커리큘럼 완료 여부와 접근 가능 여부 판단
    curriculums_with_status = []
    accessible_found = False # 접근 가능한 미완료 커리큘럼 찾았는지의 여부

    # 해당 커리큘럼 완료됐는지 여부
    for c in curriculums:
        is_completed = c.id in completed_curriculum_ids

        # 완료 -> 접근 가능
        if is_completed:
            is_accessible = True
    
        # 접근 가능한 첫 번째 미완료 커리큘럼이라면 접근 가능하게 설정
        elif not accessible_found:
            is_accessible = True
            accessible_found = True # 이제 미완료 커리큘럼은 접근 불가

        else:
            is_accessible = False

    # 커리큘럼 & 상태를 리스트에 추가
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

# 학습하기
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

    # 부제목이 존재하는 항목만 리스트에 남기기
    subtitles_and_contents = [item for item in subtitles_and_contents if item['subtitle']]

    context = {
        'category': curriculum.category,  
        'curriculum': curriculum,
        'number_in_category': number_in_category,
        'sections': subtitles_and_contents,
    }
    return render(request, 'learn/curriculum_detail.html', context)

# 학습 완료
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

    # 책(콘텐츠) 추천
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

# 해당 카테고리의 모든 커리큘럼 완료
def category_complete(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    curriculums = Curriculum.objects.filter(category=category).order_by('number')

    if request.user.is_authenticated:
        completed_ids = LearningRecord.objects.filter(
            user=request.user,
            category=category
        ).values_list('curriculum_id', flat=True)

    # 커리큘럼 리스트에 완료•접근 가능 여부/ 넘버 정보를 추가해 리스트 생성
    curriculums_with_status = []
    for curriculum in curriculums:
        # 해당 커리큘럼 완료 여부
        is_completed = curriculum.id in completed_ids
        is_accessible = True  # 모두 접근 가능

        curriculums_with_status.append({
            'curriculum': curriculum,
            'is_completed': is_completed,
            'is_accessible': is_accessible,
            'number_in_category': curriculum.number 
        })

    last_curriculum = curriculums.last()

    context = {
        'category': category,
        'curriculums_with_status': curriculums_with_status,
        'last_curriculum': last_curriculum 
    }
    return render(request, 'learn/category_complete.html', context)

